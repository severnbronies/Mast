"use strict";

class ApplicationBase {
    constructor(name, socketio) {
        this._socketio = socketio;
        this._name = name;
        socketio.on('connection', (socket) => {
            this.initializeViewer(socket);
        });
    }

    /**
     * Override to initialise a new viewer.
     * @param {socket} socket - socket.io socket of the new viewer
     */
    initializeViewer(socket) {}

    /**
     * Sends data to all clients unless a particualr socket is specified.
     * @param {object} data - Data to send.
     * @param {socket} [socket] - Socket to send to (optional).
     */
    send(command, data, socket) {
        var packet = {
            command: command,
            data: data
        };
        if(typeof socket === "undefined") {
            this._socketio.emit(this._name, packet);
        }else{
            socket.emit(this._name, packet);
        }
    }
}

module.exports = ApplicationBase;
