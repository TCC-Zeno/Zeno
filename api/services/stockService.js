import supabase from "../config/supabaseClient.js";

// Criar produto
export const addProduct = async (
  ProductName,
  Description,
  Category,
  MinimumQuantity,
  Image,
  FixedQuantity,
  userId,
  StockQuantity,
  Price,
  Price1,
  supplierInfo
) => {
  const { data, error } = await supabase
    .from("product")
    .insert([
      {
        uuid: userId,
        name: ProductName,
        supplierInfo: supplierInfo, 
        description: Description,
        product_category: Category, 
        minimum_quantity: MinimumQuantity,
        image: Image,
        fixed_quantity: FixedQuantity,
        quantity_of_product: StockQuantity,
        price: Price,
        price1: Price1,
        alert: "default", 
      },
    ])
    .select();

  if (error) throw error;
  return data;
};

// Criar fornecedor
export const addSupplier = async (name, email, phone, Address, userId) => {
  const { data, error } = await supabase
    .from("supplier")
    .insert([
      {
        name,
        email,
        Number:phone,  
        Address, 
        uuid: userId,
      },
    ])
    .select();

  if (error) throw error;
  return data;
};

// Upload de imagem e retorno da URL pública
export const uploadImage = async (file, uuid) => {
  const fileName = `${uuid}/product_${Date.now()}.png`;

  const { error } = await supabase.storage
    .from("image_stock")
    .upload(fileName, file.buffer, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error(error.message);

  // retorna apenas a URL pública
  const { data: publicData } = await supabase.storage
    .from("image_stock")
    .getPublicUrl(fileName);

  return publicData.publicUrl;
};


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