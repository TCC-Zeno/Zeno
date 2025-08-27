import supabase from "../config/supabaseClient.js";

export const addServices = async (
    userId,
    status,
    name_customer,
    date,
    description,
    pending_amount,
    name_services,
    number_customer
) => {
    const { data, error } = await supabase
        .from("services")
        .insert({
            uuid: userId,
            name_customer,
            date,
            description,
            pending_amount,
            name_services,
            number_customer,
            status,
        })
        .select();

    if (error) throw new Error(error.message);
    return data;
};

export const getServicesID = async (uuid) => {
    console.log("Fetching services for UUID:", uuid); // Log adicionado para depuração
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("uuid", uuid)
    //.order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  console.log("Fetched services data:", data); // Log adicionado para depuração
  return data;
};

export const updateServices = async (
    userId,
    status,
    name_customer,
    date,
    description,
    pending_amount,
    name_services,
    number_customer,
    id
) => {
    const { data, error } = await supabase
        .from("services")
        .update({
            uuid: userId,
            name_customer,
            date,
            description,
            pending_amount,
            name_services,
            number_customer,
            status,
        })
        .eq("id", id)
        .select();

    if (error) throw new Error(error.message);
    return data;
};

export const deleteServices = async (id) => {
  const { data, error } = await supabase
    .from("services")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};