import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import PostsItem from "./PostsItem";
import { Spin, Typography } from "antd";

import { POSTS_QUERY } from "../querries/posts";

const { Title } = Typography;

export default class Posts extends Component {
  render() {
    return (
      <div>
        <Fragment>
          <Title level={1}>Posts</Title>
          <Query query={POSTS_QUERY}>
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <div className="spin">
                    <Spin tip="Loading..." size="large" />
                  </div>
                );
              if (error) console.log(error);
              return (
                <Fragment>
                  {data.posts.map(post => (
                    <PostsItem key={post.id} post={post} />
                  ))}
                </Fragment>
              );
            }}
          </Query>
        </Fragment>
      </div>
    );
  }
}
