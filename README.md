# Plataforma EduTech Inclusiva

Uma plataforma educacional open-access com foco total em **inclusão e acessibilidade**, alimentada por Inteligência Artificial para personalização de aprendizado.

## 🎯 Objetivo

Democratizar o acesso à educação de qualidade através de uma plataforma web que:
- **Não requer cadastro** - acesso imediato e anônimo
- **Personaliza automaticamente** o conteúdo baseado em perfil e desempenho
- **Prioriza acessibilidade** - WCAG 2.1 AA compliant
- **Adapta-se a PCD** - suporte completo para pessoas com deficiência

## ✨ Funcionalidades

### 🧠 Personalização por IA
- **Triagem adaptativa**: questionário rápido que detecta estilo de aprendizado e necessidades
- **Recomendações inteligentes**: IA sugere próximos conteúdos baseados em desempenho
- **Análise contínua**: monitoramento de progresso com insights acionáveis

### ♿ Acessibilidade Avançada
- **Alto contraste**: tema visual com contraste otimizado
- **Ajuste de fonte**: 4 tamanhos (pequeno, médio, grande, extra-grande)
- **Leitor de tela**: compatibilidade total com NVDA/JAWS/VoiceOver
- **Navegação por teclado**: todos os controles acessíveis via Tab/Enter/Esc
- **Atalhos rápidos**:
  - `Alt+1`: Alternar leitor de tela
  - `Alt+2`: Alternar alto contraste
  - `Alt+3`: Menu de tamanho de fonte
  - `Alt+4`: Modo navegação por teclado

### 📚 Biblioteca de Conteúdos
- **Múltiplos formatos**: texto, áudio, vídeo, interativo
- **Vários tópicos**: Tecnologia, Matemática, Ciências, História, Idiomas
- **Níveis adaptativos**: fácil, médio, difícil

### 💬 Chat de Apoio com IA
- Tutor virtual 24/7 para tirar dúvidas
- Respostas em linguagem simples e empática
- Sugestões contextuais e tópicos relacionados

### 📊 Dashboard de Progresso
- Métricas de desempenho em tempo real
- Insights gerados por IA
- Análise por tópico e formato

## 🛠️ Tecnologias

### Frontend
- **React 18** com TypeScript
- **Vite** para build otimizado
- **Tailwind CSS** com design system personalizado
- **shadcn/ui** para componentes acessíveis
- **React Router** para navegação

### Backend (Lovable Cloud / Supabase)
- **Edge Functions** para lógica de IA
- **PostgreSQL** (opcional para analytics)
- **Lovable AI Gateway** com modelos:
  - `google/gemini-2.5-flash` (padrão)
  - `google/gemini-2.5-pro` (para análises complexas)

### IA e Personalização
- **Lovable AI** para:
  - Recomendações de conteúdo
  - Chat conversacional educativo
  - Análise de desempenho
- Prompts otimizados para educação inclusiva

## 🚀 Como Executar

### Requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

\`\`\`bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>

# Instale dependências
npm install

# Execute em desenvolvimento
npm run dev
\`\`\`

A aplicação estará disponível em `http://localhost:8080`

## 📂 Estrutura do Projeto

