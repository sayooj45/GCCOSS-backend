import Event from "../models/Event.js";

// GET EVENTS
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({
      createdAt: -1,
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const { date, place, title, shortDescription, longDescription } = req.body;

    const event = await Event.create({
      image: req.file.location,
      date,
      place,
      title,
      shortDescription,
      longDescription,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const { date, place, title, shortDescription, longDescription } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    event.date = date || event.date;
    event.place = place || event.place;
    event.title = title || event.title;
    event.shortDescription = shortDescription || event.shortDescription;
    event.longDescription = longDescription || event.longDescription;

    if (req.file) {
      event.image = req.file.location;
    }

    await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
