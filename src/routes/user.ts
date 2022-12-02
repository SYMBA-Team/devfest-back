import { Router } from "express";
import { isAdmin } from "../middlewares/auth";
import { editProfile, getUsers, GetLoggedInUserInfos, changePassword, createUser } from "../handlers/user";

const router = Router();

router.route("/").put(editProfile, GetLoggedInUserInfos).all(isAdmin).get(getUsers).post(createUser);
router.route("/password").put(changePassword, GetLoggedInUserInfos);

export default router;
