This is a boilerplate for GraphQL + Sequelize stack with very basic user authorization!

Add your database URI and JWT secret to the .env-cmdrc.json file.

Use the 'request' from context in your resolvers to get the Authorization header token value.

To get the user Id of a authorized/logged in user, use the getUserId function from the utils folder as a named import:

            const userId = getUserId(request)

Dataloader is used to avoid the N+1 query problem, that arises with GraphQl. Check out their
github repository for in depth documentation! 

Websockets is already set up, so all you have to do is create your typeDefs and resolvers for your subscriptions!

Use 'npm run dev' to to start your development server! Go to 
http://localhost:8080/graphql/ to play around in the GraphQL playground and 
to test out your queries, mutations, and subscriptions! 

For queries and mutations that require authorization, run the login mutation, and in the HTTP Headers tab in the bottom left, enter:

        
     {"Authorization" : "Bearer *your returned token here*"}