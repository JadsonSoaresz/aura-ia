import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, difficulty, title } = await req.json();
    console.log("Gerando perguntas para:", { topic, difficulty, title });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não configurada");
    }

    const systemPrompt = `Você é um gerador de perguntas educacionais especializado em criar questões desafiadoras de nível médio a avançado. Crie perguntas de múltipla escolha sobre o tópico fornecido.

IMPORTANTE: Retorne exatamente 5 perguntas em português.
Nível de dificuldade: ${difficulty}
Tópico: ${topic}
Título do conteúdo: ${title}

DIRETRIZES CRÍTICAS PARA QUESTÕES DE NÍVEL MÉDIO:
- NUNCA faça perguntas simples de memorização
- SEMPRE exija aplicação prática de conceitos
- Inclua cenários hipotéticos que testem raciocínio
- Use comparações entre conceitos relacionados
- Exija identificação de causas e consequências
- Todas as alternativas incorretas devem ser plausíveis e tentadoras
- Faça o aluno pensar em MÚLTIPLAS ETAPAS para chegar à resposta

Para dificuldade FÁCIL:
- Perguntas diretas sobre conceitos fundamentais
- Exigem reconhecimento e compreensão básica
- Opções de resposta nitidamente distintas

Para dificuldade MÉDIA (ATENÇÃO ESPECIAL):
- Exigem APLICAÇÃO prática e análise de situações complexas
- Incluem cenários do mundo real ou casos hipotéticos
- Testam RELAÇÕES entre conceitos, não apenas definições
- Exigem comparação, contraste ou síntese de informações
- Distratores muito convincentes baseados em conceitos semelhantes
- Perguntas do tipo: "Por que X acontece quando Y?", "Qual a melhor abordagem para resolver Z?", "Como X se relaciona com Y?"
- NÃO aceite perguntas como "Quanto é X + Y?" - isso é FÁCIL demais

Para dificuldade DIFÍCIL:
- Exigem análise crítica profunda e raciocínio complexo multi-etapa
- Síntese de múltiplos conceitos avançados
- Distratores extremamente próximos da resposta correta
- Incluem exceções, casos especiais e pegadinhas sutis
- Exigem conhecimento especializado e capacidade de fazer inferências

VALIDAÇÃO DAS QUESTÕES:
Antes de gerar, verifique:
✓ A pergunta exige mais de uma etapa de raciocínio?
✓ Pelo menos 2 alternativas incorretas parecem plausíveis?
✓ É possível acertar sem apenas decorar fatos básicos?
✓ A pergunta testa COMPREENSÃO e não apenas MEMORIZAÇÃO?

Se alguma resposta for "não", a questão precisa ser mais desafiadora.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Gere 5 perguntas sobre este tópico." }
        ],
        tools: [{
          type: "function",
          function: {
            name: "generate_questions",
            description: "Retorna 5 perguntas de múltipla escolha",
            parameters: {
              type: "object",
              properties: {
                questions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      question: { type: "string", description: "O texto da pergunta" },
                      options: { 
                        type: "array", 
                        items: { type: "string" },
                        description: "4 opções de resposta"
                      },
                      correctAnswer: { 
                        type: "number", 
                        description: "Índice da resposta correta (0-3)" 
                      }
                    },
                    required: ["question", "options", "correctAnswer"]
                  },
                  minItems: 5,
                  maxItems: 5
                }
              },
              required: ["questions"]
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "generate_questions" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro na API do Lovable AI:", response.status, errorText);
      throw new Error(`Erro na API: ${response.status}`);
    }

    const result = await response.json();
    console.log("Resposta da IA:", JSON.stringify(result, null, 2));

    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("Nenhuma resposta de ferramenta recebida da IA");
    }

    const questions = JSON.parse(toolCall.function.arguments).questions;
    
    console.log("Perguntas geradas:", questions);

    return new Response(
      JSON.stringify({ questions }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Erro ao gerar perguntas:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Erro desconhecido",
        questions: []
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});
