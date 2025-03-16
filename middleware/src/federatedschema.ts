import { userSchema, userResolver } from './user';
import { awsS3Resolver, awsS3Schema } from './awss3'
import {mergeResolvers,mergeTypeDefs} from '@graphql-tools/merge'

const baseTypeDefs = `#graphql
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export const schema = { typeDefs : mergeTypeDefs([baseTypeDefs,userSchema,awsS3Schema]), resolvers : mergeResolvers([userResolver, awsS3Resolver])}