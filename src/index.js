import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyparser from 'body-parser';
import { importSchema } from 'graphql-import';

import models from '../models';
import resolvers from './resolvers';
import { loaders } from './loaders/index';

const typeDefs = importSchema('./src/schema.graphql');

const app = express();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		return {
			models,
			request: req,
			loaders
		};
	}
});

server.applyMiddleware({
	app,
	bodyParserConfig: bodyparser.json({
		limit: '50mb',
		type: 'application/json'
	})
});

models.sequelize.sync().then(() => {
	app.listen({ port: 8080 }, () =>
		console.log(`Server live at http://localhost:8080${server.graphqlPath}`)
	);
});
