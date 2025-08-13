import supabase from "../config/supabaseClient.js";

export const addTask = async (date, information, uuid, status) => {
  const { data, error } = await supabase
    .from("task")
    .insert({ date, information, uuid, status })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getTaskID = async (uuid) => {
  console.log(uuid);
  const { data, error } = await supabase
    .from("task")
    .select("*")
    .eq("uuid", uuid)

  console.log(data, error);
  if (error) throw new Error(error.message);
  return data;
};


export const editTask = async (
  uuid,
  date,
  information,
  status,
  id
) => {
  console.log(uuid, information, status, id);
  const { data, error } = await supabase
    .from("task")
    .update({
      date,
      information,
      status,
      uuid
    })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteTask = async (id) => {
    console.log("ID do item a ser deletado: labubu", id);
  const { data, error } = await supabase
    .from("task")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};