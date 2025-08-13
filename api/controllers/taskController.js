import{
    addTask,
    getTaskID,
    deleteTask,
    editTask

} from "../services/taskService.js";

export const createTask = async (req, res) => {
  const { uuid, date, information, status } = req.body;
  console.log({
    date: date,
    information: information,
    uuid: uuid,
    status: status,
  });
  try {
    const tasks = await addTask(date, information, uuid, status);
    res.status(201).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const taskID = async(req, res)=>{
  const {uuid} = req.body;
  console.log(uuid);
  try{
    if (!uuid) {
      return res.status(400).json({ error: "ID não informado." });
    }
    const data = await getTaskID(uuid);
    if (!data) {
      return res.status(404).json({ error: "Usuário não encontrado para o ID informado." });
  }
    res.status(200).json(data);
}catch (error) {
    res.status(500).json({ error: `Erro interno ao atualizar pesquisa: ${error.message}` });
  }
};

export const taskEdit = async (req, res) => {
  try {
    const { uuid, date, information, status, id } = req.body;
    const tasks = await editTask(uuid, date, information, status, id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const taskDelete = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("ID do item a ser deletado lazuzu:", id);
    const tasks = await deleteTask(id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
