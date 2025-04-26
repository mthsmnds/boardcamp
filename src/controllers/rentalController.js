import { db } from "../database/dbConnection"

export async function getRentals(req, res){
    try {
        const rentals = await db.query(`SELECT * FROM rentals;`);
        res.send(rentals.rows);
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}


export async function getRentals_Id(req, res){
    const {id} = req.params; 
    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
        res.send(rental.rows[0]);
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}


export async function addRentals(req, res){
    const {customerId, gameId, daysRented} = req.body
    try {
        await db.query(`
            INSERT INTO rentals (customerID, gameId, daysRented)
                VALUES ($1, $2, $3);
                `,[customerId, gameId, daysRented]);
        res.sendStatus(201);
        
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}

export async function deleteRentals(req, res){
    const {id} = req.params;
    try {
        await db.query(`DELETE FROM rentals WHERE id=$1`, [id])
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}

export async function returnRentals(req, res){
    const {id} = req.params;
    const {returnDate, delayFee} = req.body;
    try {
        await db.query(`
            UPDATE rentals SET returnDate=$1, delayFee=$2
                WHERE id=$3;
            `,[returnDate, delayFee, id]);
            res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}

