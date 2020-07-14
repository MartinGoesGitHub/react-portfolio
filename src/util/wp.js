const wp = {
  getPrimaryMenu() {
    return new Promise((resolve, reject) => {
      return fetch("wp-json/wp/v2/nav_menu_item")
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          if (jsonResponse) {
            // "menu-1" is the specific name of the theme's menu location for the
            //primary menu. The name can differ from theme to theme.
            //You get the names and all menus by the "wp-json/wp/v2/nav_menu_item"
            //endpoint (if you added the function to the functions.php file as written in the README)
            let promises = jsonResponse["menu-1"].map((pageMenu) => {
              let menu = {
                id: pageMenu.object_id,
              };
              return fetch(`wp-json/wp/v2/pages/${pageMenu.object_id}`)
                .then((response) => {
                  return response.json();
                })
                .then((jsonResponse) => {
                  menu.title = jsonResponse.title.rendered;
                  menu.slug = jsonResponse.slug;
                  return menu;
                })
                .catch((err) => {
                  console.log(err);
                });
            });
            Promise.all(promises).then((values) => {
              resolve(values);
            });
          }
        });
    });
  },

  getFooterMenu() {
    return new Promise((resolve, reject) => {
      return fetch("wp-json/wp/v2/nav_menu_item")
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          if (jsonResponse) {
            // "footer" is the specific name of the theme's menu location for the
            //primary menu. The name can differ from theme to theme.
            //You get the names and all menus by the "wp-json/wp/v2/nav_menu_item"
            //endpoint (if you added the function to the functions.php file as written in the README)
            let promises = jsonResponse["footer"].map((pageMenu) => {
              let menu = {
                id: pageMenu.object_id,
              };
              return fetch(`wp-json/wp/v2/pages/${pageMenu.object_id}`)
                .then((response) => {
                  return response.json();
                })
                .then((jsonResponse) => {
                  menu.title = jsonResponse.title.rendered;
                  menu.slug = jsonResponse.slug;
                  return menu;
                })
                .catch((err) => {
                  console.log(err);
                });
            });
            Promise.all(promises).then((values) => {
              resolve(values);
            });
          }
        });
    });
  },

  getPageData(slug) {
    return fetch(`/wp-json/wp/v2/pages?slug=${slug}`)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse) {
          let formatted = jsonResponse;
          if (formatted[0] !== undefined) {
            formatted[0].image =
              "https://wolper.com.au/wp-content/uploads/2017/10/image-placeholder.jpg";

            // if (formatted[0]._links["wp:featuredmedia"]) {
            //   fetch(formatted[0]._links["wp:featuredmedia"][0].href)
            //     .then((response) => {
            //       return response.json();
            //     })
            //     .then((jsonResponse) => {
            //       formatted[0].image = jsonResponse.guid.rendered;
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //     });
            // }
          }
          return formatted;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getImage(mediaId) {
    return fetch(`http://localhost/wordpress/wp-json/wp/v2/media/${mediaId}`)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse) {
          let imageURL = jsonResponse.guid.rendered;
          return imageURL
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getPostList() {
    return fetch("/wp-json/wp/v2/posts")
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse) {
          return jsonResponse;
        }
      });
  },

  getPostData(slug) {
    return fetch(`/wp-json/wp/v2/posts?slug=${slug}`)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse) {
          return jsonResponse;
        }
      });
  },

  getAuthor(id) {
    return fetch(`/wp-json/wp/v2/users/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse) {
          let author = {
            name: jsonResponse.name,
            avatar: jsonResponse.avatar_urls[48],
          }
          return author;
        }
      });
  },
};

export default wp;
