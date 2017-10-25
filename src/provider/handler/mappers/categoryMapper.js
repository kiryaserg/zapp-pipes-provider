export function mapCategory(category) {
  return {
    type: {
      value: 'feed'
    },
    id: category.id,
    title: category.name,
    media_group: [],
    extensions: {},      
    content: {
      type: 'atom',
      rel: 'self',
      src: `wordpress://fetchData?type=posts&categories=${category.id}` //formatted url to retrieve this category's posts inside the Zapp app
    }
  };
}
