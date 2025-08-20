import supabase from "../config/supabaseClient.js";

export const getAppoimentByUuid = async (uuid) => {
  const { data, error } = await supabase
    .from("calendar")
    .select("*")
    .eq("uuid", uuid)

  if (error) throw new Error(error.message);
  return data;
};

export const insertEvents = async (uuid, title, initial_date, end_date ) => {
  const { data, error } = await supabase
  .from("calendar")
  .insert({uuid, title, initial_date, end_date})
  .select()
  
  if (error) throw new Error(error.message);
  return data;
  
};

