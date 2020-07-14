import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import wp from "../../util/wp";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      pagesLoaded: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    wp.getPrimaryMenu().then((menu) => {
      this.setState({
        menu: menu,
        pagesLoaded: true,
      });
    });
  }

  handleClick() {
    if (window.screen.width < 768) {
      document.getElementById("close").click();
    }
  }

  render() {
    if (this.state.pagesLoaded) {
      return (
        <div className="header">
          <Link to="/" onClick={this.handleClick}>
            <img
              className="logo"
              src="http://localhost/wordpress/wp-content/uploads/2020/07/LogoMakr_26wlzP-300x85.png"
              alt="Logo"
            />
          </Link>
          
          {/* eslint-disable-next-line */}
          <a href="#nav-m" id="nav-m">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </a>

          {/* eslint-disable-next-line */}
          <a href="#" id="close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </a>

          <ul className="links" id="links">
            {this.state.menu.map((menu) => {
              return (
                <Link
                  to={`/${menu.slug}`}
                  key={menu.id}
                  onClick={this.handleClick}
                >
                  {menu.title}
                </Link>
              );
            })}
            <Link to={"/blog"} onClick={this.handleClick}>
              Blog
            </Link>
          </ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Header;
