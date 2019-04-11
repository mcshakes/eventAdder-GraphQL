const express = require("express");
const bodyParser = require("body-parser");
const graphQLHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Event = require("./models/event");
const User = require("./models/user");

const app = express();


app.use(bodyParser.json());

app.use(
	"/graphql", 
	graphQLHTTP({
		schema: buildSchema(`
			type Event {
				_id: ID!
				title: String!
				description: String!
				price: Float!
				date: String!
			}

			type User {
				_id: ID!
				email: String!
				password: String 
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
				return  Event
					.find()
					.then(events => {
						return events.map(event => {
							return { ...event._doc };
						})
					})
					.catch(err => {
						throw err;
					})
			},
			createEvent: (args) => {

				const event = new Event({
					title: args.eventInput.title,
					description: args.eventInput.description,
					price: +args.eventInput.price,
					date: new Date(args.eventInput.date),
					creator: "5cafbd23fe0264ff3064f0ca"
				});

				
				return event
					.save()
					.then(result => {
						return User.findById("5cafbd23fe0264ff3064f0ca")
						console.log(result);
						return {...result._doc};
					})
					.then(user => {
						if (user) {
							throw new Error("User exists already.")
						}

						user.createEvents.push(event);
					})
					.catch(err => {
						console.log(err);
						throw err;
					});

			},

			createUser: args => {
				
				return User.findOne({ email: args.userInput.email })
					.then(user => {
						// user is undefined or an object, hence exists

						if (user) {
							throw new Error("User exists already.")
						}

						return bcrypt.hash(args.userInput.password, 12)
					})
					.then(hashedPassword => {
						const user = new User({
							email: args.userInput.email,
							password: hashedPassword
						})

						return user.save();
					})
					.then(result => {
						// override to return null for the password. 

						return { ...result._doc, password: null }
					})
					.catch(err => {
						throw err;
					})


			}
		},
		graphiql: true
	})
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-l4uk8.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true })
	.then(() => {
		app.listen(3000); 		
	})
	.catch(err => {
		console.log(err);  
	})

// app.listen(3000); 

