import React, { Component } from "react";
import wp from "../../../util/wp";
import { Link } from "react-router-dom";

import "./PostList.css";

export class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      isLoaded: false,
      hasImage: false,
    };
  }

  componentDidMount() {
    wp.getPostList().then((posts) => {
      this.setState(
        {
          postList: posts,
          isLoaded: true,
        },
        () => {
          let postListCopy = this.state.postList;
          // eslint-disable-next-line
          let promises = postListCopy.map((post) => {
            if (post.featured_media !== 0) {
              return wp.getImage(post.featured_media).then((imageWP) => {
                let dateFormatted = `${post.date.slice(8, 10)}.${post.date.slice(5, 7)}.${post.date.slice(0, 4)}`;
                post.date = dateFormatted;
                post.imageURL = imageWP;
                return post;
              });
            }
          });

          Promise.all(promises).then((postListCopy) => {
            this.setState({
              postList: postListCopy,
              hasImage: true,
            });
          });
        }
      );
    });
  }


  createMarkup(html) {
    return { __html: html };
  }

  render() {
    if (this.state.hasImage) {
      return (
        <div className="postList">
          {this.state.postList.map((post) => {
            return (
              <Link to={`/blog/${post.slug}`} key={post.id}>
                <div className="postCard">

                <div className="postImage">
                    <img src={post.imageURL} alt="" />
                  </div>
                  
                  <div className="postTitle">
                    <h3>{post.title.rendered}</h3>
                    <small>{post.date}</small>
                  </div>

                  <div
                    dangerouslySetInnerHTML={this.createMarkup(
                      post.excerpt.rendered
                    )}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      );
    } else {
      return "Loading...";
    }
  }
}

export default PostList;
