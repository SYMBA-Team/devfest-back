import { HydratedDocument } from "mongoose";
import { TimeStamp } from "./basics";
interface UserBase {
    email: string;
    firstName: string;
    lastName: string;
    admin: boolean;
}
export interface Auth {
    password: string;
}
type OptimizedUser = UserBase & TimeStamp;
export interface User extends OptimizedUser {
    password?: string;
    comparePasswords(candidatePassword: string): Promise<boolean>;
    Optimize(): OptimizedUser;
    //role: string;
}
export type UserI = HydratedDocument<User>;

export type SignUpValues = Auth & User;
