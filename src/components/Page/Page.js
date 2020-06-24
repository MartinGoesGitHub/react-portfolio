import React, { Component } from "react";

import wp from "../../util/wp";

import "./Page.css";

export class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
      isLoaded: false,
    };
  }

  componentDidMount() {
    // const slug = this.props.match.params.slug;
    wp.getSpecificPage(this.props.slug).then((page) => {
      this.setState({
        page: page[0],
        isLoaded: true,
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      wp.getSpecificPage(this.props.slug).then((page) => {
        this.setState({
          page: page[0],
        });
      });
    }
  }

  createMarkup(html) {
    return { __html: html };
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          <h2>{this.state.page.title.rendered}</h2>
          <div
            dangerouslySetInnerHTML={this.createMarkup(
              this.state.page.content.rendered
            )}
          />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default Page;
