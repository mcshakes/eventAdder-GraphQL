const express = require("express");
const bodyParser = require("body-parser");
const graphQLHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser.json());

app.use(
	"/graphql", 
	graphQLHTTP({
		schema: buildSchema(`
			type RootQuery {
				events: [String!]! 
			}

			type RootMutation {
				createEvent(name: String): String
			}

			schema {
				query: RootQuery
				mutation: RootMutation
			}
		`),
		rootValue: {
			events: () => {
				return ["Romantic Cooking", "Group Therapy", "fight club..."]
			},
			createEvent: (args) => {
				const eventName = args.name;

				return eventName;
			}
		},
		graphiql: true
	})
);

app.listen(3000);