import { commands } from './comands';

export const handler = (providerInterface) => (params) => {
  const { type, id } = params;

  if (!type || ['collection', 'item'].indexOf(type) == -1) {
    return providerInterface.throwError('unknown request');
  }

  return commands[type](params)
    .then(providerInterface.sendResponse)
    .catch(providerInterface.throwError);

};