import React from "react";
import EventItem from "./EventItem";


const eventList = props => {

	const events = props.events.map(event => {
		return <EventItem key={event._id} title={event.title} />
	})

	return <ul className="events__list"> { events } </ul>
};

export default eventList;