import { db } from "../database/dbConnection.js";

export async function getRentalRepo(){
    const result = await db.query(`
        SELECT
            rentals.*,
            customers.id AS "customerId", customers.name AS "customerName",
            games.id AS "gameId", games.name AS "gameName"
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        Join games ON rentals."gameId" = games.id;
        `);
    return result;
}

export async function getRentalIdRepo(id){
    const result = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id]);
    return result.rows[0];
}

export async function getRentalValidRepo(gameId){
    const result= await db.query(`SELECT COUNT(*) FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL`, [gameId]);   
    const rentedCount = Number(result.rows[0].count);                                                                    

    return rentedCount;
}

export async function addRentalRepo(customerId, gameId, daysRented, originalPrice){
    await db.query(`
        INSERT INTO rentals 
            ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, CURRENT_DATE, $3, null, $4, null);
            `,
        [customerId, gameId, daysRented, originalPrice]
    );

}

export async function deleteRentalRepo(id){
    await db.query(`DELETE FROM rentals WHERE id=$1`, [id]);
}

export async function getRentalGameRepo(id){
    const result = await db.query(`
        SELECT rentals.*, games."pricePerDay"
        FROM rentals
        JOIN games ON rentals."gameId" = games.id
        WHERE rentals.id =$1
        `, [id]);

    return result.rows[0];
}

export async function updateRentalRepo(id, delayFee){
    await db.query(`
        UPDATE rentals
        SET "returnDate" = CURRENT_DATE, "delayFee" = $1
        WHERE id =$2
        `, [delayFee, id]);
}