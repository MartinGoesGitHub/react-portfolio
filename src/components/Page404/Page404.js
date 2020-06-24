import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Page404 extends Component {
  render() {
    return (
      <div>
        Hi there, you propably took a wrong turn. <br />
        Lets get back to <Link to="/">Home</Link>
      </div>
    );
  }
}

export default Page404;
