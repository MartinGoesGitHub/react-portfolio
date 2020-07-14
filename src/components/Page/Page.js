import React, { Component } from "react";

import wp from "../../util/wp";
import Page404 from "../Page404/Page404";

import "./Page.css";
import Blog from "../Blog/Blog";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

export class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
      isLoaded: false,
    };
  }

  componentDidMount() {
    wp.getPageData(this.props.slug).then((page) => {
      this.setState(
        {
          page: page[0],
          isLoaded: true,
        },
        () => {
          if (
            this.props.slug !== "blog" &&
            this.state.page.featured_media !== 0
          ) {
            wp.getImage(this.state.page.featured_media).then((imageWP) => {
              this.setState((prevState) => ({
                page: {
                  ...prevState.page,
                  image: imageWP,
                },
              }));
            });
          }
        }
      );
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      wp.getPageData(this.props.slug).then((page) => {
        this.setState(
          {
            page: page[0],
          },
          () => {
            if (
              this.props.slug !== "blog" &&
              this.state.page.featured_media !== 0
            ) {
              wp.getImage(this.state.page.featured_media).then((imageWP) => {
                this.setState((prevState) => ({
                  page: {
                    ...prevState.page,
                    image: imageWP,
                  },
                }));
              });
            }
          }
        );
      });
    }
  }

  createMarkup(html) {
    return { __html: html };
  }

  render() {
    if (this.state.isLoaded) {
      if (this.state.page) {
        return (
          
          <div className="page">
            
            <div className="featuredMedia">
              <img src={this.state.page.image} alt="" />
            </div>

            <div className="title">
              <h2>{this.state.page.title.rendered}</h2>
            </div>

            {/* <iframe
            title="code"
              src="https://carbon.now.sh/embed?bg=rgba(255%2C255%2C255%2C1)&t=monokai&wt=none&l=jsx&ds=false&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=0px&ph=0px&ln=true&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false"
              style={{
                width: "100%",
                minHeight:"20em",
                border: "0",
                transform: "scale(1)",
                overflow: "scroll",
                
              }}
              sandbox="allow-scripts allow-same-origin"
            ></iframe> */}

            <div
              className="content"
              dangerouslySetInnerHTML={this.createMarkup(
                this.state.page.content.rendered
              )}
            />
          </div>
        );
      } else if (this.props.slug === "blog") {
        return <Blog />;
      } else {
        return <Page404 />;
      }
    } else {
      return <LoadingAnimation />;
    }
  }
}

export default Page;
