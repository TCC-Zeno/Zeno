import{
addFinance
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