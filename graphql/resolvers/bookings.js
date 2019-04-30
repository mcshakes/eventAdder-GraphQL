const { dateToString } = require("../../helpers/date");
const Booking = require("../../models/bookings");
const Event = require("../../models/event");

const { user, singleEvent } = require("./merge");

module.exports = {
			
	bookings: async () => {
		try {
			const bookings = await Booking.find();

			return bookings.map(booking => {
				return { 
					...booking._doc,
					user: user.bind(this, booking._doc.user),
					event: singleEvent.bind(this, booking._doc.event),
					createdAt: dateToString(booking._doc.createdAt),
					updatedAt: dateToString(booking._doc.updatedAt) 
				}
			})
		} catch (err) {
			throw err;
		}
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
			user: user.bind(this, booking._doc.user),
			event: singleEvent.bind(this, booking._doc.event),
			createdAt: dateToString(result._doc.createdAt),
			updatedAt: dateToString(result._doc.updatedAt) 
		}
	},

	cancelBooking: async args => {
		
		try {
			const booking = await Booking.findById(args.bookingId).populate("event");
			const event = { 
				...booking.event._doc, 
				_id: booking.event.id, 
				creator: user.bind(this, booking.event._doc.creator)
			}
			// console.log(event);
			await Booking.deleteOne({ _id: args.bookingId });
			return event;

		} catch (err) {
			throw err;
		}
	}
}