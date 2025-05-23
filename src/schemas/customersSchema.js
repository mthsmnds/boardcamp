import joi from "joi";

export const customerSchema = joi.object({
    name:joi.string().min(1).required(),
    phone:joi.string().min(10).max(11).pattern(/^\d+$/).required(),
    cpf:joi.string().length(11).pattern(/^\d+$/).required(),
    });