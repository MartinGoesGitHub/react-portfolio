import React, { Component } from "react";

import wp from "../../util/wp";

export class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
      isLoaded: false,
      slug: this.props.match.params.slug,
    };
    this.updatePage = this.updatePage.bind(this)
  }

  updatePage() {
    // const slug = this.props.match.params.slug;
    wp.getSpecificPage(this.state.slug).then((page) => {
      this.setState({
        page: page[0],
        isLoaded: true,
      });
    });
  }

  createMarkup(html) {
    return { __html: html };
  }

  render() {
    // this.updatePage();
    // if (this.state.isLoaded) {
    //   return (
    //     <div>
    //       <h2>{this.state.page.title.rendered}</h2>
    //       <div
    //         dangerouslySetInnerHTML={this.createMarkup(
    //           this.state.page.content.rendered
    //         )}
    //       />
    //     </div>
    //   );
    // } else {
    //   return <div>Loading...</div>;
    // }
    return (
    <div>{this.props.match.params.slug}</div>
    )
  }
}

export default Page;
