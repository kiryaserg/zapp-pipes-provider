export function mapPost(mediaItems) {
  return function(post) {
    const result = {
      type: {
        value: 'article'
      },
      id: post.id,
      title: post.title && post.title.rendered ? post.title.rendered : '',
      publish: post.date,
      media_group: [],
      extensions: {},
      content: {},
      link: {}
    };

    //the post's link that will be used when a user shares the post
    result.link = {
      type: 'text/html',
      rel: 'alternate',
      href: post.link
    };

    //if we can find the post's media id then let's add it's url to our media_group
    mediaItems.forEach(mediaItem => {
      if (
        mediaItem.id === post.featured_media &&
        result.media_group.length === 0
      ) {
        result.media_group.push({
          type: 'image',
          media_item: [
            {
              src: mediaItem.image,
              key: 'image_base'
            }
          ]
        });
      }
    });

    //adding the post's content as an escaped string
    if (post.content.rendered) {
      result.content = {
        html: encodeURIComponent(post.content.rendered)
      };
    }

    return result;
  };
}
