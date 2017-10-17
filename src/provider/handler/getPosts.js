import axios from 'axios';
import {mapPost} from './mappers/postMapper';

export function getPosts(params) {
  const {categories} = params;
  return new Promise((resolve, reject) => {
    axios.get(`http://demo.wp-api.org/wp-json/wp/v2/posts?categories=${categories}`).then(response => {
      if (!response.data) {
        return reject('no data');
      }

      const result = {type:{value:'feed'}, entry:[]};
      if (response.data.length > 0) {
        result.entry = response.data.map(mapPost);
      }

      let mediaPromises = [];
      result.entry.forEach(post=>{
        if (post.extensions.featured_media) {
          mediaPromises.push(axios.get(`https://demo.wp-api.org/wp-json/wp/v2/media/${post.extensions.featured_media}`));
        }
      });

      if (mediaPromises.length > 0) {
        axios.all(mediaPromises).then(responses => {
          responses.forEach(response => {
            if (response.status == 200) {
              if (response.data &&
                  response.data.media_details &&
                  response.data.media_details.sizes &&
                  response.data.media_details.sizes.thumbnail) {

                  for (let i = 0; i < result.entry.length; i++) {
                    if (result.entry[i].extensions.featured_media == response.data.id) {
                      result.entry[i].media_group.push({
                        type: 'image',
                        media_item: [{
                          src: response.data.media_details.sizes.thumbnail.source_url,
                          key: 'image_base',
                        }],
                      });
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
    });
  });
};
