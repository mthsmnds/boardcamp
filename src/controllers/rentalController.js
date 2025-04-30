import { addRentalService, deleteRentalService, getRentalService, returnRentalService } from "../services/rentalServices.js";

export async function getRentals(req, res){
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

        res.send(rentals);

}

export async function addRentals(req, res){
        const result = await addRentalService(req.body);
        res.status(201).send(result);
        
}

export async function deleteRentals(req, res){
    const {id} = req.params;
        await deleteRentalService(id);
        res.sendStatus(200);
}

export async function returnRentals(req, res){
    const {id} = req.params;
        await returnRentalService(id);
        res.sendStatus(200);
}

