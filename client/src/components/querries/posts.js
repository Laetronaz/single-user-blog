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

export const POST_QUERY = gql`
  query jsonTemplateAPI($id: Int!) {
    post(id: $id) {
      id
      userId
      title
      body
      comments {
        id
        name
        email
        body
      }
    }
  }
`;
