import supabase from "../config/supabaseClient.js";

export const addFinance = async (
  userId,
  name,
  value,
  category,
  payment_method,
  type_flow
) => {
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
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

export const getFinanceWithPeriod = async (uuid, periodStart, periodEnd) => {
  const { data, error } = await supabase
    .from("finance")
    .select("*")
    .eq("uuid", uuid)
    .gte("created_at", periodStart)
    .lt("created_at", periodEnd);
  if (error) throw new Error(error.message);
  return data;
};

export const getFinanceCategoria = async (uuid) => {
  const { data, error } = await supabase
    .from("category")
    .select("*")
    .eq("uuid", uuid);

  if (error) throw new Error(error.message);
  return data;
};

export const postFinanceCategoria = async (uuid, categoria) => {
  const { data, error } = await supabase.from("category").insert({
    uuid,
    categoria,
  });
  if (error) throw new Error(error.message);
  return data;
};

export const editFinance = async (
  userId,
  name,
  value,
  category,
  payment_method,
  type_flow,
  id
) => {
  const { data, error } = await supabase
    .from("finance")
    .update({
      uuid: userId,
      name,
      value,
      category,
      payment_method,
      type_flow,
    })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteFinance = async (id) => {
  const { data, error } = await supabase
    .from("finance")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};
