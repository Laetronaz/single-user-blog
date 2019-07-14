import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";

import SideMenu from "./components/template/SideMenu";

import ScrollToTop from "./components/template/ScrollToTop";
import PostsIndex from "./components/posts/PostsItem";
import Post from "./components/posts/Post";
import CategoriesItem from "./components/categories/CategoriesItems";
import Category from "./components/categories/Category";
import AlbumsItems from "./components/albums/AlbumsItems";
import Album from "./components/albums/Album";
import Gallery from "./components/gallery/Gallery";
import About from "./components/pages/about";
import NotFound404 from "./components/pages/NotFound404";
import PageFooter from "./components/template/PageFooter";

import "antd/dist/antd.css";
import "./components/css/sider.css";
import PageHeader from "./components/template/PageHeader";
import PageBreadcrumb from "./components/template/PageBreadcrumb";

const { Content } = Layout;

export default class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <div className="App">
            <Layout style={{ minHeight: "100vh" }}>
              <SideMenu />

              <Layout>
                <Content style={{ margin: "0 16px" }}>
                  <PageHeader />
                  <PageBreadcrumb />
                  <div
                    style={{ padding: 24, background: "#fff", minHeight: 360 }}
                  >
                    <Switch>
                      <Route exact path="/" component={PostsIndex} />
                      <Route exact path="/about" component={About} />
                      <Route exact path="/posts" component={PostsIndex} />
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
                      <Route exact path="/albums/:album_id" component={Album} />
                      <Route exact path="/gallery" component={Gallery} />
                      <Route component={NotFound404} />
                    </Switch>
                  </div>
                </Content>
                <PageFooter />
              </Layout>
            </Layout>
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}
