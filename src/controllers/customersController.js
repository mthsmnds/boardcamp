export async function getCustomers(req, res){
    try {
        const customers = await db.query(`SELECT * FROM customers;`);
        res.send(customers.rows);
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}

export async function getCustomer_Id(req, res){
    const {id} = req.params; 
    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id]);
        res.send(customer.rows[0]);
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}


export async function addCustomers(req, res){
    const {name, phone, cpf} = req.body
    try {
        await db.query(`
            INSERT INTO customers (name, phone, cpf)
                VALUES ($1, $2, $3);
                `,[name, phone, cpf]);
        res.sendStatus(201);
        
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}