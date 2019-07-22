import gql from "graphql-tag";

export const POSTS_QUERY = gql`
  query jsonTemplateAPI {
    posts {
      id
      title
      body
    }
  }
`;
