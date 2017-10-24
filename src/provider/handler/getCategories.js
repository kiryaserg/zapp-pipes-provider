import axios from 'axios';
import {mapCategory} from './mappers/categoryMapper';

export function getCategories(params) {
  const {url} = params;
  return new Promise((resolve, reject) => {
    //call the WP-API categories endpoint
    axios.get(`${url}/wp-json/wp/v2/categories`).then(response => {
      if (!response.data) {
        return reject('no data');
      }

      //map the returned data to match Zapp app requirements      
      const result = {type:{value:'feed'}, entry:[]};
      if (response.data.length > 0) {
        result.entry = response.data.map(mapCategory);
      }
      resolve(result);
    }).catch(error=>{
      reject(error);
    });
  });
};
