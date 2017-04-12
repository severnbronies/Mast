var session = require('express-session');
var MemoryStore = require('session-memory-store')(session);
var expressNunjucks = require('express-nunjucks');

class WebFront {
    constructor(settings, expressApp) {
        this.app = expressApp;
        this.app.set('view engine', 'njk');
        this.app.set('views', settings.web.templateDir);
        this.njk = expressNunjucks(this.app, {});

        this.app.use(session({
            secret: settings.session.secret,
            resave: false,
            saveUninitialized: false,
            store: new MemoryStore({
                expires: settings.session.expires
            })
        }));

        this.setupRoutes();
    }

    setupRoutes() {
        this.app.get('/', (req, res) => {this._index(req, res);});
        this.app.get('/stream', (req, res) => {this._stream(req, res);});
    }

    _stream(req, res) {
        res.render('pages/stream.njk');
    }
}

module.exports = WebFront;
