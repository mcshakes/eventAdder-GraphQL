const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");


const events = async eventIds => {

const events = await Event.find({ _id: { $in: eventIds }})

	try {
		events.map(event => {
			return { 
				...event._doc, 
				_id: event.id, 
				creator: user.bind(this, event.creator),
				date: dateToString(event._doc.date)
			}
		})

	} catch (err) {
		throw err;
	}
}

const singleEvent = async eventId => {
	try {
		const event = await Event.findById(eventId);

		return { ...event._doc, creator: user.bind(this, event.creator)}
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

exports.user = user;
// exports.events = events;
exports.singleEvent = singleEvent;