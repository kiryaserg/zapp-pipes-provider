export function mapPost(mediaItems) {
  return function(post) {
    const {
      id,
      date: publish,
      link,
      title: { rendered: title },
      content: { rendered: html }
    } = post;

    //if we can find the post's media id then let's add its url to our media_group
    const media_group = mediaItems.find(mediaItem => {
      if (mediaItem && mediaItem.id === post.featured_media) {
        const { image: src } = mediaItem;
        return [
          {
            type: 'image',
            media_item: [
              {
                src,
                key: 'image_base'
              }
            ]
          }
        ];
      }
    });

    return {
      type: {
        value: 'article'
      },
      id,
      title,
      publish,
      media_group,
      content: { html },
      link: {
        type: 'text/html',
        rel: 'alternate',
        href: link //the post's link that will be used when a user shares the post
      }
    };
  };
}
