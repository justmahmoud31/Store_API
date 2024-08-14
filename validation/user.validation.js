import Joi from "joi";

export const signupVal =  Joi.object({
    id:Joi.number().required(),
    userName: Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][A-Zs-z0-9]{8,15}/).required()
})

export const signinVal = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][A-Zs-z0-9]{8,15}/).required()
})
