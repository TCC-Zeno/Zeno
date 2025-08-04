import{
addFinance
} from "../services/financeService"

export const addFinanceform = async (req, res)=>{
   try{
    const{ id, name, value, category, payment_method, type_flow } = req.body;
    //criar a tabela

    const financeData = { id, name, value, category, payment_method, type_flow };
    const newFinance=  await addFinance(financeData);
    res.status(201).json(newFinance);
  } catch (error) {
    // Log detalhado para debug
    console.error("Erro ao criar usuário:", error);
    res.status(400).json({ error: error.message });
   }
};