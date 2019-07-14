import React, { Component } from "react";
import { Layout, Breadcrumb } from "antd";

const { Header } = Layout;

export default class PageHeader extends Component {
  render() {
    return <Header style={{ background: "#fff", padding: 0 }} />;
  }
}
