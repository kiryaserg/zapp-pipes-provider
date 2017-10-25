import axios from "axios";
import { mapPost } from "./mappers/postMapper";
import { mapPostMediaRequest } from "./mappers/mapPostMediaRequest";
import _url from "url";

export function getPosts(params) {
  const { url } = params;

  const aUrl = _url.parse(url);

  //make sure this is a valid wordpress category url
  if (
    !aUrl ||
    aUrl.path.indexOf("/category/") == -1 ||
    aUrl.path.split("/").length < 3
  ) {
    //return reject({message: 'malformed wordpress category page url',
    //              statusCode: 500});
    throw {
      message: "malformed wordpress category page url",
      statusCode: 500
    };
  }

  //get the category slug from the url
  let categorySlug = aUrl.path.split("/").pop();

  //save the baseUrl for the api calls
  const baseUrl = `${aUrl.protocol}//${aUrl.host}`;

  //call the wp-api categories endpoint to get the category id from our input slug
  return axios
    .get(`${baseUrl}/wp-json/wp/v2/categories?slug=${categorySlug}`)
    .then(response => {
      //throw an error if category doesn't exist
      if (!response.data || response.data.length == 0 || !response.data[0].id) {
        throw {
          message: `can't find category:${categorySlug}`,
          statusCode: 500
        };
      }

      const categoryId = response.data[0].id;

      //call the wp-api posts endpoint
      return axios.get(
        `${baseUrl}/wp-json/wp/v2/posts?categories=${categoryId}`
      );
    })
    .then(response => {
      if (!response.data) {
        throw {
          message: `can't find posts for category:${categorySlug}`
        };
      }

      //fetch all posts media items - since we need a separate call to get the full media item url
      return Promise.all(
        response.data.map(mapPostMediaRequest(baseUrl))
      ).then(mediaItems => {
        //finally map the posts, attach their respective media items and return a feed item
        return {
          type: {
            value: "feed"
          },
          entry: response.data.map(mapPost(mediaItems))
        };
      });
    });
}
