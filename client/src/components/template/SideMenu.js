import React, { Component } from "react";
import { Layout, Menu, Icon, Avatar } from "antd";

import "../css/sider.css";

import logo from "../ressources/logo.png";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class SideMenu extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });

    const title = document.querySelector(".sider-title");
    if (collapsed) {
      title.classList.add("invisible");
      if (title.classList.contains("animated")) {
        title.classList.remove("animated", "fadeIn", "slower");
      }
    } else {
      setTimeout(() => {
        title.classList.remove("invisible");
        title.classList.add("animated", "fadeIn", "slower");
      }, 100);
    }
  };

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="sider-title-div">
          <div className="logo">
            <Avatar size="large" shape="circle" src={logo} />
          </div>

          <div className="sider-title">Laetronaz Blog</div>
        </div>

        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="read" />
                <span>Posts</span>
              </span>
            }
          >
            <Menu.Item key="2">New Post</Menu.Item>
            <Menu.Item key="3">Manage Posts</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Categories</span>
              </span>
            }
          >
            <Menu.Item key="4">New Category</Menu.Item>
            <Menu.Item key="5">Manage Categories</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="picture" />
                <span>Albums</span>
              </span>
            }
          >
            <Menu.Item key="6">New Album</Menu.Item>
            <Menu.Item key="7">Manage Albums</Menu.Item>
          </SubMenu>
          <Menu.Item key="8">
            <Icon type="tags" />
            <span>Tags</span>
          </Menu.Item>
          <Menu.Item key="10">
            <Icon type="question-circle" />
            <span>About</span>
          </Menu.Item>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="database" />
                <span>Logs</span>
              </span>
            }
          >
            <Menu.Item key="11">Application Logs</Menu.Item>
            <Menu.Item key="12">Mails Logs</Menu.Item>
            <Menu.Item key="13">Posts Logs</Menu.Item>
          </SubMenu>
          <Menu.Item key="14">
            <Icon type="profile" />
            <span>Profile</span>
          </Menu.Item>
          <Menu.Item key="15">
            <Icon type="login" />
            <span>Login</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
