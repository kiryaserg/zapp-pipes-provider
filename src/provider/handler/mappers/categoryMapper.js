export function mapCategory(category) {
  let result = {
    type: {
      value: 'feed'
    },
    media_group: [],
    extensions: {},
    content: {}
  };

  result.id = category.id;
  result.title = category.name;

  //formatted url to retrieve this category's posts inside the Zapp app
  result.content = {
    type: 'atom',
    rel: 'self',
    src: `wordpress://fetchData?type=posts&categories=${result.id}`,
  };

  return result;
}
