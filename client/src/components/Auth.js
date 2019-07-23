import React from "react";
import "./Auth.css";

import AuthContext from "../context/auth-context";

class AuthPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			isLogin: true
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

	handleSubmit = (event) => {
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
			console.log("resData in Auth.js", resData)
			if (resData.data.login.token) {
				// this.context is a property given by react through the context object
				
				this.context.login(
					resData.data.login.token, 
					resData.data.login.userId, 
					resData.data.login.tokenExpiration
				);
			}
		})
		.catch(err => {
			console.log(err);
		})

	};

	render() {
		console.log("login? ", this.state.isLogin)

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
					<button type="submit">Submit</button>
					
					<button type="button" onClick={this.switchButtonHandler}>
						Switch to {this.state.isLogin ? "Sign Up" : "Log In"}
					</button>
				</div>
			</form>
		);
	}
}

export default AuthPage;