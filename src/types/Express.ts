import { Request, Response, NextFunction } from "express";
import { User, UserI } from "./User";

type MyRequest<T extends User | null> = Request & (T extends User ? { user?: null | UserI } : {});

export type Middleware<T extends User | null = null, U = null> = (
    req: MyRequest<T>,
    res: Response,
    next: NextFunction
) => null | Promise<void | null | undefined | MyError>;
