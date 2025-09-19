import {
  destroy,
  getAppoimentByUuid,
  getAppoimentById,
  insertEvents,
  update,
} from "../services/calendarService.js";

// Pegar evento com o UUID
export const getAppoimentUuid = async (req, res) => {
  try {
    const { uuid } = req.body;

    if (!uuid) {
      return res.status(400).json({ error: "UUID é obrigatório" });
    }

    const getInfosByUuid = await getAppoimentByUuid(uuid);

    if (!getInfosByUuid || getInfosByUuid.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhum evento encontrado para este usuário" });
    }

    return res.status(200).json(getInfosByUuid);
  } catch (err) {
    console.error("Error in getAppoiment:", err);
    res.status(500).json({ error: `Erro interno: ${err.message}` });
  }
};

//PEGAR EVENTO COM O ID
export const getAppoimentId = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Id é obrigatório" });
    }

    const getInfosById = await getAppoimentById(id);
    if (!getInfosById || getInfosById.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhum evento encontrado para este usuário" });
    }
    return res.status(200).json(getInfosById);
  } catch (err) {
    console.error("Error in getAppoiment:", err);
    res.status(500).json({ error: `Erro interno: ${err.message}` });
  }
};

//INSERIR EVENTO
export const insertAppoitment = async (req, res) => {
  try {
    const { uuid, title, initial_date, end_date } = req.body;
    if (!uuid || !title || !initial_date || !end_date) {
      return res.status(400).json({
        error:
          "Todos os campos são obrigatórios: uuid, title, initial_date, end_date",
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

//ATUALIZAR EVENTO
export const updateAppoiment = async (req, res) => {
  try {
    const { id, title, initial_date, end_date } = req.body;
    console.log('id: ', id)
    console.log('req body:', req.body);

    if (!id) {
      return res.status(400).json({ error: "ID não informado." });
    }

    if (!title && !initial_date && !end_date) {
      return res.status(400).json({ error: "Pelo menos um campo deve ser fornecido para atualização." });
    }

    // const event = await getAppoimentId(id);
    //  console.log('event:' , event);
    // if (!event) {
    //   return res
    //     .status(404)
    //     .json({ error: "Evento não encontrado para o ID informado." });
    //}
    const updateEvents = await update(id, title, initial_date, end_date);

    if (!updateEvents || updateEvents.length === 0) {
      return res
        .status(400)
        .json({
          error: "Falha ao atualizar o evento. Verifique os dados enviados.",
        });
    }
    
    console.log("Controller: ", updateEvents);
    return res.status(200).json(updateEvents);
  } catch (err) {
    res.status(500).json({ error: `Erro interno: ${err.message}` });
  }
};

//DELETAR EVENTO
export const deleteAppoiment = async (req, res) => {
  try{
    const {id} = req.body;

    const deleteEvents = await destroy(id);
    if(!deleteEvents || deleteEvents.length === 0){
      return res.status(400).json({ error: "Falha ao deletar evento." });
    }
    return res.status(200).json(deleteEvents);
    }catch(err){
      res.status(505).json({ error: `Erro interno: ${err.message}` });
    }
  
};
