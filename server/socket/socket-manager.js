const socketIO = require('socket.io');
const data = require('../data/data');
let io;
const SocketManager = function SocketManager() {
};

SocketManager.listen = function listen(server, app, _cb) {
    io = socketIO(server, {
        log: true,
        enableOptions: false,
        // origins: '*'
        //origins: config.socketIoOrigins
    });

    io.on('connection', (socket) => {
        logger.info('Client connected');

        socket.on('request-notes', () => {
            logger.info('data requested');
            socket.emit('notes', {
                notes: data
            });
        });

        socket.on('update-note', note => {
            let index = data.findIndex(item => item.id === note.id);
            if (index === -1) {
                logger.warn('Note not found');
                socket.emit('warn', {
                    message: 'Note not found',
                    note: note
                });
                return;
            }
            data[index] = note;
            socket.emit('note-updated', note);
        });

        socket.on('delete-note', note => {
            let index = data.findIndex(item => item.id === note.id);
            if (index === -1) {
                logger.warn('Note not found');
                socket.emit('warn', {
                    message: 'Note not found',
                    note: note
                });
                return;
            }
            data.splice(index, 1);
            socket.emit('note-deleted', note);
        });

        socket.on('create-note', () => {
            let note = {
                id: data[data.length - 1].id + 1,
                note: '',
                bgColor: '#ffdc99'
            };
            data.push(note);
            socket.emit('note-created', note);
        });
    });
};

module.exports = SocketManager;
