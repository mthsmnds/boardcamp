import { db } from "../database/dbConnection.js"

export async function getRentalService(){
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

export async function addRentalService({customerId, gameId, daysRented}){
    if(!customerId || !gameId || daysRented<=0){
        throw{type: "bad_request", message:"Dados inválidos para aluguel"};
    }

    const customerResult = await db.query(`SELECT * FROM customers WHERE id=$1`, [customerId]); //
    if(customerResult.rowCount === 0){                                                          // VERIFICA SE O CLIENTE EXISTE
        throw{type:"not_found", message:"Cliente não encontrado"};                              //
    }

    const gameResult = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId]);  //
    if(gameResult.rowCount === 0){                                                  // VERIFICA SE O JOGO EXISTE
        throw{type:"not_found", message:"Jogo não encontrado"};                     //
    }

    const game = gameResult.rows[0];                                                                                            //
    const rentalsResult = await db.query(`SELECT COUNT(*) FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL`, [gameId]);  // 
    const rentedCount = Number(rentalsResult.rows[0].count);                                                                    //
                                                                                                                                // VERIFICA SE TEM ESTOQUE
    if(rentedCount >= game.stockTotal){                                                                                         // 
        throw{type:"unprocessable_entity", message:"Jogo sem estoque para aluguel"};                                            //
    }

    const originalPrice = daysRented * game.pricePerDay;

    const result = await db.query(`
        INSERT INTO rentals 
            ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, CURRENT_DATE, $3, null, $4, null);
            `,
        [customerId, gameId, daysRented, originalPrice]
    );

    return result;
}

export async function deleteRentalService(id){
    const result = await db.query(`SELECT FROM rentals WHERE id=$1`, [id])
    
    const rental = result.rows[0];

    if(!rental){
        throw{type:"not_found"}
    }

    if(rental.returnDate === null){
        throw{type: "bad_request"};
    }

    await db.query(`DELETE FROM rentals WHERE id=$1`, [id]);
}

export async function returnRentalService(id){
    const result = await db.query(`
        SELECT rentals.*, games."pricePerDay"
        FROM rentals
        JOIN games ON rentals."gameId" = games.id
        WHERE rentals.id =$1
        `, [id]);

    const rental = result.rows[0];

    if(!rental){
        throw{type:"not_found"};
    }

    if(rental.returnDate !== null){
        throw{type:"unprocessable_entity"}
    }

    const rentDate = new Date(rental.rentDate);
    const today = new Date();

    const diffTime = today.getTime() - rentDate.getTime();
    const diffDays = Math.floor(diffTime/(1000 * 60 * 60 * 24));

    let delayFee = 0;

    if(diffDays > rental.daysRented){
        const daysLate = diffDays - rental.daysRented;
        delayFee = daysLate * rental.pricePerDay;
    }

    await db.query(`
        UPDATE rentals
        SET "returnDate" = CURRENT_DATE, "delayFEE" = $1
        WHERE id =$2
        `, [delayFee, id]);
}