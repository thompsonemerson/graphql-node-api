import { makeExecutableSchema } from 'graphql-tools';

const users: any[] = require('../data/users.json');

const typeDefs = `
  type User {
    id: ID!
    name: String!
    position: String!
    email: String!
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, position: String! email: String!): User
  }
`;

const resolvers = {
  Query: {
    allUsers: () => users
  },
  Mutation: {
    createUser: (parent, args) => {
      const newUser = Object.assign({ id: users.length + 1 }, args);
      users.push(newUser);

      return newUser;
    }
  }
};

export default makeExecutableSchema({typeDefs, resolvers});
