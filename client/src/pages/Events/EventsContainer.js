import React from "react";
import Modal from "../../components/modals/Modal";
import Backdrop from "../../components/backdrop/Backdrop";
import AuthContext from "../../context/auth-context";

import EventItem from "./components/EventItem";
import Spinner from "../../components/spinner/Spinner";
import "./Events.css";
import EventList from "./components/EventList";


function EventsContainer() {
    

    return (
        <div>
            <h1>Events Container</h1>
            <EventList />
        </div>        
    )
}

export default EventsContainer;