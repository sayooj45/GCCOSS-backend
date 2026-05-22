import express from "express";

import { createAdmin, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/create-admin", createAdmin);

router.post("/login", loginUser);

export default router;
