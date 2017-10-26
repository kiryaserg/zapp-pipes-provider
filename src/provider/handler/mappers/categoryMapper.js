export function mapCategory(category) {
  const { id, name: title } = category;
  return {
    type: {
      value: 'feed'
    },
    id,
    title,
    media_group: [],
    extensions: {},
    content: {
      type: 'atom',
      rel: 'self',
      src: `wordpress://fetchData?type=posts&categories=${id}` //formatted url to retrieve this category's posts inside the Zapp app
    }
  };
}
