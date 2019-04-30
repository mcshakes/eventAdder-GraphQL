const { dateToString } = require("../../helpers/date");
const Event = require("../../models/event");
const { user } = require("./merge");
const User = require("../../models/user");

module.exports = {
			events: () => {
				return  Event
					.find()
					.then(events => {
						return events.map(event => {							
							return { 
								...event._doc, 
								creator: user.bind(this, event._doc.creator),
								date: dateToString(event._doc.date)
							}
						})
					})
					.catch(err => {
						throw err;
					})
			},
			createEvent: (args, req) => {

				if (!req.isAuth) {
					throw new Error("Unauthenticated!");
				}

				const event = new Event({
					title: args.eventInput.title,
					description: args.eventInput.description,
					price: +args.eventInput.price,
					date: new Date(args.eventInput.date),
					creator: req.userId
				});

				let createdEvent;

				return event
					.save()
					.then(result => {
						createdEvent = {
							...result._doc, 
							creator: user.bind(this, result._doc.creator),
							date: new Date(event._doc.date).toISOString() 
						};
						return User.findById(req.userId)
						
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
						console.log(err);
						throw err;
					});

			}
		}