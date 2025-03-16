export default `#graphql
  extend type Query {
    getSongsForLabel(label: String!, limit: Int, nextToken: String): SongResponse!
  }

  type SongResponse {
    songs: [Song!]!
    nextToken: String
  }

  type Song {
    key: String!
    url: String!
  }
`;
