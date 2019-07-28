import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import SideMenu from "./components/template/SideMenu";

import ScrollToTop from "./components/template/ScrollToTop";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post";
import CategoriesItem from "./components/categories/CategoriesItems";
import Category from "./components/categories/Category";
import AlbumsItems from "./components/albums/AlbumsItems";
import Album from "./components/albums/Album";
import About from "./components/pages/about";
import NotFound404 from "./components/pages/NotFound404";
import PageHeader from "./components/template/PageHeader";

import "antd/dist/antd.css";
import "./styles/App.css";
import "./styles/animate.css";

const client = new ApolloClient({ uri: "/graphql" });

const { Content } = Layout;

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <ScrollToTop>
            <div className="App">
              <Layout style={{ minHeight: "100vh" }}>
                <SideMenu />
                <Layout>
                  <Content style={{ margin: "0 16px" }}>
                    <PageHeader />
                    <div
                      style={{ padding: 0, background: "#fff", height: "100%" }}
                    >
                      <Switch>
                        <Route exact path="/" component={Posts} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/posts" component={Posts} />
                        <Route exact path="/posts/:post_id" component={Post} />
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
                        <Route
                          exact
                          path="/albums/:album_id"
                          component={Album}
                        />
                        <Route component={NotFound404} />
                      </Switch>
                    </div>
                  </Content>
                </Layout>
              </Layout>
            </div>
          </ScrollToTop>
        </Router>
      </ApolloProvider>
    );
  }
}
