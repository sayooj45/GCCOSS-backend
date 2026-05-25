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

// CREATE SUBMISSION
export const createSubmission = async (req, res) => {
  try {
    const { name, mobile, email, message } = req.body;

    const submission = await ContactSubmission.create({
      name,
      mobile,
      email,
      message,
    });

    res.status(201).json({
      message: "Submission sent successfully",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
