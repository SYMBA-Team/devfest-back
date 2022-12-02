import mongoose, { HydratedDocument } from "mongoose";
const required = true;
export interface SettingsI {
    registrations: boolean;
}
const settingsSchema = new mongoose.Schema<SettingsI>(
    {
        registrations: {
            type: Boolean,
            default: false,
            required,
        },
    },
    { timestamps: true }
);

const Settings = mongoose.model("Setting", settingsSchema);
export type SettingsModelType = HydratedDocument<SettingsI>;
export default Settings;
