import React from "react";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Page from "../Page/Page";

// Befehl zum Starten von Chrome ohne CORS: open -n -a Google\ Chrome --args --disable-web-security --user-data-dir=/tmp/chrome

class App extends React.Component {
  render() {
    return (
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" render={({ match }) => <Page slug="home" />} />
            <Route
              path="/:slug"
              render={({ match }) => <Page slug={match.params.slug} />}
            />
          </Switch>
          <Footer />
        </Router>
    );
  }
}

export default App;
