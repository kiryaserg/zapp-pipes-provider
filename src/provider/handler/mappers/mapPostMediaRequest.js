import axios from 'axios';

export function mapPostMediaRequest(baseUrl) {
  return function(post) {
    return axios
      .get(`${baseUrl}/wp-json/wp/v2/media/${post.featured_media}`)
      .then(response => {
        if (
          response.status == 200 &&
          response.data &&
          response.data.media_details &&
          response.data.media_details.sizes &&
          response.data.media_details.sizes.thumbnail
        ) {
          return {
            id: response.data.id,
            image: response.data.media_details.sizes.thumbnail.source_url
          };
        } else {
          return { id: -1 };
        }
      });
  };
}
