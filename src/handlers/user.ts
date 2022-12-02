import { Middleware } from "types/Express";
import { User, UserI } from "types/User";
import userModel from "../models/user";

export const editProfile: Middleware<User> = async (req, res, next) => {
    try {
        const { currentPassword, password, email, gender, birthDate } = req.body;
        if (!req.user) throw new Error("There is no current user");
        if (currentPassword) {
            if (!req.user.comparePasswords(currentPassword)) throw new Error("Mot de passe incorrect");
            else req.user.password = password;
        } else {
            req.user.email = email;
        }
        await req.user.save();
        next();
    } catch (e) {
        next(e);
    }
};

export const createUser: Middleware = async (req, res, next) => {
    try {
        res.json(
            await userModel.create({
                ...req.body,
            })
        );
    } catch (e) {
        next(e);
    }
};

export const changePassword: Middleware<User> = async (req, res, next) => {
    const { password } = req.body;
    try {
        await (req.user as UserI).update({ password });
        next();
    } catch (e) {
        next(e);
    }
};

export const GetLoggedInUserInfos: Middleware<User> = async (req, res) => {
    res.status(200).json((req.user as UserI).Optimize());
};
export const getUsers: Middleware = async (req, res, next) => {
    try {
        res.json(await userModel.find());
    } catch (e) {
        next(e);
    }
};
