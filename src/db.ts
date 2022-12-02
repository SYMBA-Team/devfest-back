import mongoose from "mongoose";
// mongoose.set("debug", true);
if (!process.env.BACK_MONGODB_URI) throw new Error("DB URI is not defined");
export default mongoose.connect(process.env.BACK_MONGODB_URI, { dbName: process.env.BACK_MONGODB_NAME });
