import { addCustomerService, getCustomerIdService, getCustomerService } from "../services/customersServices.js";

export async function getCustomers(req, res) {
    try {
        const result = await getCustomerService();
        res.send(result.rows);
    } catch (error) {
        res.status(500).send(error.message)

    }
}

export async function getCustomer_Id(req, res) {
    const { id } = req.params;
    try {
        const result = await getCustomerIdService(id);
        if(result === null) res.status(404).send("Nenhum usuário com este ID encontrado")

        res.send(result.rows);
    } catch (error) {
        res.status(500).send(error.message)

    }
}

export async function addCustomers(req, res) {
    try {
        const result = await addCustomerService(req.body)
        if (result === null) {
            return res.status(409).send("Esse CPF já está cadastrado");
        }

        res.status(201).send(result);

    } catch (error) {
        res.status(500).send(error.message)

    }
}