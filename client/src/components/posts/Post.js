import React, { Component } from "react";
import { Query } from "react-apollo";
import { Spin, Typography, Row, Col, Divider, Comment, Avatar } from "antd";

import "../css/post.css";
import { POST_QUERY } from "../querries/posts";

const { Title, Text } = Typography;

export default class Post extends Component {
  addComment() {}

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
          const comments = post.comments;
          return (
            <div>
              <Row type="flex" justify="space-around" align="middle">
                <Col>
                  <img
                    src={
                      "https://images.pexels.com/photos/2265482/pexels-photo-2265482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=auto"
                    }
                    alt="Thumbnail of the post"
                    className={"post_image"}
                  />
                </Col>
              </Row>
              <Row type="flex" justify="center" align="top">
                <Col>
                  <Divider />
                  <Title level={2}> {post.title} </Title>
                  <Text>{post.body}</Text>
                  <Divider />
                  <Title level={3}> Comments ({comments.length}):</Title>
                  {post.comments.map(comment => (
                    <Comment
                      key={comment.id}
                      author={comment.name}
                      content={comment.body}
                      avatar={<Avatar icon="user" />}
                    />
                  ))}
                  <Divider />
                </Col>
              </Row>
            </div>
          );
        }}
      </Query>
    );
  }
}
