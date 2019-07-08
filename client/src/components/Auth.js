import React from "react";
import "./Auth.css";

class AuthPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: ""
		}

	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();

		let email = this.state.email;
		let password = this.state.password;

		console.log(email, password)

	};

	render() {
		return (
			<form className="auth-form" onSubmit={this.handleSubmit}>

				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input type="email" 
							id="email"
							name="email" 
							value={this.state.email} 
							onChange={this.handleChange}/>
				</div>

				<div className="form-control">
					<label htmlFor="password">Password</label>
					<input type="password" 
							id="password"
							name="password" 
							value={this.state.password}
							onChange={this.handleChange} />
				</div>

				<div className="form-actions">
					<button type="button">Switch to Signup</button>
					<button type="submit">Submit</button>
				</div>
			</form>
		);
	}
}

export default AuthPage;