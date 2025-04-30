import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import customersRouter from "./routes/customersRouter.js";
import gamesRouter from "./routes/gamesRouter.js";
import rentalRouter from "./routes/rentalRouter.js";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(customersRouter);
app.use(gamesRouter);
app.use(rentalRouter);

app.use(errorHandler);

const porta = process.env.PORT || 5000;
app.listen(porta, () => {
    console.log(`Server rodando na porta ${porta}`);
})