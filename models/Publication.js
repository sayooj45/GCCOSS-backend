import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    pdf: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Publication = mongoose.model("Publication", publicationSchema);

export default Publication;
