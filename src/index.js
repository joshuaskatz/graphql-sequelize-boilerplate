import 'core-js/stable';
import 'regenerator-runtime/runtime';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import { createServer } from 'http';
import bodyparser from 'body-parser';
import { importSchema } from 'graphql-import';

import models from './models';
import resolvers from './resolvers';
import { loaders } from './loaders/index';

const typeDefs = importSchema('./src/schema.graphql');

const app = express();

const pubsub = new PubSub();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	subscriptions: {
		onConnect: () => console.log('Connected to websocket')
	},
	context: async ({ req }) => {
		return {
			models,
			request: req,
			loaders,
			pubsub
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

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

models.sequelize.sync().then(() => {
	httpServer.listen({ port: 8080 }, () =>
		console.log(`Server live at http://localhost:8080${server.graphqlPath}`)
	);
});
