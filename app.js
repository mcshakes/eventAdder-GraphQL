const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Event = require("./models/event");
const User = require("./models/user");

const app = express();

app.use(bodyParser.json());

const user = userId => {
  return User.findById(userId)
          .then(user => {
            return { ...user._doc, _id: user.id}
          })
          .catch(err => {
            throw err;
          })
}

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
      creator: User!
    }

    type User {
      _id: ID!
      email: String!
      password: String
      createdEvents: [Event!]
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
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
          createdEvent = {...result._doc};
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
  },
  graphiql: true
}));

mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@ds119085.mlab.com:19085/graphql-events`, { useNewUrlParser: true }
).then(() => {
  app.listen(3000);
})
.catch(err => {
  console.log(err)
});
