const bcrypt = require("bcryptjs");
const User = require("../../models/user");



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


	}
		
}