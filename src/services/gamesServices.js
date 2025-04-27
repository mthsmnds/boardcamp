import { db } from "../database/dbConnection.js"

export async function addGamesService({name, image, stockTotal, pricePerDay}){

    const conflict = await db.query(`SELECT * FROM games WHERE name =$1`, [name]);
    if(conflict.rowCount !== 0) return null;

    const result = await db.query(`
        INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4) RETURNING id;
        `,
        [name, image, stockTotal, pricePerDay]);
    
    const idGame = result.rows[0].id;

    return {
        id: idGame,
        name,
        image,
        stockTotal,
        pricePerDay
    }
    
}

export async function getGamesService(){
    const games = await db.query(`SELECT * FROM games;`);
    return games;
}