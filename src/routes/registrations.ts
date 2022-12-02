import { Router } from "express";
import { SignIn, Signup, Logout, Check, Recover, Reset } from "../handlers/auth";
import { RegisterMember, CheckEmail } from "../handlers/registrations";

const router = Router();
router.post("/", RegisterMember);
router.post("/email", CheckEmail);

export default router;
