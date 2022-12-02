import { Schema } from "mongoose";

export interface TimeStamp {
    _id: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
