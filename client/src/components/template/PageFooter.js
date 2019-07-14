import React, { Component } from "react";
import { Layout } from "antd";

import { constants } from "../constants/websiteConstants";

const { Footer } = Layout;

export default class PageFooter extends Component {
  render() {
    return (
      <Footer style={{ textAlign: "center" }}>
        {constants.WEBSITE} ©{constants.YEAR} Created by {constants.USERNAME}
      </Footer>
    );
  }
}
