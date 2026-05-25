import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    place: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    longDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
