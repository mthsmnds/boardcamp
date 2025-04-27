import { Router } from "express";
import { rentalSchema }from "../schemas/rentalSchema.js"
import { addRentals, deleteRentals, getRentals, returnRentals } from "../controllers/rentalController.js";
import validateSchema from "../middlewares/schemaMiddleware.js";

const rentalRouter = Router();

rentalRouter.get("/rentals", getRentals);

rentalRouter.post("/rentals", validateSchema(rentalSchema), addRentals);
rentalRouter.post("/rentals/:id/return", returnRentals);

rentalRouter.delete("/rentals/:id", deleteRentals);

export default rentalRouter;
