import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  scalar Date

  type Usuario {
    id: ID
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  type Produto {
    nome: String
    preco: Float
    desconto: Float
    precoComDesconto: Float
  }

  #Pontos de entrada da API
  type Query {
    hi: String!
    whatTimeItIs: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
  }
`;

const resolvers = {
  Produto: {
    precoComDesconto(parent) {
      return parent.preco * (1 - parent.desconto);
    },
  },
  Query: {
    hi() {
      return 'Whatever';
    },
    whatTimeItIs() {
      return new Date();
    },
    usuarioLogado() {
      return {
        ID: '1',
        nome: 'Celso Alexandre',
        email: 'celsoalexandre@live.com',
        idade: 28,
        salario: 100.20,
        vip: true,
      };
    },
    produtoEmDestaque() {
      return {
        nome: 'Uva (Kg)',
        preco: 5,
        desconto: 0.05,
      };
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
