import React from "react";
import { Col, Row, Typography, Divider } from "antd";
import { Link } from "react-router-dom";

import "../../styles/hover.css";
import "../css/post.css";

const { Text, Title } = Typography;

export default function PostsItem({ post: { id, title, body } }) {
  return (
    <Row justify="start" className="hvr-shrink">
      <Link to={`/posts/${id}`}>
        <Col xs={0} sm={0} md={12} lg={8} xl={7} xxl={5}>
          <img
            src="https://images.pexels.com/photos/2265482/pexels-photo-2265482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=auto"
            alt=""
            className="post_image"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={16} xl={15} xxl={17}>
          <Title level={2}> {title}</Title>
          <Text>{body}</Text>
        </Col>
      </Link>
      <Divider />
    </Row>
  );
}
