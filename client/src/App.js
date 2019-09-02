import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Security, ImplicitCallback } from "@okta/okta-react";
import { Layout } from "antd";

import SideMenu from "./components/template/SideMenu";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post";
import NewPost from "./components/posts/NewPost";
import EditPost from "./components/posts/EditPost";
import ManagePosts from "./components/posts/ManagePosts";
import CategoriesItem from "./components/categories/CategoriesItems";
import Category from "./components/categories/Category";
import AlbumsItems from "./components/albums/AlbumsItems";
import Album from "./components/albums/Album";
import About from "./components/pages/about";
import PageHeader from "./components/template/PageHeader";
import Login from "./components/authentification/Login";

import "antd/dist/antd.css";
import "./styles/App.css";
import "./styles/animate.css";

const { Content } = Layout;

const config = {
  issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
  client_id: `${process.env.REACT_APP_OKTA_CLIENT_ID}`,
  base_url: `${process.env.REACT_APP_OKTA_ORG_URL}`,
  disqus: `${process.env.DISQUS}`
};

function onAuthRequired({ history }) {
  history.push("/login");
}

export default class App extends Component {
  render() {
    return (
      <Security
        issuer={config.issuer}
        client_id={config.client_id}
        redirect_uri={window.location.origin + "/implicit/callback"}
        onAuthRequired={onAuthRequired}
      >
        <div className="App">
          <Layout style={{ minHeight: "100vh" }}>
            <SideMenu />
            <Layout>
              <Content style={{ margin: "0 16px" }}>
                <PageHeader />
                <div
                  style={{
                    padding: 0,
                    background: "#fff",
                    height: "100%"
                  }}
                >
                  <Switch>
                    <Route exact path="/about" component={About} />
                    <Route exact path="/posts/new" component={NewPost} />
                    <Route exact path="/posts" component={ManagePosts} />
                    <Route exact path="/posts/:post_id" component={Post} />
                    <Route
                      exact
                      path="/posts/edit/:post_id"
                      component={EditPost}
                    />
                    <Route
                      exact
                      path="/categories/"
                      component={CategoriesItem}
                    />
                    <Route
                      exact
                      path="/categories/:cartegory_id"
                      component={Category}
                    />
                    <Route exact path="/albums/" component={AlbumsItems} />
                    <Route exact path="/albums/:album_id" component={Album} />
                    <Route
                      path="/login"
                      render={() => <Login baseUrl={config.base_url} />}
                    />
                    <Route
                      path="/implicit/callback"
                      component={ImplicitCallback}
                    />
                    <Route path="/" exact={true} component={Posts} />
                  </Switch>
                </div>
              </Content>
            </Layout>
          </Layout>
        </div>
      </Security>
    );
  }
}
