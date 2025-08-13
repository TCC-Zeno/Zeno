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
  const { data, error } = await supabase
    .from("task")
    .select("*")
    .eq("uuid", uuid);

  if (error) throw new Error(error.message);
  return data;
};

export const editTask = async (uuid, date, information, status, id) => {
  const { data, error } = await supabase
    .from("task")
    .update({
      date,
      information,
      status,
      uuid,
    })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateTaskStatus = async (id, status) => {
  const { data, error } = await supabase
    .from("task")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteTask = async (id) => {
  const { data, error } = await supabase
    .from("task")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};
