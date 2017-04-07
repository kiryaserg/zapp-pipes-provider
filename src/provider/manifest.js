export const manifest = {
  handlers: ['collection', 'item'],
  help: {
    collection: {
      description: 'retrieves a collection or a list of collection',
      params: {
        id: 'optional. if provided, will return that specific collection. Will return all collections if ommited',
      }
    },
    item: {
      description: 'retrieves the item with the given id',
      params: {
        id: 'required. id of the requested item',
      },
    },
  }
};
