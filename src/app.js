import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const porta = process.env.PORT || 5000;
app.listen(porta, () => {
    console.log(`Server rodando na porta ${porta}`);
})