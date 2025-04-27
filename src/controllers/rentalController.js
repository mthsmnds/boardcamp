import { db } from "../database/dbConnection.js"
import { addRentalService, deleteRentalService, getRentalService, returnRentalService } from "../services/rentalServices.js";

export async function getRentals(req, res){
    try {
        const result = await getRentalService();
        
        const rentals = result.rows.map(rental =>({
            id: rental.id,
            customerId: rental.customerId,
            gameId: rental.gameId,
            rentDate: rental.rentDate,
            daysRented: rental.daysRented,
            returnDate: rental.returnDate,
            originalPrice: rental.originalPrice,
            delayFee: rental.delayFee,
            customer: {id: rental.customerId, name: rental.customerName},
            game: {id: rental.gameId, name: rental.gameName},
        }));

        res.send(rentals)

    } catch (error) {
        res.status(500).send(error.message)
        
    }
}


export async function addRentals(req, res){

    try {
        const result = await addRentalService(req.body);
        res.status(201).send(result.rows);
        
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}

export async function deleteRentals(req, res){
    const {id} = req.params;
    try {
        await deleteRentalService(id);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}

export async function returnRentals(req, res){
    const {id} = req.params;
    try {
        await returnRentalService(id);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}

