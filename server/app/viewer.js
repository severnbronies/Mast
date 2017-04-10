"use strict";

var ApplicationBase = require('./base');

class Viewer extends ApplicationBase {
    constructor(socketio) {
        super('viewer', socketio);
        this.url = null;
    }

    initializeViewer(socket) {
        this.send('url', this.url, socket);
    }

    setUrl(url) {
        this.url = url;
        console.log('Setting viewer url=' + url);
        this.send('url', this.url);
    }
}

module.exports = Viewer;
