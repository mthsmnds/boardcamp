import { addCustomerService, getCustomerIdService, getCustomerService } from "../services/customersServices.js";

export async function getCustomers(req, res) {
        const result = await getCustomerService();
        res.send(result.rows);
}

export async function getCustomer_Id(req, res) {
    const { id } = req.params;
        const result = await getCustomerIdService(id);
        res.send(result.rows);
}

export async function addCustomers(req, res) {
        const result = await addCustomerService(req.body)
        res.status(201).send(result);

}