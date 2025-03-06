import * as Joi from "joi";
const createUser = {
    name: Joi.string().label("Name").required(),
    email: Joi.string().email().label("Email").required(),
    password: Joi.string().label("Passord").required(),
    phone: Joi.number().label("Phone").required(),
};

const loginUser = {
    email: Joi.string().label("Email").required(),
    password: Joi.string().label("Password").required(),
}

export default {
    createUser: Joi.object(createUser),
    loginUser: Joi.object(loginUser)
};