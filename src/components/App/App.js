import React from "react";
import "./App.css";
// import Header from "../Header/Header";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { Home } from "../Home/Home";
import { Page } from "../Page/Page";

import wp from "../../util/wp";

// Befehl zum Starten von Chrome ohne CORS: open -n -a Google\ Chrome --args --disable-web-security --user-data-dir=/tmp/chrome

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      pagesLoaded: false,
    };
  }

  componentDidMount() {
    wp.getPages().then(page => {
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
              <Route path="/:slug" component={Page} />
            </Switch>
          </Router>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default App;
