import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export function validate(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        const messages: string[] = [];
        if (error) {
            error.details.forEach((em) => messages.push(em.message));
            return res.status(400).json({
                message: 'Validation failed',
                details: messages.join(' and '),
            });
        }
        next();
    };
}