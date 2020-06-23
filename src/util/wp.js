
const wp = {

  getPages() {
    return fetch("wp-json/wp/v2/pages")
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse) {
          return jsonResponse
        }
      });
  },

  getSpecificPage(slug) {
    return fetch(`/wp-json/wp/v2/pages?slug=${slug}`)
    .then(response => {
      return response.json()
    })
    .then((jsonResponse) => {
      if(jsonResponse) {
        return jsonResponse
      }
    })
  }
};

export default wp;