\`\`\`
src/
├── components/
│   ├── ui/                      # Componentes shadcn
│   └── AccessibilityToolbar.tsx # Barra de ferramentas de acessibilidade
├── hooks/
│   └── useSessionProfile.ts     # Hook para perfil de sessão
├── lib/
│   ├── contentLibrary.ts        # Biblioteca de conteúdos
│   └── utils.ts                 # Utilitários
├── pages/
│   ├── Landing.tsx              # Página inicial
│   ├── Triagem.tsx              # Questionário de perfil
│   ├── Aprender.tsx             # Player de conteúdo
│   ├── Chat.tsx                 # Chat com tutor virtual
│   └── Progresso.tsx            # Dashboard de progresso
├── types/
│   └── profile.ts               # Tipos TypeScript
└── integrations/
    └── supabase/                # Cliente Supabase (auto-gerado)

supabase/
└── functions/
    ├── recommend/               # Recomendação de conteúdo
    ├── chat/                    # Chat educativo
    └── analyze-performance/     # Análise de desempenho
\`\`\`

## 🔐 Privacidade e Dados

- **Sem cadastro**: dados mantidos apenas em `localStorage`
- **Sessão local**: perfil e histórico não saem do navegador
- **Opcional**: usuário pode limpar dados a qualquer momento
- **WCAG 2.1 AA**: conformidade com normas de acessibilidade

## 🎨 Design System

O projeto usa tokens semânticos definidos em `src/index.css`:

### Cores
- **Primary**: Azul (`220 90% 56%`) - educação, confiança
- **Secondary**: Roxo (`280 70% 60%`) - criatividade, inovação
- **Accent**: Verde (`150 60% 50%`) - sucesso, progresso

### Gradientes
- `gradient-primary`: Azul → Roxo
- `gradient-secondary`: Roxo → Verde
- `gradient-hero`: Fundo suave para hero sections

### Sombras
- `shadow-soft`: Sombra suave para cards
- `shadow-glow`: Brilho para elementos destacados

## 🧪 Testes de Acessibilidade

### Checklist Implementado
- ✅ Navegação completa por teclado
- ✅ Roles ARIA em todos os componentes
- ✅ Contraste >= 4.5:1 para texto
- ✅ Labels em todos os controles
- ✅ Landmarks semânticos (header, main, nav)
- ✅ Foco visível customizado
- ✅ Alternativas para conteúdo não-textual

### Como Testar
1. **Navegação por teclado**: Use Tab/Shift+Tab para navegar
2. **Leitor de tela**: Teste com NVDA (Windows), JAWS ou VoiceOver (Mac)
3. **Alto contraste**: Ative o modo e verifique legibilidade
4. **Zoom**: Teste com zoom de 200% (Ctrl/Cmd + +)

## 📖 Documentação das APIs

### Edge Functions

#### `/recommend`
Gera recomendação personalizada de conteúdo.

**Request:**
\`\`\`json
{
  "sessionProfile": {
    "format": "texto",
    "difficulty": "médio",
    "needsSupport": true,
    "supportType": "visual",
    "interests": ["Tecnologia"]
  },
  "history": [
    {
      "title": "Introdução à Programação",
      "score": 85,
      "timeSpent": 15,
      "topic": "Tecnologia"
    }
  ]
}
\`\`\`

**Response:**
\`\`\`json
{
  "title": "Programação: Variáveis e Tipos",
  "format": "texto",
  "difficulty": "médio",
  "topic": "Tecnologia",
  "duration": 20,
  "reason": "Próximo passo natural após introdução",
  "adaptations": ["Texto simplificado", "Alto contraste"]
}
\`\`\`

#### `/chat`
Chat educativo com tutor virtual.

**Request:**
\`\`\`json
{
  "message": "Explique o que são variáveis",
  "sessionProfile": { /* ... */ },
  "conversationHistory": [
    { "role": "user", "content": "Olá" },
    { "role": "assistant", "content": "Olá! Como posso ajudar?" }
  ]
}
\`\`\`

**Response:**
\`\`\`json
{
  "replyText": "Variáveis são como caixas...",
  "suggestions": ["Me dê um exemplo", "Como usar na prática?"],
  "relatedTopics": ["Tipos de dados", "Constantes"]
}
\`\`\`

#### `/analyze-performance`
Analisa desempenho e gera insights.

**Request:**
\`\`\`json
{
  "history": [ /* array de atividades */ ],
  "sessionProfile": { /* ... */ }
}
\`\`\`

**Response:**
\`\`\`json
{
  "insights": ["Excelente em conceitos básicos", "Pratique mais exercícios"],
  "strengths": ["Tecnologia", "Lógica"],
  "improvements": ["Matemática avançada"],
  "overallScore": 78,
  "recommendation": "Revisar fundamentos de álgebra"
}
\`\`\`

## 🌐 Deploy

### Vercel (Recomendado para Frontend)
\`\`\`bash
npm run build
vercel --prod
\`\`\`

### Netlify
\`\`\`bash
npm run build
netlify deploy --prod --dir=dist
\`\`\`

### Backend (Lovable Cloud)
As Edge Functions são deployadas automaticamente via Lovable Cloud.

## 🔮 Roadmap Futuro

- [ ] Realidade aumentada/virtual para experiências imersivas
- [ ] Integração com robôs-guia (para PCD motor)
- [ ] Geração de conteúdo dinâmico por IA
- [ ] Sistema de gamificação
- [ ] Certificados de conclusão
- [ ] Comunidade e fóruns
- [ ] Versão mobile nativa
- [ ] Modo offline

## 📄 Licença

MIT License - veja LICENSE para detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para questões ou sugestões:
- Abra uma issue no GitHub
- Entre em contato via [seu-email]

---

**Feito com ❤️ para democratizar a educação inclusiva**
