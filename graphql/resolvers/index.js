const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds} })

    return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event.creator) // using functions allows person to drill deeper and look at nested object
        };
      });
  } catch (err) {
    throw err;
  }
}

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return {
      ...event._doc,
      _id: event.id,
      creator: user.bind(this, event.creator)
    }
  } catch (err) {
    throw err;
  }
}

const user = async userId => {
  try {
    const user = await User.findById(userId)
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  events: async () => {
    try {
      const events = await Event.find()

      return events.map(event => {
        return {
          ...event._doc,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator) // pointing to constant above, holding the arrow function
        };
      })
    } catch (err) {
      throw err;
    }
  },

  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return {
          ...booking._doc,
          _id: booking.id,
          user: user.bind(this, booking._doc.user),
          event: singleEvent.bind(this, booking._doc.event),
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          createdAt: new Date(booking._doc.updatedAt).toISOString()
        }
      })
    } catch (err) {
      throw err;
    }
  },

  createEvent: async args => {

    const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.title,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: "5c69f7de23f2b543da6316c8"
    });

    let createdEvent;

    try {
      const result = await event
      .save()
        createdEvent = {
          ...result._doc,
          creator: user.bind(this, result._doc.creator),
          date: new Date(event._doc.date).toISOString(),
        };

        const creator = await User.findById("5c69f7de23f2b543da6316c8")

      if (!creator) {
        throw new Error("User not found.")
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;

    } catch (err) {
      throw err;
    }
  },                  // end of createEvent

  createUser: args => {
    return User.findOne({email: args.userInput.email})
        .then(user => {
          if (user) {
            throw new Error("User exists already.")
          }
          return bcrypt.hash(args.userInput.password, 12)
        })
        .then(hashPassword => {
          const user = new User({
            email: args.userInput.email,
            password: hashPassword
          })

          return user.save();
        })
        .then(createdUser => {
          return { ...createdUser._doc, password: null}
        })
        .catch(err => {
          throw err;
        })
  },

  bookEvent: async args => {
    const fetchedEvent = await Event.findOne({_id: args.eventId});
    console.log("EVENT", fetchedEvent)
    const booking = new Booking({
      user: "5c69f7de23f2b543da6316c8",
      event: fetchedEvent
    });

    const result = await booking.save();
    console.log(result)
    return {
      ...result,
      _id: result.id,
      user: user.bind(this, booking._doc.user),
      event: singleEvent.bind(this, booking._doc.event),
      createdAt: new Date(booking._doc.createdAt).toISOString(),
      createdAt: new Date(booking._doc.updatedAt).toISOString()
    }
  },

  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event =  {
        ...booking.event,
        _id: booking.event.id,
        creator: user.bind(this, booking.creator)
      }
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err
    }
  }
};
