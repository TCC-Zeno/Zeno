
import supabase from "../config/supabaseClient.js";

//adiçao de finança pelo dashboard
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