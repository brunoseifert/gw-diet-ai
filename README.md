# 🥗 GymWise DietAI

Aplicativo backend que gera **dietas personalizadas** utilizando **inteligência artificial (Google Gemini)** com base nos dados corporais dos usuários.

## 🚀 Funcionalidades
- ✅ Recebe informações do usuário (nome, peso, altura, idade, gênero, objetivo e nível de atividade).
- ✅ Gera uma dieta personalizada via IA.
- ✅ Retorna o plano alimentar em formato JSON estruturado.
- ✅ Backend simples, rápido e fácil de integrar com aplicativos mobile ou web.

## 🛠️ Tecnologias
- Node.js
- TypeScript
- Fastify
- API Google Gemini (`@google/generative-ai`)

## 🧠 Como Funciona
1. O frontend envia os dados do usuário.
2. O backend cria um **prompt personalizado**.
3. A IA do Google Gemini responde com uma dieta em formato JSON.
4. O backend processa e retorna o JSON limpo para o frontend.

## 🔥 Exemplo de Retorno
```json
{
  "nome": "Bruno",
  "sexo": "Masculino",
  "idade": "28",
  "altura": "1.80",
  "peso": "80",
  "objetivo": "Hipertrofia",
  "refeicoes": [
    {
      "horario": "08:00",
      "nome": "Café da Manhã",
      "alimentos": ["Ovos", "Aveia", "Banana"]
    }
  ],
  "suplementos": ["Whey Protein", "Creatina"]
}
```

## 
