import Publication from "../models/Publication.js";

// GET ALL PUBLICATIONS
export const getPublications = async (req, res) => {
  try {
    const publications = await Publication.find().sort({
      createdAt: -1,
    });

    res.status(200).json(publications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE PUBLICATION
export const createPublication = async (req, res) => {
  try {
    const { title, description } = req.body;

    const publication = await Publication.create({
      image: req.files.publicationImage[0].location,
      pdf: req.files.pdf[0].location,
      title,
      description,
    });

    res.status(201).json({
      message: "Publication created successfully",
      publication,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PUBLICATION
export const updatePublication = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updateData = {
      title,
      description,
    };

    if (req.files?.publicationImage) {
      updateData.image = req.files.image[0].location;
    }

    if (req.files?.pdf) {
      updateData.pdf = req.files.pdf[0].location;
    }

    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!publication) {
      return res.status(404).json({
        message: "Publication not found",
      });
    }

    res.status(200).json({
      message: "Publication updated successfully",
      publication,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PUBLICATION
export const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);

    if (!publication) {
      return res.status(404).json({
        message: "Publication not found",
      });
    }

    res.status(200).json({
      message: "Publication deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
