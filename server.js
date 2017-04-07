
const zappPipesDevKit = require('@applicaster/zapp-pipes-dev-kit');
const provider = require('./src').provider;

const zappPipesServer = zappPipesDevKit.createZappPipesServer({ providers: [provider] });
zappPipesServer.startServer();