import Partner from "../models/Partner.js";

// GET ALL PARTNERS
export const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });

    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE PARTNER
export const createPartner = async (req, res) => {
  try {
    const { title, description } = req.body;

    const partner = await Partner.create({
      logo: req.file.location,
      title,
      description,
    });

    res.status(201).json({
      message: "Partner created successfully",
      partner,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PARTNER
export const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);

    if (!partner) {
      return res.status(404).json({
        message: "Partner not found",
      });
    }

    res.status(200).json({
      message: "Partner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PARTNER
export const updatePartner = async (req, res) => {
  try {
    const { title, description } = req.body;

    const partner = await Partner.findById(req.params.id);

    if (!partner) {
      return res.status(404).json({
        message: "Partner not found",
      });
    }

    // update fields
    partner.title = title || partner.title;
    partner.description = description || partner.description;

    // if new image uploaded
    if (req.file) {
      partner.logo = req.file.location;
    }

    await partner.save();

    res.status(200).json({
      message: "Partner updated successfully",
      partner,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
