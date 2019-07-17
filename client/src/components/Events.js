import React from "react";

import Modal from "../components/modals/Modal";
import Backdrop from "./backdrop/Backdrop";
import "./Events.css";


class EventsPage extends React.Component {
	state = {
		creatingStatus: false
	}

	createEventHandler = () => {
		this.setState({ creatingStatus: true });
	}

	cancelEventCreation = () => {
		this.setState({ creatingStatus: false });	
	}

	confirmEventCreation = () => {
		console.log("confirm")
	}

	render() {

		return (
			<React.Fragment>
				{this.state.creatingStatus && <Backdrop />}
				{this.state.creatingStatus && (
					<Modal title="Add Event" canCancel canConfirm onCancel={this.cancelEventCreation} onConfirm={this.confirmEventCreation}>
						<p>Modal Content</p>
					</Modal>
				)}

				<div className="events-control">
					<p>share your events</p>

					<button className="btn" onClick={this.createEventHandler}>
						Create Event
					</button>
				</div>
			</React.Fragment>
		);
	}
}

export default EventsPage;