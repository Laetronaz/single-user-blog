import React, { Component } from "react";
import { Query } from "react-apollo";
import { Spin, Row } from "antd";

import PostForm from "./PostForm";
import { POST_QUERY } from "../querries/posts";

export default class EditPost extends Component {
  render() {
    let { post_id } = this.props.match.params;
    const id = parseInt(post_id);
    return (
      <Query query={POST_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Row className="spin">
                <Spin tip="Loading..." size="large" />
              </Row>
            );
          if (error) console.log(error);

          const post = data.post;
          return <PostForm key={post.post_id} post={post} />;
        }}
      </Query>
    );
  }
}
