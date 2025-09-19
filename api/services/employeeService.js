import supabase from "../config/supabaseClient.js"

export const create = async (employeeData) => {
    await supabase
        .from("user")
        .insert([employeeData])
        .select()
}