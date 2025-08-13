import supabase from "../config/supabaseClient.js";
let filenome = "";

export const updateUser = async (uuid, updateData = {}) => {
  const { data, error } = await supabase
    .from("users")
    .update({
      company_name: updateData.companyName,
      owner_name: updateData.ownerName,
      color: updateData.color,
      accessibility: updateData.accessibility || "Padrão",
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

  const fileToUpload = file instanceof File ? file : file[0] || file.logo;
  const fileName = `${uuid}/user_${Date.now()}.png`;
  const { data, error } = await supabase.storage
    .from("logos")
    .upload(fileName, fileToUpload, {
      contentType: "image/png",
      upsert: false,
    });
  if (error) throw new Error(error.message);

const{data:publicData} = await supabase.storage
    .from("logos")
    .getPublicUrl(fileName);

  if (error) throw new Error(error.message);
  console.log(publicData.publicUrl)
  return publicData.publicUrl
};

export const getImageUrl = async () => {
  ;
};


