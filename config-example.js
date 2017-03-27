// Rename to config.js when in use
const path = require('path');


module.exports = {
    port: 9001,
    twitter: {
        searchArchive: "\"severn bronies\" OR severnbronies OR 6severn",
        searchLive: "severn bronies,severnbronies,6severn",
        id: 730239216, // @severnbronies
        accessKey: "YOUR ACCESS KEY HERE",
        accessSecret: "YOUR ACCESS SECRET HERE",
        consumerKey: "YOUR CONSUMER KEY HERE",
        consumerSecret: "YOUR CONSUMER SECRET HERE"
    },
    session: {
        secret: "SESSION COOKIE SECRET HERE",
        expires: 60*60*12
    },
    web: {
        staticDir: path.join(__dirname, 'dst'),
        srcDir: path.join(__dirname, 'src')
    }
}
