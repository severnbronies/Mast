var expressNunjucks = require('express-nunjucks');

class WebFront {
    constructor(settings, expressApp) {
        this.app = expressApp;
        this.app.set('view engine', 'njk')
        this.app.set('views', settings.web.srcDir);
        this.njk = expressNunjucks(this.app, {});

        this.setupRoutes();
    }

    setupRoutes() {
        this.app.get('/', (req, res) => {this._index(req, res);});
        this.app.get('/stream', (req, res) => {this._stream(req, res);});
    }

    _index(req, res) {
        res.render('index');
    }

    _stream(req, res) {
        res.render('stream.njk');
    }
}

module.exports = WebFront;
