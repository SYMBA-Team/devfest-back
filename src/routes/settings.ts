import { Router } from "express";
import Settings from "../handlers/settings";
import Visits from "../models/visits";
import { checkLogs, isAdmin, loggedIn } from "../middlewares/auth";

const router = Router();

router.route("/").get((req, res) => {
    Visits.addVisit();
    res.json(Settings.configO);
});
router.all("*", checkLogs, isAdmin);
router.route("/registrations").post(Settings.editRegistrations);

export default router;
