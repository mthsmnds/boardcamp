import { Router } from "express";
import {gamesSchema} from "../schemas/gamesSchema.js"
import {getGames, addGames} from "../controllers/gamesController.js"
import validateSchema from "../middlewares/schemaMiddleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);

gamesRouter.post("/games", validateSchema(gamesSchema), addGames);

export default gamesRouter;
