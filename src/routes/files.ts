import { loggedIn, checkLogs, isAdmin } from "../middlewares/auth";
import upload from "../middlewares/upload";
import { Router } from "express";
import fs from "fs/promises";
import path from "path";
const router = Router();
router.all("*", checkLogs, loggedIn /* ,hasRole(["S", "A"]) */);
router.post("/", upload.single("file"), (req, res, next) => {
    if (!req.file) return next(new Error("No file received"));
    else return res.json({ ...req.file, name: "Uploading File", message: "File has been uploaded" });
});
router.delete("/:name", (req, res, next) => {
    const { name } = req.params;
    fs.unlink("uploads/" + name)
        .then(() => {
            res.json({
                name: "Deleting File",
                message: "File has been deleted",
            });
        })
        .catch((e) => {
            next({ name: "Deleting File", message: e.message });
        });
});
export default router;
