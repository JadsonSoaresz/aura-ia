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
    const { history, sessionProfile } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!history || history.length === 0) {
      return new Response(
        JSON.stringify({
          insights: ["Continue praticando para obtermos dados sobre seu progresso!"],
          strengths: [],
          improvements: [],
          overallScore: 0
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Performance analysis request:", { historyLength: history.length });

    const performanceData = history.map((h: any) => 
      `${h.title}: ${h.score}% de acertos, ${h.timeSpent} minutos, tópico: ${h.topic}`
    ).join("\n");

    const prompt = `Analise o desempenho deste aluno:

Perfil:
- Nível: ${sessionProfile?.difficulty || "médio"}
- Formato preferido: ${sessionProfile?.format || "texto"}

Histórico de atividades:
${performanceData}

Gere uma análise BREVE e ACIONÁVEL. Retorne APENAS JSON:
{
  "insights": ["Insight 1 (max 80 caracteres)", "Insight 2", "Insight 3"],
  "strengths": ["Ponto forte 1", "Ponto forte 2"],
  "improvements": ["Área para melhorar 1", "Área para melhorar 2"],
  "overallScore": número de 0 a 100,
  "recommendation": "Próximo passo sugerido (max 100 caracteres)"
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
          { 
            role: "system", 
            content: "Você é um analista educacional que fornece feedback construtivo e motivador." 
          },
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

    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid AI response format");
    }

    const analysis = JSON.parse(jsonMatch[0]);
    console.log("Performance analysis generated successfully");

    return new Response(
      JSON.stringify(analysis),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in analyze-performance function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        insights: ["Não foi possível analisar seu desempenho no momento."],
        strengths: [],
        improvements: [],
        overallScore: 0
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
