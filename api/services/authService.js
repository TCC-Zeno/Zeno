import supabase from "../config/supabaseClient.js";

// Cadastrar usuário
export const createUser = async (userData) => {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select();

  if (error) throw new Error(error.message);
  return data;
};

// Login de usuário
export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();
  // coloquei para garantir que não de erro, já que o single dá erro se não encontrar

  if (error && error.code !== "PGRST116") throw new Error(error.message);
  return data;
};
export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uuid", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const updateUserPassword = async (email, hashedPassword) => {
  const { data, error } = await supabase
    .from("users")
    .update({ password: hashedPassword })
    .eq("email", email)
    .select();
  if (error) throw new Error(error.message);
  return data;
}
