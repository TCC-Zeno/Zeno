import {
    addServices,
    getServicesID,
    updateServices,
    deleteServices
} from "../services/servicesServices.js"

export const addServicesform = async (req, res) => {
    try {
        const { userId,
            status,
            name_customer,
            date,
            description,
            pending_amount,
            name_services,
            number_customer } = req.body;
        //criar a tabela

        // const financeData = { userId, name, value, category, payment_method, type_flow };
        // const newFinance=  await addFinance(financeData);
        const newServices = await addServices(userId,
            status,
            name_customer,
            date,
            description,
            pending_amount,
            name_services,
            number_customer);
        res.status(201).json(newServices);
    } catch (error) {
        // Log detalhado para debug
        console.error("Erro ao criar usuário:", error);
        res.status(400).json({ error });
    }
};

export const servicesId = async (req, res) => {
    const { uuid } = req.body;
    try {
        if (!uuid) {
            return res.status(400).json({ error: "ID não informado." });
        }
        const data = await getServicesID(uuid);
        if (!data) {
            return res.status(404).json({ error: "Usuário não encontrado para o ID informado." });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: `Erro interno ao atualizar pesquisa: ${error.message}` });
    }
};

export const editServicesForm = async (req, res) => {
    try {
        const { userId,
            status,
            name_customer,
            date,
            description,
            pending_amount,
            name_services,
            number_customer,
            id } = req.body;
        const updatedServices = await updateServices(userId,
            status,
            name_customer,
            date,
            description,
            pending_amount,
            name_services,
            number_customer,
            id);
        res.status(200).json(updatedServices);
    } catch (error) {
        console.error("Erro ao editar serviços:", error);
        res.status(400).json({ error: error.message });
    }
};

export const servicesDelete = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedServices = await deleteServices(id);
        res.status(200).json(deletedServices);
    } catch (error) {
        console.error("Erro ao deletar serviços:", error);
        res.status(400).json({ error: error.message });
    }
};
