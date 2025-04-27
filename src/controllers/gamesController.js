
import { addGamesService, getGamesService } from "../services/gamesServices.js";

export async function getGames(req, res){
    try {
        const result = await getGamesService();
        res.send(result.rows);
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}


export async function addGames(req, res){

    try {
        const result = await addGamesService(req.body);
        
        if (result === null){
            return res.status(409).send("Um jogo com esse nome já está cadastrado");
        }

        res.status(201).send(result);
        
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}