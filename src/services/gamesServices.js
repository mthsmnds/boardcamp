import { addGamesRepo, getGamesByNameRepo, getGamesRepo } from "../repositories/gamesRepo.js";

export async function addGamesService({name, image, stockTotal, pricePerDay}){

     const conflict = await getGamesByNameRepo(name);
     if (conflict){
         throw{type:"conflictName", message:"Jogo com esse nome já cadastrado"}
     };

  const result = await addGamesRepo(name, image, stockTotal, pricePerDay);
  return result;
}

export async function getGamesService(){
    const result = await getGamesRepo();
    return result;
}