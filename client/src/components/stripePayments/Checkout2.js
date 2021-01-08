import React from "react";
import {CardElement, injectStripe} from 'react-stripe-elements';
import "./Checkout.css";

class CheckoutForm extends React.Component {
	constructor(props) {
		super(props);

	}

	submit = (event) => {

	}

	render() {
		return (
			<div className="checkout">
				<h3>Complete your purchase</h3>

				<form className="checkout-form">
					<label htmlFor="email">Email</label>
					<input 
						type="text" 
						id="email" 
						name="email"
					/>
					<CardElement />
					<button onClick={this.submit}>Charge It!</button>
				</form>
			</div>
		)
	}
}

export default injectStripe(CheckoutForm);