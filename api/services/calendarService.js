import supabase from "../config/supabaseClient.js";

export const getAppoimentByUuid = async (uuid) => {
  const { data, error } = await supabase
    .from("calendar")
    .select("*")
    .eq("uuid", uuid)

  if (error) throw new Error(error.message);
  return data;
};

export const getAppoimentById = async (id) => {
  const { data, error } = await supabase
    .from("calendar")
    .select("*")
    .eq("id", id)

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
export const  update = async (uuid, title, initial_date, end_date) =>{
  const {data, error} = await supabase
  .from("calendar")
  .update({uuid, title, initial_date, end_date})
  .eq("uuid", uuid)
  .select()

  if (error) throw new Error(error.message);
  console.log("Service: ", data);
  return data;
}
export const destroy = async (id)=> {
  const {data, error} = await supabase
  .from("calendar")
  .delete()
  .eq("id", id)

  if (error) throw new Error(error.message);
  return data;
}
