import * as Joi from "joi";
const createUser = {
    name: Joi.string().label("Name").required(),
    email: Joi.string().label("Email").required(),
    phone: Joi.number().label("phone").required(),
};

export default {
    createUser: Joi.object(createUser),
};