import { commands } from './comands';

export const handler = (providerInterface) => (params) => {
  const { type, id } = params;

  return commands[type](params)
    .then(providerInterface.sendResponse)
    .catch(providerInterface.throwError);

};
