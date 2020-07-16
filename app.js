const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const models = require('./models');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// const me = models.User.findAll()[0];

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        models,
        // me,
    },
});

//tell express to use apollo-server
server.applyMiddleware({ app });
app.use(cors());

// The `listen` method launches a web server.
app.listen(3001, () => {
    console.log(`🚀  Server ready at 3001`);
});
