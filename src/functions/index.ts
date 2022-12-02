import { CookieOptions } from "express";

export function validateEmail(email: string) {
    if (email) return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    return true;
}
export function validatePhone(phone: string) {
    return /^0[567]\d{8}$/.test(phone);
}
export function getCookiesSettings(stay: boolean = false): CookieOptions {
    return {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        ...(stay ? { expires: new Date(new Date().getTime() + 720000000) } : {}),
    };
}
