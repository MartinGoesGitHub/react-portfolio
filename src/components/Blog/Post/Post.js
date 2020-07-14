import React, { Component } from "react";
import wp from "../../../util/wp";
import "./Post.css";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "",
      isLoaded: false,
    };
  }

  componentDidMount() {
    wp.getPostData(this.props.slug).then((post) => {
      let postDate = post[0].date;
      let dateFormatted = `${postDate.slice(8, 10)}.${postDate.slice(
        5,
        7
      )}.${postDate.slice(0, 4)}`;
      post[0].date = dateFormatted;

      // if(post[0].featured_media !== 0 && this.props.slug !== "blog") {
      //   wp.getImage(post[0].featured_media).then(imageWP => {
      //     post[0].image = imageWP;
      //   })
      // }

      let authorID = post[0].author;
      wp.getAuthor(authorID).then((author) => {
        post[0].author = author;
      });

      this.setState(
        {
          post: post[0],
          isLoaded: true,
        },
        () => {
          if (
            this.props.slug !== "blog" &&
            this.state.post.featured_media !== 0
          ) {
            wp.getImage(this.state.post.featured_media).then((imageWP) => {
              this.setState((prevState) => ({
                post: {
                  ...prevState.post,
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
      wp.getPostData(this.props.slug).then((post) => {
        this.setState(
          {
            post: post[0],
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
      return (
        <div className="post">
          <div className="featuredMedia">
            <img src={this.state.post.image} alt="" />
          </div>
          <h2>{this.state.post.title.rendered}</h2>
          
          <div className="author">
            <img src={this.state.post.author.avatar} alt="" />
            <p>{this.state.post.author.name} </p>
          </div>

          <small>{this.state.post.date}</small>
          <div
            dangerouslySetInnerHTML={this.createMarkup(
              this.state.post.content.rendered
            )}
          />
          {this.props.slug}
        </div>
      );
    } else {
      return <LoadingAnimation/>;
    }
  }
}

export default Post;
