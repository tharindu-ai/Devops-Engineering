const Event = require('../models/Event');
const User = require('../models/User');

// Get all events with filters
exports.getAllEvents = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(query)
      .populate('organizer', 'name email')
      .sort({ createdAt: -1 });

    res.json({ events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate('organizer', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ event });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new event (requires authentication)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, date, time, location, capacity, image, price } = req.body;

    // Validation
    if (!title || !description || !category || !date || !time || !location || !capacity) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const event = new Event({
      title,
      description,
      category,
      date: new Date(date),
      time,
      location,
      image: image || 'https://via.placeholder.com/500x300',
      capacity,
      organizer: req.userId,
      status: 'published'
    });

    await event.save();
    await event.populate('organizer', 'name email');

    res.status(201).json({
      message: 'Event created successfully',
      event
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update event (requires authentication)
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, date, time, location, capacity, image, status } = req.body;

    let event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    // Update fields
    if (title) event.title = title;
    if (description) event.description = description;
    if (category) event.category = category;
    if (date) event.date = new Date(date);
    if (time) event.time = time;
    if (location) event.location = location;
    if (capacity) event.capacity = capacity;
    if (image) event.image = image;
    if (status) event.status = status;

    await event.save();
    await event.populate('organizer', 'name email');

    res.json({
      message: 'Event updated successfully',
      event
    });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete event (requires authentication)
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await Event.findByIdAndDelete(id);

    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};
