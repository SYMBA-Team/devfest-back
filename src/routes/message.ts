import { Router } from "express";
import {
    createMessage,
    deleteMessage,
    getMessage,
    readMessage,
    getmessages,
    addNewsLetter,
    getNewsLetters,
} from "../handlers/message";
import { isAdmin, checkLogs } from "../middlewares/auth";

const router = Router();
router.route("/").post(checkLogs, createMessage).all(checkLogs, isAdmin).get(getmessages);
router.route("/news").post(addNewsLetter).get(checkLogs, isAdmin, getNewsLetters);

router.route("/:id").all(checkLogs, isAdmin).get(getMessage).put(readMessage).delete(deleteMessage);

export default router;
