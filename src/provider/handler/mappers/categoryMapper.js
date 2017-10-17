export function mapCategory(category) {
  let result = {
    type: {
      value: 'link'
    },
    media_group: [],
    extensions: {},
    content: {}
  };

  result.id = category.id;
  result.title = category.name;

  result.content = {
    type: 'atom',
    rel: 'self',
    src: `wordpress://fetchData?type=posts&categories=${result.id}`,
  };

  return result;
}
