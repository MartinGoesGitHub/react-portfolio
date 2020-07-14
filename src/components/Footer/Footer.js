import React, { Component } from "react";
import { Link } from "react-router-dom";
import wp from "../../util/wp";
import './Footer.css'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      pagesLoaded: false,
    };
  }

  componentDidMount() {
    wp.getFooterMenu().then((menu) => {
      this.setState({
        menu: menu,
        pagesLoaded: true,
      });
    });
  }

  render() {
    if (this.state.pagesLoaded) {
      return (
        <div className="footer">
          <ul>
            {this.state.menu.map((menu) => {
              return (
                <Link to={`/${menu.slug}`} key={menu.id}>
                  {menu.title}
                </Link>
              );
            })}
          </ul>
          <div className="copyright">© Martin_Codes 2020</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Footer;
