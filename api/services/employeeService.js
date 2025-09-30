import supabase from "../config/supabaseClient.js"

export const create = async (employeeData) => {

    const { data, error } = await supabase
        .from("users")
        .insert([employeeData])
        .select();


    if (error) {
        throw error;
    }
    return data;
}
