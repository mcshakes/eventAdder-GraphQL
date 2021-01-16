import React, { useEffect, useState, useContext } from "react";
import Modal from "../../components/modals/Modal";
import Backdrop from "../../components/backdrop/Backdrop";
import AuthContext from "../../context/auth-context";

import Spinner from "../../components/spinner/Spinner";
import "./Events.css";
import { EVENTS_QUERY } from "../../graphql/events";
import { gql, useQuery } from '@apollo/client';
import EventList from "./components/EventList";

function EventsContainer() {
    const user = useContext(AuthContext);

    const {loading, error, data} = useQuery(EVENTS_QUERY)
    const [events, setEventData] = useState(undefined)
    const [selectedEvent, selectEvent] = useState(null)

	useEffect(() => {
		if (loading === false && data) {
			setEventData(data);
		}
	}, [loading, data])
    
    if (error) return `Error! ${error.message}`

    const showDetailHandler = (eventId) => {
        // Somewhere out there, I passed it as an object

        let selected = events.events.find(event => event._id === eventId)

        selectEvent(selected)
    }
        
    return (
        <div>
            <h1>Events Container</h1>
            
            {selectedEvent && (
                <Modal title={selectedEvent.title}
					>
						<h1>{selectedEvent.title}</h1>
						<h2>
							${selectedEvent.price} - {new Date(selectedEvent.date).toLocaleDateString()}
						</h2>
						<p>{selectedEvent.description}</p>
					</Modal>
            )}
            
            {loading && <Spinner />}

            {events && <EventList events={events} authUserId={user.userId} onViewDetail={showDetailHandler}/>}                
        </div>        
    )
}

export default EventsContainer;