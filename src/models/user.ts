import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validateEmail } from "../functions";
import { SignUpValues } from "../types/User";

const options = { discriminatorKey: "kind" };

const userSchema = new mongoose.Schema<SignUpValues>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, "Please fill a valid email address"],
        },
        password: {
            type: String,
            required: true,
        },
        //role: { type: String, default: "C", enum: ["A", "C", "B", "D", "E", "F", "G", "S"] }, // A: Admin  // B: Bloom // C: customers // D: Deliverers // E: not valid // F: black listed

        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, ...options }
);

userSchema.pre("save", async function (next) {
    try {
        if (this.isNew || this.isModified("password")) this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err as Error);
    }
});

userSchema.methods.Optimize = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
userSchema.methods.comparePasswords = async function (candidatePassword: string) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        return false;
    }
};

const userModel = mongoose.model<SignUpValues>("User", userSchema);
export default userModel;
