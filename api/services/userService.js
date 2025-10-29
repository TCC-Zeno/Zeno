import supabase from "../config/supabaseClient.js";


export const updateUser = async (uuid, updateData = {}) => {
  //const featuresJSON = JSON.stringify(updateData.features, null, 2);

  const { data, error } = await supabase
    .from("users")
    .update({
      company_name: updateData.companyName,
      name: updateData.name,
      color: updateData.color,
      accessibility: updateData.accessibility || "Padrão",
      features: updateData.features 
    })
    .eq("uuid", uuid)
    .select();

  if (error) throw new Error(error.message);
  return data;
};
export const getUserById = async (uuid) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uuid", uuid)
    .single();

  if (error) throw new error(error.message);
  return data;
};

// Upload para Supabase Storage
export const uploadImage = async (file, uuid) => {

  const fileName = `${uuid}/user_${Date.now()}.png`;

  const { error } = await supabase.storage
    .from("logos")
    .upload(fileName, file.buffer, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) throw new Error(error.message);

const{data:publicData} = await supabase.storage
    .from("logos")
    .getPublicUrl(fileName);
    

const {data} = await supabase
    .from("users")
    .update({ logo: publicData.publicUrl })
    .eq("uuid", uuid)
    .select();

  if (error) throw new Error(error.message);
  return data;

  }
