export function mapPost(post) {
  let result = {
    type: {
      value: 'link'
    },
    media_group: [],
    extensions: {},
    content: {}
  };

  result.id = post.id;
  result.title = (post.title && post.title.rendered)?post.title.rendered:'';

  if (post.featured_media) {
    result.extensions.featured_media = post.featured_media;
  }

  if (post.link) {
    result.content = {
      type: 'atom',
      rel: 'self',
      src: post.link,
    };
  }

  return result;
}
