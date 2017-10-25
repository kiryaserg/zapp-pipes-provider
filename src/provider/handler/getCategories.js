import axios from "axios";
import { mapCategory } from "./mappers/categoryMapper";

export function getCategories(params) {
  const { url } = params;
  //call the wp-api categories endpoint
  return axios.get(`${url}/wp-json/wp/v2/categories`).then(response => {
    //throw error if returned data is not good
    if (!response.data || response.data.length === 0) {
      throw { message: "no data", statusCode: 500 };
    }

    //map the returned data to match Zapp app requirements
    return { type: { value: "feed" }, entry: response.data.map(mapCategory) };
  });
}
