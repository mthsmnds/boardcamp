import { db } from "../database/dbConnection.js"
import { getCustomerIdRepo } from "../repositories/customersRepo.js";
import { getGamesByIdRepo } from "../repositories/gamesRepo.js";
import { addRentalRepo, deleteRentalRepo, getRentalGameRepo, getRentalIdRepo, getRentalRepo, getRentalValidRepo, updateRentalRepo } from "../repositories/rentalRepo.js";

export async function getRentalService(){
    const result = await getRentalRepo();
    return result;
}

export async function addRentalService({customerId, gameId, daysRented}){
    if(!customerId || !gameId || daysRented<=0){
        throw{type: "invalidRentalInfo", message:"Dados inválidos para aluguel"};
    }

    const customerResult = await getCustomerIdRepo(customerId); 
    console.log("customerResult", customerResult);
    if(!customerResult){                                                         
        throw{type:"notFound_Customer", message:"Cliente não encontrado"};                            
    }

    const game = await getGamesByIdRepo(gameId);  
    console.log("game", game)
    if(!game){                                            
        throw{type:"notFound_Game", message:"Jogo não encontrado"};                     
    }

    const rentedCount = await getRentalValidRepo(gameId);     
    console.log("rentedCount", rentedCount)                                                                                                                                                                              
    if(rentedCount >= game.stockTotal){                                                                                      
        throw{type:"notAvaiable", message:"Jogo sem estoque para aluguel"};                                        
    }

    const originalPrice = daysRented * game.pricePerDay;

    const result = await addRentalRepo(customerId, gameId, daysRented, originalPrice);
    return result;

}

export async function deleteRentalService(id){
    const result = await getRentalIdRepo(id);

    if(!result){
        throw{type:"notFound_Rental", message:"Aluguel não encontrado"}
    }

    if(result.returnDate === null){
        throw{type: "unfinished", message:"Aluguel não finalizado"};
    }

    await deleteRentalRepo(id);

}

export async function returnRentalService(id){
    const rental = await getRentalGameRepo(id);

    if(!rental){
        throw{type:"notFound_Rental", message:"Aluguel não encontrado"};
    }

    if(rental.returnDate !== null){
        throw{type: "finished", message:"Aluguel já finalizado"}
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

    await updateRentalRepo(id, delayFee);
}