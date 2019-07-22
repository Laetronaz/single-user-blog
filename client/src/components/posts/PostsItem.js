import React from "react";
import { Col, Row, Typography, Divider } from "antd";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

export default function PostsItem({ post: { id, title, body } }) {
  return (
    <Row type="flex" justify="start" align="top">
      <Col xs={0} sm={0} md={12} lg={8} xl={7} xxl={5}>
        <Link to={`/posts/${id}`}>
          <img
            src="https://images.pexels.com/photos/2265482/pexels-photo-2265482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt=""
            style={{ height: 200, width: 250 }}
            id="post-image"
          />
        </Link>
      </Col>
      <Col xs={16} sm={16} md={12} lg={14} xl={17} xxl={19}>
        <Link to={`/posts/${id}`}>
          <Title level={2}> {title}</Title>
        </Link>
        <Text>{body}</Text>
      </Col>
      <Divider />
    </Row>
  );
}
