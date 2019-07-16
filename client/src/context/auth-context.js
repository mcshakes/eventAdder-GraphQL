import React from "react";

export default React.createContext({
	token: null,
	userId: null,
	login: (token, userId, tokenExpiration) => {},
	logout: () => {}
});

// those methods don't do anything. for now. see App.js file where Provider has a value to distribute