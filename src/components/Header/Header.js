import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Page from "../Page/Page";
import wp from "../../util/wp";
import Page404 from "../Page404/Page404";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      pagesLoaded: false,
    };
  }

  componentDidMount() {
    wp.getPages().then((page) => {
      this.setState({
        pages: page,
        pagesLoaded: true,
      });
    });
  }

  render() {
    if (this.state.pagesLoaded) {
      return (
        <div>
          <Router>
            <div>
              <ul>
                {this.state.pages.map((page) => {
                  return (
                    <Link
                      to={`/${page.slug}`}
                      key={page.id}
                      style={{ margin: 10 }}
                    >
                      {page.title.rendered}
                    </Link>
                  );
                })}
              </ul>
            </div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/:slug"
                render={({ match }) => <Page slug={match.params.slug} />}
              />
              {/* Page404 is not working so far. The :slug param catches all slugs no matter if there a site or not */}
              <Route path="*" component={Page404} />
            </Switch>
          </Router>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default Header;
