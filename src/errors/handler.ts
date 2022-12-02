import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { MongoError } from "mongodb";

const errorHandler = (err: MyError, req: Request, res: Response, next: NextFunction) => {
    const error =
        err.message && err.name
            ? {
                  name: err.name,
                  message: err.message,
              }
            : {
                  name: "unhandled_error",
                  message: "Encountered unhandled error please try again.",
              };
    res.status(err.status || 422).send(error);
};
export function getError(err: any) {
    if (err instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(err.errors).map((e) => e.message);
        return {
            message: "Could not create user due to some invalid fields!",
            error: messages,
        };
    } else if ((err as MongoError).code === 11000) {
        return {
            message: "A user with this unique ${key} already exists!",
        };
    }
    return {
        message: "Unknown Error",
    };
}
export default errorHandler;
