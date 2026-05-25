import express from "express";

import {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/eventController.js";

import { authentication } from "../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// GET EVENTS
router.get("/get", authentication, getEvents);

// CREATE EVENT
router.post("/post", authentication, upload.single("image"), createEvent);

// UPDATE EVENT
router.patch(
  "/update/:id",
  authentication,
  upload.single("image"),
  updateEvent
);

// DELETE EVENT
router.delete("/delete/:id", authentication, deleteEvent);

// GETALL EVENTS
router.get("/getall", getEvents);

export default router;
