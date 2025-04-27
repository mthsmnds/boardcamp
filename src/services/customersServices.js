import { db } from "../database/dbConnection.js";

export async function addCustomerService({ name, phone, cpf }) {
    const conflict = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf]);
    if (conflict.rowCount !== 0) return null;

    const result = await db.query(`
        INSERT INTO customers (name, phone, cpf)
                VALUES ($1, $2, $3) RETURNING id;
                `, [name, phone, cpf]);

    const idCustomer = result.rows[0].id;

    return {
        id: idCustomer,
        name,
        phone,
        cpf
    }

}

export async function getCustomerService() {
    const result = await db.query(`SELECT * FROM customers;`);
    return result;
}

export async function getCustomerIdService(id) {
    const result = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id]);
    if(result.rowCount === 0) return null;
    return result;
}