export function mapPost(post) {
  let result = {
    type: {
      value: 'article'
    },
    media_group: [],
    extensions: {},
    content: {},
    link: {}
  };

  result.id = post.id;
  result.title = (post.title && post.title.rendered)?post.title.rendered:'';
  result.publish = post.date;

  //the post's link that will be used when a user shares the post
  result.link = {
    type: 'text/html',
    rel: 'alternate',
    href: post.link
  };

  //article's media id, to be fetched later
  if (post.featured_media) {
    result.extensions.featured_media = post.featured_media;
  }

  //adding the post's content as an escaped string
  if (post.content.rendered) {
    result.content = {
      html: encodeURIComponent(post.content.rendered)
    };
  }

  return result;
}
