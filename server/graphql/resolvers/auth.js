const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");


module.exports = {
			
	createUser: args => {
		
		return User.findOne({ email: args.userInput.email })
			.then(user => {
				// user is undefined or an object, hence exists

				if (user) {
					throw new Error("User exists already.")
				}

				return bcrypt.hash(args.userInput.password, 12)
			})
			.then(hashedPassword => {
				const user = new User({
					email: args.userInput.email,
					password: hashedPassword
				})

				return user.save();
			})
			.then(result => {
				// override to return null for the password. 

				return { ...result._doc, password: null }
			})
			.catch(err => {
				throw err;
			})


	},

	login: async ({ email, password }) => { // use object destructuring, so no need for args.email. Just email
		const user = await User.findOne({ email: email });

		if (!user) {
			throw new Error("User does not exist!");
		}

		const isEqual = await bcrypt.compare(password, user.password);

		if (!isEqual) {
			throw new Error("Password is incorrect!");
		}

		const token = jwt.sign({ userId: user.id, email: user.email }, "supersecretkey", {
			expiresIn: "1h"
		});

		return { userId: user.id, token: token, tokenExpiration: 1}
	}
		
}