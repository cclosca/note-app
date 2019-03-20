const config = require('./config/config');
const express  = require('express');

global.logger = require('winston-logger')({ console: true});

const app = express();
const http = require('http');

const httpServer = http.createServer(app);

require('strict-mode')(() => {
    const socketManager = require('./socket/socket-manager');

    socketManager.listen(httpServer, app, (io) => {
        logger.info('SocketIo -> started!');
    });
    httpServer.listen(config.appPort, () => {
        logger.info(`Server started on port ${config.appPort}!`);
    });
});
