import React from "react";

import Modal from "../components/modals/Modal";
import Backdrop from "./backdrop/Backdrop";
import AuthContext from "../context/auth-context";

import EventItem from "./events/EventItem";
import EventList from "./events/EventList";
import Spinner from "./spinner/Spinner"
import "./Events.css";


class EventsPage extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);

		this.state = {
			title: "",
			price: "",
			date: "",
			description: "",
			creatingStatus: false,
			events: [],
			isLoading: false,
			selectedEvent: null
		}
	}

	componentDidMount() {
		this.fetchAllEvents();
	}

	createEventHandler = () => {
		this.setState({ creatingStatus: true });
	}

	cancelEventCreation = () => {
		this.setState({ creatingStatus: false, selectedEvent: null  });	
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	confirmEventCreation = () => {
		this.setState({ creatingStatus: false });	

		const title = this.state.title;
		const price = +this.state.price; 	//converts to number
		const date = this.state.date;
		const description = this.state.description;

		if (
			title.trim().length === 0 ||
			price <= 0 ||
			date.trim().length === 0 ||
			description.trim().length === 0
		) {
			return;
		}

		const newEvent = {title, price, date, description};

		let requestBody = {
			query: `
				mutation {
					createEvent(eventInput: {
						title: "${title}",
						description: "${description}",
						price: ${price},
						date: "${date}"
					}) {
						_id
						title
						description
						date
						price
					}
				}
			`
		}
		
		const token = this.context.token;

		fetch("http://localhost:8080/graphql", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token

			}
		})
		.then(res => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error("Failed!");
			}
			return res.json();
		})
		.then(resData => {
			this.setState(prevState => {
				const updatedEvents = [...prevState.events]

				updatedEvents.push({
					_id: resData.data.createEvent._id,
					title: resData.data.createEvent.title,
					description: resData.data.createEvent.description,
					date: resData.data.createEvent.date,
					price: resData.data.createEvent.price,
					creator: {
						_id: this.context.userId						
					}
				})
				return { events: updatedEvents };
			});

			
		})
		.catch(err => {
			console.log(err);
		})
	}

	fetchAllEvents = () => {
		this.setState({ isLoading: true })

		let requestBody = {
			query: `
				query {
					events {
						_id
						title
						description
						date
						price
						creator {
							_id
							email
						}
					}
				}
			`
		}
		
		fetch("http://localhost:8080/graphql", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
				"Content-Type": "application/json"

			}
		})
		.then(res => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error("Failed!");
			}
			return res.json();
		})
		.then(resData => {
			const events = resData.data.events;
			this.setState({ events: events, isLoading: false });

		})
		.catch(err => {
			console.log(err);
			this.setState({ isLoading: false })

		})
	}

	showDetailHandler = (eventId) => {
		this.setState(prevState => {
			const selectedEvent = prevState.events.find(event => event._id === eventId)

			return { selectedEvent: selectedEvent };
		})
	}

	bookEventHandler = () => {

	}

	render() {
		const { events } = this.state;

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

				{this.state.selectedEvent && (
					<Modal title={this.state.selectedEvent.title}
						canCancel 
						canConfirm 
						onCancel={this.cancelEventCreation} 
						onConfirm={this.bookEventHandler}
					>
						<h1>{this.state.selectedEvent.title}</h1>
						<h2>
							${this.state.selectedEvent.price} - {new Date(this.state.selectedEvent.date).toLocaleDateString()}
						</h2>
						<p>{this.state.selectedEvent.description}</p>
					</Modal>
				)}

				{this.context.token && (
					<div className="events-control">
						<p>share your events</p>

						<button className="btn" onClick={this.createEventHandler}>
							Create Event
						</button>
					</div>

				)}
				
				{this.state.isLoading ? (
					<Spinner />
				) : (
					<EventList events={events} authUserId={this.context.userId} onViewDetail={this.showDetailHandler}/>
				)}
				
			</React.Fragment>
		);
	}
}

export default EventsPage;