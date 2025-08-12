import supabase from "../config/supabaseClient.js";

export const addFinance = async (
  userId,
  name,
  value,
  category,
  payment_method,
  type_flow
) => {
  console.log(userId, name, value, category, payment_method, type_flow);
  const { data, error } = await supabase
    .from("finance")
    .insert({
      uuid: userId,
      name,
      value,
      category,
      payment_method,
      type_flow,
    })
    .select();


  if (error) throw new Error(error.message);
  return data;
};

export const getFinanceID = async (uuid) => {
  const { data, error } = await supabase
    .from("finance")
    .select("*")
    .eq("uuid", uuid)


  if (error) throw new Error(error.message);
  return data;
};

export const getFinanceCategoria = async (uuid) => {
  console.log(uuid);
  const { data, error } = await supabase
    .from("category")
    .select("*")
    .eq("uuid", uuid)

  console.log(data, error);
  if (error) throw new Error(error.message);
  return data;
};

export const postFinanceCategoria = async (uuid, categoria) => {
  console.log(uuid, categoria);
  const { data, error } = await supabase
    .from("category")
    .insert({
      uuid,
      categoria
    })
console.log(data, error);
  if (error) throw new Error(error.message);
  return data;
};