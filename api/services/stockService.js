
import supabase from "../config/supabaseClient.js";

export const addProduct = async (name, description, alert, product_category, minimum_quantity, image, fixed_quantity, userId) => {
  const { data, error } = await supabase
    .from("product")
    .insert([{
      uuid : userId,
      name,
      description,
      alert,
      product_category,
      minimum_quantity,
      image,
      fixed_quantity
    }])
    .select();

  if (error) throw error;
  return data;
};

export const addSupplier = async (name, email, telephone, location) => {
  const { data, error } = await supabase
    .from("suppliers")
    .insert([{
      name,
      email,
      telephone,
      location
    }])
    .select();
  if (error) throw error;
  return data;
};


export const addStock = async (quantity_of_product, product_id, userId) => {
  const { data, error } = await supabase
    .from("stocks")
    .insert([{
      quantity_of_product,
      product_id,
      uuid: userId
    }])
    .select();
  if (error) throw error;
  return data;
};

/*
export const getStocks = async () => {
  const { data, error } = await supabase
    .from("stocks")
    .select("*");
  if (error) throw error;
  return data;
};

export const updateStock = async (id, stockData) => {
  const { data, error } = await supabase
    .from("stocks")
    .update(stockData)
    .match({ id });
  if (error) throw error;
  return data;
};

export const deleteStock = async (id) => {
  const { data, error } = await supabase
    .from("stocks")
    .delete()
    .match({ id });
  if (error) throw error;
  return data;
};

export default supabase;
*/