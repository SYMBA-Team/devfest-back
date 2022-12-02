import { Middleware } from "types/Express";
import { User } from "types/User";
import Message, { NewsLetter } from "../models/message";

export const createMessage: Middleware<User> = async (req, res, next) => {
    try {
        const { email, message, name } = req.body;

        res.json(
            await Message.create({
                email: req.user ? req.user.email : email,
                message,
                name,
            })
        );
    } catch (e) {
        next(e);
    }
};
export const addNewsLetter: Middleware = async (req, res, next) => {
    try {
        const { email } = req.body;

        res.json(
            await NewsLetter.create({
                email: email,
            })
        );
    } catch (e) {
        next(e);
    }
};
export const getNewsLetters: Middleware = async (req, res, next) => {
    try {
        res.json(await NewsLetter.find());
    } catch (e) {
        next(e);
    }
};
export const deleteMessage: Middleware<User> = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndDelete(id);
        res.json({ name: "Delete message", message: "message has been deleted" });
    } catch (e) {
        next(e);
    }
};

export const getMessage: Middleware = async (req, res, next) => {
    try {
        const { id } = req.params;
        res.json(await Message.findById(id));
    } catch (e) {
        next(e);
    }
};
export const readMessage: Middleware = async (req, res, next) => {
    try {
        const { id } = req.params;
        res.json(await Message.findByIdAndUpdate(id, { $set: { read: true } }, { new: true }));
    } catch (e) {
        next(e);
    }
};
export const getmessages: Middleware = async (req, res, next) => {
    try {
        res.json(
            await Message.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "email",
                        foreignField: "email",
                        pipeline: [{ $project: { name: 1 } }],
                        as: "user",
                    },
                },
                {
                    $sort: {
                        createdAt: 1,
                    },
                },
            ])
        );
    } catch (e) {
        console.error(e);
        next(e);
    }
};
