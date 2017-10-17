export const manifest = {
  handlers: ['categories', 'posts'],
  help: {
    categories: {
      description: 'retrieves a list of available categories',
    },
    posts: {
      description: 'retrieves a list of posts related to a specific category',
      params: {
        categories: 'comma separated category id',
      },
    },
  }
};
