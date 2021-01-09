import React from "react";
import "./Auth.css";

import AuthContext from "../context/auth-context";

class AuthPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			isLogin: true,
			error: ''
		}
	}

	static contextType = AuthContext;

	switchButtonHandler = () => {
		this.setState(prevState => {
			return {isLogin: !prevState.isLogin};
		})
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	handleSubmit = async (event) => {
		event.preventDefault();

		let email = this.state.email;
		let password = this.state.password;

		let requestBody = {
			query: `
				query {
					login(email: "${email}", password: "${password}") {
						userId
						token
						tokenExpiration
					}
				}
			`
		}

		if (!this.state.isLogin) {
			requestBody = {
				query: `
					mutation {
						createUser(
							userInput: { 
								email: "${email}", 
								password: "${password}"}) 
						{
							_id
							email
						}
					}
				`
			}
		};
		
		try {
			let apiResponse = await fetch("http://localhost:8080/graphql", {
									method: "POST",
									body: JSON.stringify(requestBody),
									headers: {
										"Content-Type": "application/json"
									}
								});

			if (apiResponse.status !== 200 && apiResponse.status !== 201) {
				const message = `An error has occured: ${apiResponse.status}`;
				throw new Error(message);
			}

			
			let resData = await apiResponse.json();

			if (resData.errors) {
				let message = resData.errors[0].message;

				this.setState({ error: message })
				console.log("ERROR:", resData.errors);
			}

			// need to handle when they send without password
			// SPLIT UP LOGIN FROM CREATE USER FUNCTIONALITY

			console.log(resData.data)
			if (resData.data.login.token) {
				
				this.context.login(
					resData.data.login.token, 
					resData.data.login.userId, 
					resData.data.login.tokenExpiration
				);
			}

		} catch (err) {
			console.log("Fetch Error Caught: ", err)
		}

	};

	render() {

		return (
			<div className="s">
				{ this.state.error && <h3 className="error"> { this.state.error } </h3> }

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
						<button type="submit" data-testid="auth-submit">Submit</button>
						
						<button type="button" data-testid="auth-selection" onClick={this.switchButtonHandler}>
							Switch to {this.state.isLogin ? "Sign Up" : "Log In"}
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default AuthPage;