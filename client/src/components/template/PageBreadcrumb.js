import React, { Component } from "react";
import { Breadcrumb } from "antd";

export default class PageBreadcrumb extends Component {
  render() {
    return (
      <Breadcrumb style={{ margin: "6px 0" }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}
