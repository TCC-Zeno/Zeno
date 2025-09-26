import supabase from "../config/supabaseClient.js"

export const create = async (employeeData) => {
    const { data, error } = await supabase
        .from("user")
        .insert([employeeData])
        .select()

    if (error) throw error;
    return data;
}