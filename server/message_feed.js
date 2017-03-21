"use strict";

var ApplicationBase = require('./application_base');

class MessageFeed extends ApplicationBase {
    constructor(socketio) {
        super('messagefeed', socketio);
        this.messages = [];
    }

    initializeViewer(socket) {
        this.send('messages', this.messages, socket);
    }

    newMessage(message) {
        this.messages.push(message);
        console.log(message);
        this.send('message', message);
    }
}

module.exports = MessageFeed;
