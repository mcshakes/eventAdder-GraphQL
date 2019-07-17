import React from "react";

import Modal from "../components/modals/Modal";
import Backdrop from "./backdrop/Backdrop";
import "./Events.css";


class EventsPage extends React.Component {
	state = {
		creatingStatus: false
	};

	constructor(props) {
		super(props);

		this.state = {
			title: "",
			price: "",
			date: "",
			description: ""
		}
	}

	createEventHandler = () => {
		this.setState({ creatingStatus: true });
	}

	cancelEventCreation = () => {
		this.setState({ creatingStatus: false });	
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	confirmEventCreation = () => {
		this.setState({ creatingStatus: false });	

		const title = this.state.title;
		const price = this.state.price;
		const date = this.state.date;
		const description = this.state.description;

		if (
			title.trim().length === 0 ||
			price.trim().length === 0 ||
			date.trim().length === 0 ||
			description.trim().length === 0
		) {
			return;
		}

		const newEvent = {title, price, date, description};

		
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
								<input 
									type="text" 
									id="title" 
									name="title"
									value={this.state.title} 
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-control">
								<label htmlFor="price">Price</label>
								<input 
									type="number" 
									id="price" 
									name="price"
									value={this.state.price} 
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-control">
								<label htmlFor="date">Date</label>
								<input 
									type="datetime-local" 
									id="date"
									name="date"
									value={this.state.date} 
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-control">
								<label htmlFor="description">Description</label>
								<textarea 
									id="description" 
									rows="4"
									name="description"
									value={this.state.description} 
									onChange={this.handleChange}
								/>
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