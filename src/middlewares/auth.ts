import { Verify } from "../functions/jwt";
import userModel from "../models/user";
import { Middleware } from "../types/Express";
import { User } from "../types/User";

const loggedIn: Middleware<User> = async (req, res, next) => {
    if (req.user) return next();
    next({ name: "Cannot login", message: "Not signed in" });
};

const checkLogs: Middleware<User> = async (req, res, next) => {
    const { token } = req.cookies;
    req.user = undefined;
    if (token) {
        try {
            req.user = await userModel.findOne({ _id: Verify(token) }).select("-password");
        } catch (e) {
            res.cookie("token", "", {
                sameSite: "none",
                secure: true,
                httpOnly: true,
                expires: new Date(1),
            });
            return next(e);
        }
    }
    next();
};

const isAdmin: Middleware<User> = async (req, res, next) => {
    if (req.user && req.user.admin) next();
    else
        next({
            name: "Not allowed",
            message: "You can't access with this account",
        });
};

const isSameUser: Middleware<User> = async (req, res, next) => {
    // @ts-ignore
    if (req.user && req.user._id.equal(req.params.id)) return next();
    next({
        name: "Not allowed",
        message: "You aren't allowed to do this action",
    });
};

export { loggedIn, isSameUser, checkLogs, isAdmin };
