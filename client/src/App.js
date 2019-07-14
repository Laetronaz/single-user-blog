import React from "react";

import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <ScrollToTop>
        <div className="App">
          <h1>Single User App</h1>
          <Switch>
            <Route exact path="/" component={PostsIndex} />
            <Route exact path="/about" component={About} />
            <Route exact path="/posts" component={PostsIndex} />
            <Route exact path="/posts/:post_id" component={Post} />
            <Route exact path="/categories/" component={CategoriesItem} />
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
      </ScrollToTop>
    </Router>
  );
}

export default App;
