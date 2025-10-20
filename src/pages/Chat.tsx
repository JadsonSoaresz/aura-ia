import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { useSessionProfile } from "@/hooks/useSessionProfile";
import { supabase } from "@/integrations/supabase/client";
import { Send, Loader2, Bot, User, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
  relatedTopics?: string[];
}

export default function Chat() {
  const { profile } = useSessionProfile();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou seu tutor virtual. Como posso ajudar você hoje?",
      suggestions: [
        "Explique programação de forma simples",
        "Como funciona a fotossíntese?",
        "Dicas para aprender inglês"
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || loading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const conversationHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          message: textToSend,
          sessionProfile: profile,
          conversationHistory
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.replyText || data.error || "Desculpe, não consegui processar sua mensagem.",
        suggestions: data.suggestions || [],
        relatedTopics: data.relatedTopics || []
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Error sending message:", error);
      
      if (error.message?.includes("429")) {
        toast.error("Muitas mensagens. Aguarde um momento.");
      } else if (error.message?.includes("402")) {
        toast.error("Limite de uso atingido.");
      } else {
        toast.error("Erro ao enviar mensagem");
      }

      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Desculpe, ocorreu um erro. Por favor, tente novamente em alguns instantes."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="ghost" size="icon">
            <Link to="/aprender">
              <ArrowLeft />
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold">Chat de Apoio</h1>
            <p className="text-muted-foreground">Tire suas dúvidas com nosso tutor virtual</p>
          </div>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              Tutor Virtual
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, idx) => (
              <div key={idx} className="space-y-2">
                <div
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      message.role === "user" ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-5 w-5 text-primary-foreground" />
                    ) : (
                      <Bot className="h-5 w-5 text-secondary-foreground" />
                    )}
                  </div>
                  <div
                    className={`flex-1 p-4 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground ml-12"
                        : "bg-muted mr-12"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>

                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="ml-14 space-y-2">
                    <p className="text-sm text-muted-foreground">Sugestões:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, sidx) => (
                        <Button
                          key={sidx}
                          variant="outline"
                          size="sm"
                          onClick={() => sendMessage(suggestion)}
                          disabled={loading}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {message.relatedTopics && message.relatedTopics.length > 0 && (
                  <div className="ml-14">
                    <p className="text-sm text-muted-foreground mb-2">Tópicos relacionados:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.relatedTopics.map((topic, tidx) => (
                        <span
                          key={tidx}
                          className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-secondary">
                  <Bot className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua pergunta..."
                disabled={loading}
                className="flex-1"
                aria-label="Mensagem para o tutor"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                size="icon"
                aria-label="Enviar mensagem"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
