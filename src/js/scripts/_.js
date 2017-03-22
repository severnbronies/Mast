class AppManager {
    constructor(socket) {
        this.socket = socket;
        this.apps = {};
    }

    add(app) {
        this.apps[app.getName()] = app;
        this.socket.on(app.getName(), (response) => {
            app.onData(response.command, response.data);
        });
    }

    getApp(name) {
        return this.apps[name];
    }
}

var apps = new AppManager(io('/stream'));
