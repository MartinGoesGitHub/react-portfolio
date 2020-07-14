import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostList from "./PostList/PostList";
import Post from "./Post/Post";

export class Blog extends Component {
  render() {
    return (
        <Router>
          <Switch>
              <Route path="/blog" exact component={PostList}/>
            <Route
              path="/blog/:slug"
              render={({ match }) => <Post slug={match.params.slug} />}
            />
          </Switch>
        </Router>
    );
  }
}

export default Blog;
