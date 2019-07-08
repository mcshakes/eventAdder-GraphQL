const express = require("express");
const bodyParser = require("body-parser");
const graphQLHTTP = require("express-graphql");
const mongoose = require("mongoose");
const isAuthenticated = require("./middleware/isAuthenticated");

const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");

const app = express();


app.use(bodyParser.json());

app.use(isAuthenticated);

app.use(
	"/graphql", 
	graphQLHTTP({
		schema: graphQLSchema,
		rootValue: graphQLResolvers,
		graphiql: true
	})
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-l4uk8.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true })
	.then(() => {
		app.listen(8080); 		
	})
	.catch(err => {
		console.log(err);  
	})


