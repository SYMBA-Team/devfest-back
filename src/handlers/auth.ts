import RecoverUser from "../models/recover";
import logger from "../models/logger";
import userModel from "../models/user";
import { Middleware } from "../types/Express";
import { User } from "../types/User";
import { Sign } from "../functions/jwt";
import { getError } from "../errors/handler";
import { getCookiesSettings } from "../functions";
//import { NewsLetter } from "../models/message";
// import { UserState } from "../models/status";
//import { SendEmail } from "./email";
//import { Email } from "./emailHandler";

export const Signup: Middleware<User> = async (req, res, next) => {
    try {
        const { role, stay, ...user } = req.body;

        req.user = await userModel.create({
            ...user,
        });
        if (req.user) {
            res.cookie("token", Sign({ id: req.user._id.toString() }), {
                sameSite: "none",
                secure: true,
                httpOnly: true,
            });
            /* SendEmail(
				req.user.email,
				"Registered in the platform",
				Email(
					"Demande d'inscription prise en considération",
					"votre demande d'inscription a bien était prise en charge, une réponse vous sera communiquez dans les plus bref délais."
				)
			)
				.then(console.log)
				.catch((e) => console.error(e)); */
            next();
        } else
            res.status(400).json({
                name: "Couldn't register",
                message: "Sorry, We couldn't create an account",
            });
    } catch (err) {
        logger.error("Couldn't register", err as Error);
        const error = getError(err);

        res.status(400).json({
            ...error,
        });
    }
};
export const Logout: Middleware = async (req, res) => {
    res.cookie("token", "", {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        expires: new Date(1),
    });
    res.send({ message: "Déconnecté" });
};
export const SignIn: Middleware<User> = async (req, res, next) => {
    try {
        const { phone, password, stay } = req.body;
        req.user = await userModel.findOne({ phone });

        if (req.user) {
            const isPasswordMatch = await req.user.comparePasswords(password);
            if (isPasswordMatch) {
                res.cookie("token", Sign({ id: req.user._id.toString() }), getCookiesSettings(stay));
                next();
            } else
                next({
                    name: "Impossible de se connecter",
                    message: "Mot de passe incorrect",
                });
        } else res.status(400).json({ message: "Utilisateur non trouvé!" });
    } catch (err) {
        logger.error("Impossible de se connecter", err as Error);
        next({
            name: "Impossible de se connecter",
            message: (err as Error).message,
        });
    }
};
export const Check: (elm: "phone" | "email") => Middleware<User> = (elm) => async (req, res, next) => {
    try {
        const check = { [elm]: req.body[elm] };
        if (await userModel.findOne(check))
            return next({
                name: "Vérification de " + elm,
                message: `Il y a une personne qui a cette ${elm}`,
            });
        else
            res.json({
                name: "Vérification de " + elm,
                message: `Il y a une personne qui a cette  ${elm}`,
            });
    } catch (err) {
        next(err);
    }
};
export const Recover: Middleware<User> = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) throw new Error("Can't find this email.");
        const r = await RecoverUser.create({ user: user._id });
        /* await SendEmail(
			user.email,
			"Password recovery " + process.env.APP_Name,
			Email("", "", { href: "" + r._id, label: "Reset password" })
		); */
        res.send({ message: "Recovery link has been sent!" });
    } catch (e) {
        res.status(400).json({
            name: "Recovery link hasn't been sent!",
            message: (e as Error).message,
        });
    }
};
export const Reset: Middleware<User> = async (req, res) => {
    try {
        await RecoverUser.changePassword(req.params.id, req.body.password);
        res.send({
            name: "Resetting Password",
            message: "Password has been changed",
        });
    } catch (err) {
        res.status(400).json({
            name: "Resetting Password",
            message: (err as Error).message,
        });
    }
};
