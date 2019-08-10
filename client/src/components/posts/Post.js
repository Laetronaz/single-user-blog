import React, { Component } from "react";
import { Query } from "react-apollo";
import { Spin, Typography, Row, Col, Divider } from "antd";
import { DiscussionEmbed, CommentCount } from "disqus-react";
import { POST_QUERY } from "../querries/posts";
import { constants } from "../constants/WebsiteConstants";

const { Title, Text } = Typography;

export default class Post extends Component {
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

          const disqusShortname = "localhost-3000-uqb4wvpldy";
          const disqusConfig = {
            url: `${constants.URL}/posts/`,
            identifier: post_id,
            title: post.title
          };

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
                  <CommentCount
                    shortname={disqusShortname}
                    config={disqusConfig}
                  >
                    Comments
                  </CommentCount>
                  <DiscussionEmbed
                    shortname={disqusShortname}
                    config={disqusConfig}
                  />
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
