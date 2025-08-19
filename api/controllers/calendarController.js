import {insertEvents} from  "../services/calendarService.js"

export const insertAppoitment = async (req, res) =>{
    try{
        const {uuid, title, initial_date, end_date} = req.body;
        if(!uuid){
            res.status(400).jso({err:"Erro ao encontrar usuario"})
        }
        const insertAppoiment = await insertEvents (uuid,  title, initial_date, end_date)
        if(!insertAppoiment){
            return res.status(400).json({ err:"Erro ao atualizar dados."})
        }
        res.status(200).json(insertAppoiment);
  } catch (err) {
    res.status(500).json({ err: `Erro interno ao atualizar usuário: ${err.message}` });
  }
}