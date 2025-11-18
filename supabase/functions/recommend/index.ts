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
    const { sessionProfile, history } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Recommendation request:", { sessionProfile, historyLength: history?.length });

    const prompt = `Você é um assistente educacional que personaliza conteúdos para alunos.

Perfil do aluno:
- Formato preferido: ${sessionProfile.format || "texto"}
- Necessidades especiais: ${sessionProfile.needsSupport ? "Sim - " + sessionProfile.supportType : "Não"}
- Nível atual: ${sessionProfile.difficulty || "médio"}
- Interesses: ${sessionProfile.interests?.join(", ") || "geral"}

Regras IMPORTANTES para a recomendação:
- Se a lista de interesses NÃO estiver vazia, o campo "topic" DEVE corresponder exatamente a um dos interesses informados.
- Se não houver interesses definidos, escolha um tópico geral adequado ao nível do aluno.
- Considere também o histórico recente para ajustar a dificuldade.

Histórico recente (últimos ${history?.length || 0} conteúdos):
${history?.map((h: any) => `- ${h.title} (tópico: ${h.topic}, acertos: ${h.score}%, tempo: ${h.timeSpent}min)`).join("\n") || "Nenhum histórico"}

Tarefa: Recomende o próximo conteúdo educacional ideal para este aluno.

Retorne APENAS um objeto JSON com a seguinte estrutura:
{
  "title": "Título do conteúdo",
  "format": "texto|audio|video|interativo",
  "difficulty": "fácil|médio|difícil",
  "topic": "Tópico principal (deve respeitar as regras acima)",
  "duration": "Duração em minutos (número)",
  "reason": "Breve explicação da recomendação (máximo 100 caracteres)",
  "adaptations": ["Lista de adaptações de acessibilidade aplicadas"]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "Você é um especialista em educação inclusiva e personalização de aprendizado." },
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    // Parse JSON from AI response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid AI response format");
    }

    const recommendation = JSON.parse(jsonMatch[0]);
    console.log("Generated recommendation:", recommendation);

    return new Response(
      JSON.stringify(recommendation),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in recommend function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
