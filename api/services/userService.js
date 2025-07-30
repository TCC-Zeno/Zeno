import supabase from "../config/supabaseClient.js";

export const updateUser = async (uuid, updateData = {}) => {

  const { data, error } = await supabase
    .from("users")
    .update({
      company_name: updateData.companyName, 
      owner_name: updateData.ownerName ,
      color: updateData.color,
      accessibility:updateData.accessibility || "Padrão",
    })
    .eq("uuid", uuid)
    .select();

  if (error) throw new Error(error.message);
  return data;
};
export const getUserById = async(uuid) =>{
    const {data, error} = await supabase
    .from("users")
    .select("*")
    .eq("uuid", uuid)
    .single();

      if (error) throw new error (error.message)
        return data;
};