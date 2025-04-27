import joi from "joi";

export const rentalSchema = joi.object({
    customerId:joi.number().integer().required(),
    gameId:joi.number().integer().required(),
    daysRented:joi.number().integer().positive().required()
    });