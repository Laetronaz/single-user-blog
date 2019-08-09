import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Avatar } from "antd";
import { withAuth } from "@okta/okta-react";

import "../css/sider.css";

import logo from "../ressources/logo.png";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default withAuth(
  class SideMenu extends Component {
    state = {
      collapsed: false,
      authenticated: null
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

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    };

    async componentDidMount() {
      this.checkAuthentication();
    }

    async componentDidUpdate() {
      this.checkAuthentication();
    }

    login = async () => {
      this.props.auth.login("/");
      console.log("allo!");
    };

    logout = async () => {
      this.props.auth.logout("/");
    };

    render() {
      if (this.state.authenticated === null) return null;

      const posts = this.state.authenticated ? (
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
      ) : (
        <div />
      );

      const categories = this.state.authenticated ? (
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
      ) : (
        <Menu.Item>
          <Link to="/categories">
            <Icon type="appstore" />
            <span>Categories</span>
          </Link>
        </Menu.Item>
      );

      const albums = this.state.authenticated ? (
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
      ) : (
        <Menu.Item key="6">
          <Link to="/albums">
            <Icon type="picture" />
            <span>Albums</span>
          </Link>
        </Menu.Item>
      );
      const logs = this.state.authenticated ? (
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
      ) : (
        <div />
      );

      const profile = this.state.authenticated ? (
        <Menu.Item key="14">
          <Icon type="profile" />
          <span>Profile</span>
        </Menu.Item>
      ) : (
        <div />
      );

      const AuthMenu = this.state.authenticated ? (
        <Menu.Item key="15" onClick={this.logout}>
          <Icon type="logout" />
          <span>Logout</span>
        </Menu.Item>
      ) : (
        <Menu.Item key="15" onClick={this.login}>
          <Icon type="login" />
          <span>Login</span>
        </Menu.Item>
      );

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
              <Link to="/">
                <Icon type="home" />
                <span>Home</span>
              </Link>
            </Menu.Item>

            {posts}
            {categories}
            {albums}
            <Menu.Item key="8">
              <Link to="/tags">
                <Icon type="tags" />
                <span>Tags</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/about">
                <Icon type="question-circle" />
                <span>About</span>
              </Link>
            </Menu.Item>
            {logs}
            {profile}
            {AuthMenu}
          </Menu>
        </Sider>
      );
    }
  }
);
