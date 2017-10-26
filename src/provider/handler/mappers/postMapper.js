export function mapPost(mediaItems) {
  return function(post) {
    const { id, date: publish, link, title } = post;

    //if we can find the post's media id then let's add its url to our media_group
    const media_group = mediaItems.reduce((result, mediaItem) => {
      if (
        mediaItem &&
        mediaItem.id === post.featured_media &&
        result.length === 0
      ) {
        return [
          {
            type: 'image',
            media_item: [
              {
                src: mediaItem.image,
                key: 'image_base'
              }
            ]
          }
        ];
      }
      return result;
    }, []);

    //adding the post's html content
    const content = post.content.rendered
      ? {
          html: post.content.rendered
        }
      : null;

    return {
      type: {
        value: 'article'
      },
      id,
      title: title.rendered,
      publish,
      media_group,
      content,
      link: {
        type: 'text/html',
        rel: 'alternate',
        href: post.link //the post's link that will be used when a user shares the post
      }
    };
  };
}
