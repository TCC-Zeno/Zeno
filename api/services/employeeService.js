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
