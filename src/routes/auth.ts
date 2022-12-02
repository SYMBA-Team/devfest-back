import { Router } from "express";
import { SignIn, Signup, Logout, Check, Recover, Reset } from "../handlers/auth";
import { GetLoggedInUserInfos } from "../handlers/user";

const router = Router();
router.post("/signup", Signup, GetLoggedInUserInfos);
router.post("/email", Check("email"));
router.post("/phone", Check("phone"));

router.post("/signin", SignIn, GetLoggedInUserInfos);
router.post("/logout", Logout);
router.post("/recover", Recover);
router.post("/recover/:id", Reset);

export default router;
