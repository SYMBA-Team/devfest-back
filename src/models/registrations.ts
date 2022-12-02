import mongoose from "mongoose";
import { validateEmail } from "../functions";
const RequiredString = { type: String, required: true };
const registrationSchema = new mongoose.Schema<Registration>(
    {
        personalInfo: {
            email: {
                ...RequiredString,
                unique: true,
                validate: [validateEmail, "Please fill a valid email address"],
            },
            firstName: RequiredString,
            lastName: RequiredString,
            phone: RequiredString,
        },
        academicInfo: { university: RequiredString, major: RequiredString },
        refrence: { knewFrom: { facebook: Boolean, instagram: false, discord: false, friend: false, other: false } },
        professional: {
            portfolio: String,
            linkedIn: String,
            github: String,
            skills: [String],
            otherOrganizations: String,
        },
        motivations: {
            whatKnow: String,
            expectations: String,
            motivation: RequiredString,
            explained: RequiredString,
            trainings: Boolean,
            events: Boolean,
            experience: Boolean,
        },
    },
    { timestamps: true }
);

const registrationModel = mongoose.model<Registration>("Registration", registrationSchema);
export default registrationModel;
