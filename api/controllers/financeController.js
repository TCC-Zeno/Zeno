import{
addFinance,
getFinanceID,
getFinanceCategoria,
postFinanceCategoria
} from "../services/financeService.js"

export const addFinanceform = async (req, res)=>{
   try{
    const{ userId, name, value, category, payment_method, type_flow } = req.body;
    //criar a tabela

    // const financeData = { userId, name, value, category, payment_method, type_flow };
    // const newFinance=  await addFinance(financeData);
    const newFinance =  await addFinance(userId, name, value, category, payment_method, type_flow);
    res.status(201).json(newFinance);
  } catch (error) {
    // Log detalhado para debug
    console.error("Erro ao criar usuário:", error);
    res.status(400).json({ error: error.message });
   }
};

export const financeId = async(req, res)=>{
  const {uuid} = req.body;
  try{
    if (!uuid) {
      return res.status(400).json({ error: "ID não informado." });
    }
    const data = await getFinanceID(uuid);
    if (!data) {
      return res.status(404).json({ error: "Usuário não encontrado para o ID informado." });
  }
    res.status(200).json(data);
}catch (error) {
    res.status(500).json({ error: `Erro interno ao atualizar pesquisa: ${error.message}` });
  }
};

export const financeCategoria = async(req, res)=>{
  const {uuid} = req.body;
  console.log(uuid);
  try{
    if (!uuid) {
      return res.status(400).json({ error: "ID não informado." });
    }
    const data = await getFinanceCategoria(uuid);
    if (!data) {
      return res.status(404).json({ error: "Usuário não encontrado para o ID informado." });
  }
    res.status(200).json(data);
}catch (error) {
    res.status(500).json({ error: `Erro interno ao atualizar pesquisa: ${error.message}` });
  }
};

export const addFinanceCategoria = async (req, res)=>{
   try{
    const{ userId, category} = req.body;
    console.log(userId, category);
    //criar a tabela

    // const financeData = { userId, name, value, category, payment_method, type_flow };
    // const newFinance=  await addFinance(financeData);
    const newCategoria =  await postFinanceCategoria(userId, category);
    res.status(201).json(newCategoria);
  } catch (error) {
    // Log detalhado para debug
    console.error("Erro ao criar categoria:", error);
    res.status(400).json({ error: error.message });
   }
};