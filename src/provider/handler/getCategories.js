import axios from 'axios';
import {mapCategory} from './mappers/categoryMapper';

export function getCategories() {
  return new Promise((resolve, reject) => {
    axios.get('http://demo.wp-api.org/wp-json/wp/v2/categories').then(response => {
      if (!response.data) {
        return reject('no data');
      }

      const result = {type:{value:'feed'}, entry:[]};
      if (response.data.length > 0) {
        result.entry = response.data.map(mapCategory);
      }
      resolve(result);
    });
  });
};
