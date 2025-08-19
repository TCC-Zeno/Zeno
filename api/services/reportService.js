import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

export async function createReport(context) {
  if (!API_KEY) {
    return "Não tem a KEY do google";
  }
  const IA = new GoogleGenerativeAI(API_KEY);

  const model = IA.getGenerativeModel({ model: "gemini-2.0-flash" });

  const formattedContext = JSON.stringify(context, null, 2);

  const prompt = `
  Atue como um especialista em economia e análise de dados de microempresas. 
  Você receberá uma tabela contendo registros financeiros com as colunas: 
  Nome = name, Valor (R$) = value, Método de pagamento = payment_method, Categoria = category e Tipo de fluxo (Entrada ou Saída) = type_flow.

  Sua tarefa é:
  1. Produzir Conclusão e Recomendações em tópicos objetivos nas áreas:
      - Financeiro: analisar o saldo final e orientar sobre controle de despesas
      - Gestão: sugerir práticas para otimizar fluxo de caixa e reduzir custos
      - Planejamento: estratégias para aumentar entradas e melhorar sustentabilidade

  As recomendações devem ser pontuais, acionáveis e eficientes.
  Apresente apenas os cálculos e conclusões/recomendações, sem repetir a tabela e ao começar não precisa concordar, só comece com as conclusões e recomendações.
  Não fala os calculos dos lucros, gastos e ganhos já que o sistema já dará isso para o usuario, sua função é somente apresentar as conclusões e recomendações.

  Dados financeiros:
  ${formattedContext}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (err) {
    console.error(err);
    return err;
  }
}
