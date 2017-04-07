
export function getCollection(params) {
  const { id } = params;

  if (id) {
    return Promise.resolve({ collection: {}, id });
  }

  return Promise.resolve({
    collections: ['array', 'of', 'collections'],
  });

};
