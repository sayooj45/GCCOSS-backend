import express from "express";

import {
  getPublications,
  createPublication,
  updatePublication,
  deletePublication,
} from "../controllers/publicationController.js";

import { authentication } from "../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// GET
router.get("/get", authentication, getPublications);

// POST
router.post(
  "/post",
  authentication,
  upload.fields([
    {
      name: "publicationImage",
      maxCount: 1,
    },
    {
      name: "pdf",
      maxCount: 1,
    },
  ]),
  createPublication
);

// PATCH
router.patch(
  "/patch/:id",
  authentication,
  upload.fields([
    {
      name: "publicationImage",
      maxCount: 1,
    },
    {
      name: "pdf",
      maxCount: 1,
    },
  ]),
  updatePublication
);

// DELETE
router.delete("/delete/:id", authentication, deletePublication);

// user
router.get("/getAll", getPublications);

export default router;
