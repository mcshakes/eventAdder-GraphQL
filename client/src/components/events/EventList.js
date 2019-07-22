import React from "react";
import EventItem from "./EventItem";
import "./EventList.css";
 
const eventList = props => {

	const events = props.events.map(event => {
		return <EventItem 
					key={event._id} 
					title={event.title} 
					eventId={event._id} 
					userId={props.authUserId} 
					creatorId={event.creator._id}
					date={event.date}
					price={event.price}
					onDetail={props.onViewDetail}
					/>
	})

	return <ul className="events__list"> { events } </ul>
};

export default eventList;