import React from "react";
import "./App.css";
import Header from "../Header/Header";

// Befehl zum Starten von Chrome ohne CORS: open -n -a Google\ Chrome --args --disable-web-security --user-data-dir=/tmp/chrome

class App extends React.Component {
  render() {
    return <Header />;
  }
}

export default App;
