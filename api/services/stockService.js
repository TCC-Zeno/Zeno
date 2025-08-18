
import supabase from "../config/supabaseClient.js";

export const addProduct = async (name, description, product_category, minimum_quantity, image, fixed_quantity, userId, quantity_of_product, alert) => {
  const { data, error } = await supabase
    .from("product")
    .insert([{
      uuid : userId,
      name,
      description,
      product_category,
      minimum_quantity,
      image,
      fixed_quantity,
      quantity_of_product,
      alert
    }])
    .select();

  if (error) throw error;
  return data;
};

export const addSupplier = async (name, email, telephone, location) => {
  const { data, error } = await supabase
    .from("supplier")
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

export const uploadImage = async (file, uuid) => {

  const fileName = `${uuid}/product_${Date.now()}.png`;

  const { error } = await supabase.storage
    .from("image")
    .upload(fileName, file.buffer, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) throw new Error(error.message);

const{data:publicData} = await supabase.storage
    .from("image")
    .getPublicUrl(fileName);
    

const {data} = await supabase
    .from("product")
    .update({ image: publicData.publicUrl })
    .eq("uuid", uuid)
    .select();

  if (error) throw new Error(error.message);
  return data;

  }

export const getProduct = async () => {
  const { data, error } = await supabase
    .from("product")
    .select("*");
  if (error) throw error;
  return data;
};

export const updateProduct = async (id, productData) => {
  const { data, error } = await supabase
    .from("product")
    .update(productData)
    .match({ id });
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id) => {
  const { data, error } = await supabase
    .from("product")
    .delete()
    .match({ id });
  if (error) throw error;
  return data;
};

export const getSupplier = async () => {
  const { data, error } = await supabase
    .from("supplier")
    .select("*");
  if (error) throw error;
  return data;
};

export const updateSupplier = async (id, supplierData) => {
  const { data, error } = await supabase
    .from("supplier")
    .update(supplierData)
    .match({ id });
  if (error) throw error;
  return data;
};

export const deleteSupplier = async (id) => {
  const { data, error } = await supabase
    .from("supplier")
    .delete()
    .match({ id });
  if (error) throw error;
  return data;
};

export default supabase;