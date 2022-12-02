import { Middleware } from "types/Express";
import SettingsM, { SettingsI, SettingsModelType } from "../models/settings";

export default class Settings {
    static config: SettingsModelType | null = null;
    static configO: SettingsModelType | null = null;
    static async loadSettings() {
        Settings.config = await SettingsM.findOne().sort("-createdAt");
        if (!Settings.config) await Settings.updateSettings();
        else await Settings.toObject();
    }
    static async toObject() {
        Settings.configO = Settings.config ? Settings.config.toObject() : null;
    }
    static async updateSettings() {
        try {
            var oldSetting = Settings.config ? Settings.config : await SettingsM.findOne();
            oldSetting = oldSetting ? oldSetting.toObject() : null;
            Settings.config = await SettingsM.create({ registrations: oldSetting ? oldSetting.registrations : false });
            await Settings.toObject();
        } catch (e) {
            console.error(e);
            return null;
        }
    }
    static editRegistrations: Middleware = async (req, res, next) => {
        try {
            Settings.configO = Settings.config = await SettingsM.findByIdAndUpdate(
                (Settings.configO as SettingsModelType)._id,
                {
                    registrations: req.body.registrations,
                },
                { new: true }
            );
            //await Settings.toObject();
            res.json(Settings.configO);
        } catch (e) {
            next(e);
        }
    };
}
