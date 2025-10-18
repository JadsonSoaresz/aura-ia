import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionProfile, conversationHistory } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!message) {
      throw new Error("Message is required");
    }

    console.log("Chat request:", { message, profileFormat: sessionProfile?.format });

    const systemPrompt = `Você é um tutor educacional acessível e inclusivo.

Perfil do aluno:
- Formato preferido: ${sessionProfile?.format || "texto"}
- Necessidades especiais: ${sessionProfile?.needsSupport ? sessionProfile.supportType : "Nenhuma"}
- Nível: ${sessionProfile?.difficulty || "médio"}

Diretrizes:
1. Use linguagem simples, clara e empática
2. Responda em até 100 palavras (seja conciso)
3. Se o aluno tem necessidades especiais, adapte sua resposta
4. Inclua exemplos práticos quando possível
5. Incentive o aluno positivamente

Formate sua resposta como JSON:
{
  "replyText": "Sua resposta principal",
  "suggestions": ["Sugestão 1", "Sugestão 2"],
  "relatedTopics": ["Tópico 1", "Tópico 2"]
}`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(conversationHistory || []),
      { role: "user", content: message }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas requisições. Por favor, aguarde um momento." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Limite de créditos atingido." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    // Try to parse JSON response
    let parsedResponse;
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      parsedResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : {
        replyText: aiResponse,
        suggestions: [],
        relatedTopics: []
      };
    } catch {
      parsedResponse = {
        replyText: aiResponse,
        suggestions: [],
        relatedTopics: []
      };
    }

    console.log("Chat response generated successfully");

    return new Response(
      JSON.stringify(parsedResponse),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in chat function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Erro desconhecido",
        replyText: "Desculpe, ocorreu um erro. Por favor, tente novamente."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
