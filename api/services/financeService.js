import supabase from "../config/supabaseClient.js";

export const addFinance = async (financeData)=>{
    const{data, error} = await supabase
    .from("finance")
    .insert(financeData)
    .select();
      
    if (error) throw new Error(error.message);
    return data;
}