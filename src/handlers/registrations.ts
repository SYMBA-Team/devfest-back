import registrationModel from "../models/registrations";
import { Middleware } from "../types/Express";

export const CheckEmail: Middleware = async (req, res, next) => {
    try {
        const email = req.body.email;

        if (await registrationModel.findOne({ "personalInfo.email": email }))
            return next({
                name: "There is someone with this email already registered",
                message: `There is someone with this email : ${email}`,
            });
        else
            res.json({
                name: "No one registered with this email already ",
                message: `There is no one with this email : ${email}`,
            });
    } catch (err) {
        next(err);
    }
};
export const RegisterMember: Middleware = async (req, res, next) => {
    try {
        await registrationModel.create(req.body);
        res.json({
            name: "Successfull registeration ",
            message: `You have been registered successfully`,
        });
    } catch (err) {
        next(err);
    }
};
