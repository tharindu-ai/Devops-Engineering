const Registration = require('../models/Registration');
const Event = require('../models/Event');

// Register for an event
exports.registerEvent = async (req, res) => {
  try {
    const { eventId, name, email, phone } = req.body;
    const userId = req.userId;

    // Validation
    if (!eventId || !name || !email || !phone) {
      return res.status(400).json({ message: 'All fields required' });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user already registered
    const existingRegistration = await Registration.findOne({
      user: userId,
      event: eventId
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    // Check capacity
    if (event.registrations >= event.capacity) {
      return res.status(400).json({ message: 'Event is at full capacity' });
    }

    // Create registration
    const registration = new Registration({
      user: userId,
      event: eventId,
      name,
      email,
      phone
    });

    await registration.save();

    // Increment event registrations count
    event.registrations += 1;
    await event.save();

    await registration.populate('event', 'title');

    res.status(201).json({
      message: 'Successfully registered for event',
      registration
    });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's registrations
exports.getUserRegistrations = async (req, res) => {
  try {
    const userId = req.userId;

    const registrations = await Registration.find({ user: userId })
      .populate('event')
      .sort({ registrationDate: -1 });

    res.json({ registrations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Unregister from event
exports.unregisterEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const registration = await Registration.findById(id).populate('event');

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Check if user owns this registration
    if (registration.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Delete registration
    await Registration.findByIdAndDelete(id);

    // Decrement event registrations count
    const event = await Event.findById(registration.event._id);
    if (event && event.registrations > 0) {
      event.registrations -= 1;
      await event.save();
    }

    res.json({ message: 'Successfully unregistered from event' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Get event registrations (for event organizer)
exports.getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.userId;

    // Check if user is the event organizer
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.organizer.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const registrations = await Registration.find({ event: eventId })
      .populate('user', 'name email')
      .sort({ registrationDate: -1 });

    res.json({ registrations });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};
