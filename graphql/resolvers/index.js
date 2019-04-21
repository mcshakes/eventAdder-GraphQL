const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/bookings");

const events = async eventIds => {
	
	const events = await Event.find({ _id: { $in: eventIds }})

		try {
			events.map(event => {
				return { 
					...event._doc, 
					_id: event.id, 
					creator: user.bind(this, event.creator),
					date: new Date(event._doc.date).toISOString() 
				}
			})

		} catch (err) {
			throw err;
		}
}

const user = userId => {
	return User.findById(userId)
	.then(user => {
		return { ...user._doc, 
				_id: user.id, 
				createdEvents: events.bind(this, user._doc.createdEvents) 
			}; //fetching user by ID, so no need to .populate() upon Event query
	})
	.catch(err => {
		throw err;
	})
}

module.exports = {
			events: () => {
				return  Event
					.find()
					.then(events => {
						return events.map(event => {							
							return { 
								...event._doc, 
								creator: user.bind(this, event._doc.creator),
								date: new Date(event._doc.date).toISOString() 
							}
						})
					})
					.catch(err => {
						throw err;
					})
			},
			bookings: async () => {
				try {
					const bookings = await Booking.find();

					return bookings.map(booking => {
						return { 
							...booking._doc,
							createdAt: new Date(booking._doc.createdAt).toISOString() ,
							updatedAt: new Date(booking._doc.updatedAt).toISOString() 
						}
					})
				} catch (err) {
					throw err;
				}
			},
			createEvent: (args) => {

				const event = new Event({
					title: args.eventInput.title,
					description: args.eventInput.description,
					price: +args.eventInput.price,
					date: new Date(args.eventInput.date),
					creator: "5cb77a6a9c000525abb18145"
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
						return User.findById("5cb77a6a9c000525abb18145")
						
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


			},

			bookEvent: async args => {
				const fetchedEvent = await Event.findOne({ _id: args.eventId });

				const booking = new Booking({
					user: "5cb77a6a9c000525abb18145",
					event: fetchedEvent
				})

				const result = await booking.save();

				return { 
					...result._doc,
					createdAt: new Date(result._doc.createdAt).toISOString() ,
					updatedAt: new Date(result._doc.updatedAt).toISOString()  
				}
			}
		}