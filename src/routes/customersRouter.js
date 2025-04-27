import { Router } from "express";
import {addCustomers, getCustomer_Id, getCustomers} from "../controllers/customersController.js"
import validateSchema from "../middlewares/schemaMiddleware.js";
import { customerSchema } from "../schemas/customersSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomer_Id);

customersRouter.post("/customers", validateSchema(customerSchema), addCustomers);

export default customersRouter;
