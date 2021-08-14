import { ApolloServer, gql } from 'apollo-server';

const usuarios = [
  {
    id: 1,
    nome: 'Celso Alexandre',
    email: 'celso@celso.com',
    idade: 27,
  },
  {
    id: 2,
    nome: 'Celso Alexandre 2',
    email: 'celso2@celso.com',
    idade: 28,
  },
];

const typeDefs = gql`
  scalar Date

  type Usuario {
    id: Int
    nome: String
    email: String
    idade: Int
    salario: Float
    vip: Boolean
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float    
  }

  #Pontos de entrada da API
  type Query {
    hi: String!
    whatTimeItIs: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]!
    usuarios: [Usuario]
    usuario(id: Int!): Usuario
  }
`;

const resolvers = {
  Produto: {
    precoComDesconto(parent: any) {
      if (!parent.desconto) return parent.preco;
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
    numerosMegaSena() {
      function sortear() {
        return Math.round(Math.random() * 100);
      }
      return Array(6)
        .fill(0)
        .map(() => sortear())
        .sort((a, b) => a - b);
    },
    usuarios() {
      return usuarios;
    },
    usuario(_, { id }) {
      const usuarioEncontrado = usuarios.find((usuario) => usuario.id === id);
      console.log({ usuarioEncontrado });
      return usuarioEncontrado;
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
