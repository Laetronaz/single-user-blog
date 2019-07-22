import React, { Component } from "react";
import { Layout } from "antd";
import PageBreadcrumb from "./PageBreadcrumb";

const { Header } = Layout;

export default class PageHeader extends Component {
  render() {
    return (
      <Header style={{ background: "#fff", padding: 0 }}>
        <PageBreadcrumb />
      </Header>
    );
  }
}
