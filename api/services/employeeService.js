import supabase from "../config/supabaseClient.js"

export const create = async (employeeData) => {

  const { data, error } = await supabase
    .from("employee")
    .insert([employeeData])
    .select();


  if (error) {
    throw error;
  }
  return data;
}
export const getEmployeeCnpj = async (cnpj) => {
  const { data, error } = await supabase
    .from("employee")
    .select("*")
    .eq("cnpj", cnpj)

  console.log("service: ", data)
  if (error) {
    throw error;
  }
  return data;
};
export const getEmployeeByEmail = async (email) => {
  const { data, error } = await supabase
    .from("employee")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  console.log(error)
  if (error && error.code !== "PGRST116") throw new Error(error.message);
  return data;
};
export const getEmployeeById = async (id) => {
  if (!id) return null;
  const { data, error } = await supabase
    .from('employee')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};
export const destroy = async (id) => {
  const { error } = await supabase
    .from("employee")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return { success: true, message: "Employee deleted successfully" };
};
