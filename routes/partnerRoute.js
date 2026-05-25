import express from "express";

import {
  getPartners,
  createPartner,
  deletePartner,
  updatePartner,
} from "../controllers/partnerController.js";

import { authentication } from "../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/get", authentication, getPartners);

router.post("/post", authentication, upload.single("logo"), createPartner);

router.delete("/delete/:id", authentication, deletePartner);

router.patch(
  "/update/:id",
  authentication,
  upload.single("logo"),
  updatePartner
);

// user

router.get("/getAll", getPartners);

export default router;
