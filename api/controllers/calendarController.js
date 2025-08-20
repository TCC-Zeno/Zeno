import {
  getAppoimentByUuid,
  insertEvents,
} from "../services/calendarService.js";

export const getAppoiment = async (req, res) => {
  try {
    const { uuid } = req.body;
    console.log("Fetching appointments for UUID:", uuid);
    
    if (!uuid) {
      return res.status(400).json({ error: "UUID é obrigatório" });
    }
    
    const getInfos = await getAppoimentByUuid(uuid);
    
    if (!getInfos || getInfos.length === 0) {
      return res.status(404).json({ error: "Nenhum evento encontrado para este usuário" });
    }
    
    return res.status(200).json(getInfos);
  } catch (err) {
    console.error("Error in getAppoiment:", err);
    res.status(500).json({ error: `Erro interno: ${err.message}` });
  }
};

export const insertAppoitment = async (req, res) => {
  try {
    const { uuid, title, initial_date, end_date } = req.body;
    
    // Validate required fields
    if (!uuid || !title || !initial_date || !end_date) {
      return res.status(400).json({ 
        error: "Todos os campos são obrigatórios: uuid, title, initial_date, end_date" 
      });
    }
    
    const insertAppoiment = await insertEvents(
      uuid,
      title,
      initial_date,
      end_date
    );
    
    if (!insertAppoiment) {
      return res.status(404).json({ error: "Erro ao inserir evento." });
    }
    
    res.status(201).json(insertAppoiment);
  } catch (err) {
    console.error("Error in insertAppoitment:", err);
    res.status(500).json({ error: `Erro interno: ${err.message}` });
  }
};