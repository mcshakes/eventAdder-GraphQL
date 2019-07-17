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
					<Modal title="Add Event" 
						canCancel canConfirm 
						onCancel={this.cancelEventCreation} 
						onConfirm={this.confirmEventCreation}
					>
						<form>
							<div className="form-control">
								<label htmlFor="title">Title</label>
								<input type="text" id="title" />
							</div>
							<div className="form-control">
								<label htmlFor="price">Price</label>
								<input type="number" id="price" />
							</div>
							<div className="form-control">
								<label htmlFor="date">Date</label>
								<input type="date" id="date" />
							</div>
							<div className="form-control">
								<label htmlFor="description">Description</label>
								<textarea id="description" rows="4" />
							</div>
						</form>
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