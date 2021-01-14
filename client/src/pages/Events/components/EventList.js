import React, { useEffect, useState } from "react";
import EventItem from "./EventItem";
import "./EventList.css";
import { EVENTS_QUERY } from "../../../graphql/events";
import { gql, useQuery } from '@apollo/client';

function EventList() {
	const {loading, error, data} = useQuery(EVENTS_QUERY)
	const [events, setEventData] = useState(undefined)

	useEffect(() => {
		if (loading === false && data) {
			setEventData(data);
		}
	}, [loading, data])

    if (loading) return <h3>Loading Masterpieces...</h3>
	if (error) return `Error! ${error.message}`
	
	// const allEvents = events.map(event => {
	// 	return <EventItem 
	// 				key={event._id} 
	// 				title={event.title} 
	// 				eventId={event._id} 
	// 				// userId={props.authUserId} 
	// 				// creatorId={event.creator._id}
	// 				date={event.date}
	// 				price={event.price}
	// 				// onDetail={props.onViewDetail}
	// 				/>
	// })

    return (
		<div>
			<h2>TEST</h2>
			{/* { events} */}
			{/* <ul className="events__list"> 
				{ allEvents } 
			</ul> */}
		</div>
        
    )

}

export default EventList;