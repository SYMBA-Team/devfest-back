import mongoose from "mongoose";
import { startOfDay } from "date-fns";
import logger from "./logger";
import { TimeStamp } from "types/basics";
interface Visit extends TimeStamp {
    count: number;
    date: Date;
}
interface VisitModel extends Visit {
    addVisit(): Promise<null | void>;
}
const visitsSchema = new mongoose.Schema<Visit>(
    {
        count: {
            type: Number,
            default: 1,
        },
        date: {
            type: Date,
            default: () => startOfDay(new Date()),
            unique: true,
        },
    },
    { timestamps: true }
);
visitsSchema.statics.addVisit = async function () {
    try {
        await this.findOneAndUpdate(
            { date: startOfDay(new Date()) },
            { $inc: { count: 1 } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    } catch (e) {
        if (e instanceof Error) logger.error("Error while adding a visitor", e);
        else console.error(e);
    }
};

export default mongoose.model<Visit, VisitModel>("Visits", visitsSchema);
