const express = require("express");
const bodyParser = require("body-parser");
const graphQLHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser.json());

app.use("/graphql", graphQLHTTP({
	schema: buildSchema(`
		type RootQuery {
			sessions: [String!]! 
		}

		type RootMutation {
			createSession(name: String): String
		}

		schema {
			query: RootQuery
			mutation: RootMutation
		}
	`),
	rootValue: {}
}));

app.listen(3000);