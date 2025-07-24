import supabase from "../config/supabaseClient.js";

export const updateUser = async (id, updateData = {}) => {

  const { data, error } = await supabase
    .from("users")
    .update({
      company_name: updateData.companyName, 
      owner_name: updateData.ownerName ,
      color: updateData.color,
    })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};
export const getUserById = async(id) =>{
    const {data, error} = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

      if (error) throw new error (error.message)
        return data;
};