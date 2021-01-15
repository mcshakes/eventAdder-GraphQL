import React, { useEffect, useState } from "react";
import EventItem from "./EventItem";
import "./EventList.css";

function EventList(props) {
	// console.log(props.events.events)

	const allEvents = props.events.events.map(event => {
		return <EventItem 
					key={event._id} 
					title={event.title} 
					eventId={event._id} 
					// userId={props.authUserId} 
					// creatorId={event.creator._id}
					date={event.date}
					price={event.price}
					// onDetail={props.onViewDetail}
					/>
	})

    return (
		<div>
			<ul className="events__list"> 
				{ allEvents } 
			</ul>
		</div>
        
    )

}

export default EventList;