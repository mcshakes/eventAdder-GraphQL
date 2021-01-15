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

	useEffect(() => {
		if (loading === false && data) {
			setEventData(data);
		}
	}, [loading, data])

    
    if (error) return `Error! ${error.message}`
        
    return (
        <div>
            <h1>Events Container</h1>
            
            
            {loading && <Spinner />}

            {events && <EventList events={events} authUserId={user.userId}/>}                
        </div>        
    )
}

export default EventsContainer;