import { db } from "../database/dbConnection.js";

export async function getCustomerRepo(){
    const result = await db.query(`SELECT * FROM customers;`);
    return result;
}

export async function getCustomerIdRepo(id){
    const result = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id]);
    return result.rows[0];
}

export async function getCustomerCpfRepo(cpf){
    const result = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [cpf]);
    if(result.rowCount === 0) return null;
    return result;
}

export async function addCustomerRepo(name, phone, cpf){
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