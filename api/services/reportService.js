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
  1. Calcular e apresentar:
      - Total de Entradas = somar todos os valores (value) da coluna value onde o type_flow for entrada
      - Total de Saídas  = somar todos os valores (value) da coluna value onde o type_flow for saida
      - Saldo Final = pegar o valor do seu calculo em Total de Entradas e subtrair pelo valor do seu calculo em Total de Saídas

  2. Produzir Conclusão e Recomendações em tópicos objetivos nas áreas:
      - Financeiro: analisar o saldo final e orientar sobre controle de despesas
      - Gestão: sugerir práticas para otimizar fluxo de caixa e reduzir custos
      - Planejamento: estratégias para aumentar entradas e melhorar sustentabilidade

  As recomendações devem ser pontuais, acionáveis e eficientes.
  Apresente apenas os cálculos e conclusões/recomendações, sem repetir a tabela e ao começar não precisa concordar, só comece com os calculos.

  Dados financeiros:
  ${formattedContext}
  `;

  console.log(prompt);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(result);
    return text;
  } catch (err) {
    console.error(err);
    return err;
  }
}
