import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  #Pontos de entrada da API
  type Query {
    hi: String
    whatTimeItIs: String
  }
`;

const resolvers = {
  Query: {
    hi() {
      return 'Whatever';
    },
    whatTimeItIs() {
      return new Date().toString();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`Executando em ${url}`);
});
