import express from "express";
import { getSubmissions } from "../controllers/contactController.js";
import { authentication } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/submissions", authentication, getSubmissions);

export default router;
