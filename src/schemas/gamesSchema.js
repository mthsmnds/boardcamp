import joi from "joi";

export const customerSchema = joi.object({
    name:joi.string().min(1).required(),
    image:joi.string(),
    stockTotal:joi.number().positive().required(),
    pricePerDay:joi.number().positive().required()
    });