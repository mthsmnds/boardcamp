import { Router } from "express";
import { rentalSchema }from "../schemas/rentalSchema.js"
import { addRentals, deleteRentals, getRentals, getRentals_Id, returnRentals } from "../controllers/rentalController.js";
import validateSchema from "../middlewares/schemaMiddleware.js";

const rentalRouter = Router();

rentalRouter.get("/rentals", getRentals);
rentalRouter.get("/rentals/:id", getRentals_Id);

rentalRouter.post("/rentals", validateSchema(rentalSchema), addRentals);

rentalRouter.delete("/rentals/:id", deleteRentals);

rentalRouter.put("/rentals/:id/return", returnRentals);

export default rentalRouter;
