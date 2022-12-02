import { validateEmail } from "../functions";
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, "Veuillez indiquer une adresse électronique valide"],
        },

        message: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export const NewsLetter = mongoose.model(
    "NewsLetter",
    new mongoose.Schema(
        {
            email: {
                type: String,
                unique: true,
                required: true,
                validate: [validateEmail, "Veuillez indiquer une adresse électronique valide"],
            },
        },
        { timestamps: true }
    )
);

export default Message;
