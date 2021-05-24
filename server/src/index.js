import express from 'express';
import { createServer } from 'http';
import { PubSub } from 'apollo-server';
import { ApolloServer, gql } from 'apollo-server-express';
import { v4 as uuidv4 } from 'uuid';

const app = express();

const pubsub = new PubSub();
const POST_CREATED = 'POST_CREATED';
const posts = [
  {
    id: 0,
    title: 'React',
    content: 'React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app, the links in this section will help you get started.',
  },
  {
    id: 1,
    title: 'GraphQL',
    content: 'GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.',
  },
];

const typeDefs = gql`
  type Query {
    posts: [Posts!]!
  }

  type Mutation {
    postCreated(title: String!, content: String!): Posts!
  }

  type Posts {
    id: String
    title: String
    content: String
  }
`;

const resolvers = {
  Query: {
    posts: () => (posts)
  },
  Mutation: {
    postCreated: (parent, { title, content, id }) => {
      id = uuidv4();
      const post = {
        id,
        title,
        content,
      };
      posts.push(post)
      return post;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});

