import { addGamesService, getGamesService } from "../services/gamesServices.js";

export async function getGames(req, res){
        const result = await getGamesService();
        res.send(result.rows);

}

export async function addGames(req, res){
        const result = await addGamesService(req.body);
        res.status(201).send(result);
        
}