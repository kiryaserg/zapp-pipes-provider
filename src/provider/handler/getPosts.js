import axios from 'axios';
import {mapPost} from './mappers/postMapper';

export function getPosts(params) {
  const {url, categories} = params;  
  return new Promise((resolve, reject) => {

    if (!categories) {
      return reject({message: 'must enter at least one category id', statusCode: 500});
    }

    //call the WP-API posts endpoint
    axios.get(`${url}/wp-json/wp/v2/posts?categories=${categories}`).then(response => {
      if (!response.data) {
        return reject('no data');
      }

      //map the returned data to match Zapp app requirements
      const result = {type:{value:'feed'}, entry:[]};
      if (response.data.length > 0) {
        result.entry = response.data.map(mapPost);
      }

      //fetch all the media items using the WP-API media endpoint
      let mediaPromises = [];
      result.entry.forEach(result=>{
        if (result.featured_media) {
          mediaPromises.push(axios.get(`${url}/wp-json/wp/v2/media/${result.featured_media}`));
        }
      });

      if (mediaPromises.length > 0) {
        axios.all(mediaPromises).then(responses => {
          //add each media item to its respective post object
          responses.forEach(response => {
            if (response.status == 200) {
              if (response.data &&
                  response.data.media_details &&
                  response.data.media_details.sizes &&
                  response.data.media_details.sizes.thumbnail) {

                  for (let i = 0; i < result.entry.length; i++) {
                    if (result.entry[i].featured_media == response.data.id) {
                      result.entry[i].media_group.push({
                        type: 'image',
                        media_item: [{
                          src: response.data.media_details.sizes.thumbnail.source_url,
                          key: 'image_base',
                        }],
                      });

                      //let's remove this property now that we don't need it
                      delete(result.entry[i].featured_media);

                      break;
                    }
                  }
              }
            }
          });
          resolve(result);
        });
      } else {
        resolve(result);
      }
    }).catch(error => {
      reject(error);
    });
  });
};
