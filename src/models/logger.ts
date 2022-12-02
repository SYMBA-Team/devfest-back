import { Schema, model, Model } from "mongoose";
export interface LoggerModel extends Model<Logger> {
    log(title: string, data: any): Promise<any>;
    error(title: string, data: Error): Promise<any>;
}
const loggerSchema = new Schema<Logger>(
    {
        type: { type: String, required: true, enum: ["log", "error"] },
        title: { type: String, required: true },
        data: { type: Object, required: true },
    },
    { timestamps: true }
);
loggerSchema.statics.log = async function (title, data) {
    return this.create({ title, data, type: "log" }).catch(console.error);
};
loggerSchema.statics.error = async function (title, data) {
    return this.create({ title, data, type: "error" }).catch(console.error);
};
const logerModel = model<Logger, LoggerModel>("logger", loggerSchema);
export default logerModel;
