import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";

import AuthContext from "../../context/auth-context";

const mainNavigation = props => (

	<AuthContext.Consumer>
		{context => {
			return (
				<header className="main-navigation">
					<div className="main-navigation__logo">
						<h1>Find Your People</h1>
					</div>

					<nav className="main-navigation__items">
						<ul>
							{context.token && (
								<li><NavLink to="/bookings">Bookings</NavLink></li>
							)}
							
							<li><NavLink to="/events">Events</NavLink></li>
							
							{!context.token && (
								<li><NavLink to="/auth">Log In!</NavLink></li>
							)}
						</ul>
					</nav>
				</header>
			)
		}}
	</AuthContext.Consumer>
);

export default mainNavigation;