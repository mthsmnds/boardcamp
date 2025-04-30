import { db } from "../database/dbConnection.js";

export async function getGamesRepo(){
    const result = await db.query(`SELECT * FROM games;`);
    return result;
}

export async function getGamesByNameRepo(name){
    const result = await db.query(`SELECT * FROM games WHERE name=$1;`, [name]);
    if(result.rowCount === 0) return null;
    return result;
}
 
export async function getGamesByIdRepo(id){
 const result = await db.query(`SELECT * FROM games WHERE id =$1`, [id]);
 return result.rows[0];
 }

export async function addGamesRepo(name, image, stockTotal, pricePerDay){

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