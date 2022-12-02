import "dotenv/config";
import app from "./app";
if (!process.env.BACK_SECRET) {
    console.log("There is no BACK_SECRET");
    process.exit(-1);
}
if (!process.env.BACK_MONGODB_URI) {
    console.log("There is no BACK_MONGODB_URI");
    process.exit(-1);
}
if (!process.env.BACK_MONGODB_NAME) {
    console.log("There is no BACK_MONGODB_NAME");
    process.exit(-1);
}
app();
