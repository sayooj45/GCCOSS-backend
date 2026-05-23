import ContactSubmission from "../models/ContactSubmission.js";

export const getSubmissions = async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({
      createdAt: -1,
    });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
