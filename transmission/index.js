
const Transmission = require('transmission')

const transmission = new Transmission({
    port : 9091,
    host : '127.0.0.1',
    username: 'root',
    password: 'plasma'
});


async function postMagnetLink(magnet) {
   await transmission.addUrl(magnet, {
        "download-dir" : "/home/torrents"
    }, function(err, result) {
        if (err) {
            return console.log(err);
        }
        return result
    });
}

module.exports = postMagnetLink
