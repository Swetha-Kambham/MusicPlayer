export default `#graphql
  extend type Query {
    getUsers:[User]
  }
  type User{
    id: String!
    name: String
  }
`;
