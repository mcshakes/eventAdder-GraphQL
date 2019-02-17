const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");

const events = eventIds => {
  return Event.find({ _id: { $in: eventIds} })
    .then(events => {
      return {
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event.creator)} // using functions allows person to drill deeper and look at nested object
    })
    .catch(err => {
      throw err
    })
}

const user = userId => {
  return User.findById(userId)
          .then(user => {
            return {
              ...user._doc,
              _id: user.id,
              createdEvents: events.bind(this, user._doc.createdEvents)}
          })
          .catch(err => {
            throw err;
          })
}

module.exports = {
  events: () => {
    return Event.find()
    .then(events => {
      return events.map(event => {
        return {
          ...event._doc,
          creator: user.bind(this, event._doc.creator) // pointing to constant above, holding the arrow function
        };
      })
    })
    .catch(err => {
      throw err;
    })
  },
  createEvent: (args) => {

    const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.title,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: "5c661d0cb12f437e3b9af1be"
    });

    let createdEvent;

    return event
      .save()
      .then(result => {
        createdEvent = {...result._doc, creator: user.bind(this, result._doc.creator)};
        return User.findById("5c661d0cb12f437e3b9af1be")
      })
      .then(user => {
        if (!user) {
          throw new Error("User not found.")
        }
        user.createdEvents.push(event);
        return user.save();
      })
      .then(result => {
        return createdEvent;
      })
      .catch(err => {
        console.log(err)
        throw err;
      });
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
  }
}
