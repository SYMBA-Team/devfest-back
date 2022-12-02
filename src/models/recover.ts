import mongoose, { Model, Types } from "mongoose";
import { TimeStamp } from "types/basics";
import userModel from "./user";
const expiresAfter = 7200000;
interface Recover extends TimeStamp {
    user: Types.ObjectId;
    used: Date;
}
interface RecoverModel extends Model<Recover> {
    changePassword(id: string, password: string): Promise<any>;
}
const recoverSchema = new mongoose.Schema<Recover>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        used: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);
recoverSchema.statics.changePassword = async function (id, newPassword) {
    let recover = await this.findById(id);
    if (recover.createdAt.addHours(expiresAfter) < Date.now() || recover.used)
        throw new Error("This link has been expired");
    let user = await userModel.findById(recover.user);
    if (!user) throw new Error("Could not find user");
    user.password = newPassword;
    recover.used = Date.now();
    return await Promise.all([user.save(), recover.save()]);
};

export default mongoose.model<Recover, RecoverModel>("recoverUser", recoverSchema);
