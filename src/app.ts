import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./db";

import { loggedIn, checkLogs, isAdmin } from "./middlewares/auth";
import { GetLoggedInUserInfos } from "./handlers/user";
import Settings from "./handlers/settings";

import filesRoutes from "./routes/files";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import registrationsRoutes from "./routes/registrations";
import staticsRoutes from "./routes/statics";
import settingsRoutes from "./routes/settings";
import messagesRoutes from "./routes/message";
import errorHandler from "./errors/handler";

export const app = express();
const port = process.env.PORT || 3001;

if (process.env.STATIC) app.use("/static", express.static(process.env.STATIC));
// cors
if (!process.env.ORIGIN && process.env.NODE_ENV !== "development") throw new Error("There is no Origin defined");
const origins = process.env.ORIGIN;
app.use(
    cors({
        origin: (origin, callback) => {
            const origin_accepted = origin && origin.match((origins ?? origin) + "$");

            if (origin_accepted) {
                callback(null, origin);
            } else {
                callback(new Error("Request's origin not accepted."));
            }
        },
        credentials: true,
    })
);

app.use(cookieParser());

if (process.env.STATIC) app.use("/files", filesRoutes);

app.use(express.json());
app.route("/").get(checkLogs, loggedIn, GetLoggedInUserInfos);

app.use("/", authRoutes);

app.use(express.urlencoded({ extended: false }));

app.use("/messages", messagesRoutes);

app.use("/register", registrationsRoutes);

app.use("/users", checkLogs, loggedIn, userRoutes);
app.use("/statistics", checkLogs, loggedIn, staticsRoutes);
app.use("/settings", settingsRoutes);

// error middleware
app.use(errorHandler);

app.use("*", (req, res, next) => {
    res.status(404).json({
        name: "resource_not_found",
        message: "Resource not found.",
    });
});

// Mongodb connection

export default function App() {
    db.then(async () => {
        console.log(process.env.BACK_MONGODB_NAME + " DB is Connected ");
        await Settings.loadSettings();
        app.listen(port, () => console.log(`Server running on port: ${port}`));
    });
}
