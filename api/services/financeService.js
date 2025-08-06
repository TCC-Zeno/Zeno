import supabase from "../config/supabaseClient.js";

export const addFinance = async (uuid, name, value, category, payment_method, type_flow)=>{
    console.log(uuid, name, value, category, payment_method, type_flow)
    const{data, error} = await supabase
    .from("finance")
    .insert({
        uuid,
        name,
        value,
        category,
        payment_method,
        type_flow
    })
    .select();

    console.log(error)
    console.log(data)
      
    if (error) throw new Error(error.message);
    return data;
}