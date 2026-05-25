import express from "express";
import {
  getSubmissions,
  createSubmission,
} from "../controllers/contactController.js";
import { authentication } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/submissions", authentication, getSubmissions);

router.post("/submit", createSubmission);

export default router;
