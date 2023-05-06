const express = require('express');
const logger = require('pino')()
const scrap1337x = require('./torrent/1337x');
const scrapNyaa = require('./torrent/nyaaSI');
const scrapYts = require('./torrent/yts');
const scrapPirateBay = require('./torrent/pirateBay');
const scrapTorLock = require('./torrent/torLock');
const scrapEzTVio = require('./torrent/ezTV');
const torrentGalaxy = require('./torrent/torrentGalaxy');
const combo = require('./torrent/COMBO');
const rarbg = require('./torrent/rarbg');
const ettvCentral = require('./torrent/ettv');
const zooqle = require('./torrent/zooqle');
const kickAss = require('./torrent/kickAss');
const bitSearch = require('./torrent/bitSearch');
const glodls = require('./torrent/gloTorrents');
const magnet_dl = require('./torrent/magnet_dl');
const limeTorrent = require('./torrent/limeTorrent');
const torrentFunk = require('./torrent/torrentFunk');
const torrentProject = require('./torrent/torrentProject');
const postMagnetLink = require('./transmission')
const bodyParser = require("body-parser");

const app = express();

var jsonParser = bodyParser.json()

app.post('/api/magnet/', jsonParser, async (req, res) => {
    const magnet = req.body.magnet

    const response = await postMagnetLink(magnet)

    logger.info(`Sended to magnet: ${response}`)

    res.send(response)
});

app.get('/api/:website/:query/:page?', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let website = (req.params.website).toLowerCase();
    let query = req.params.query;
    let page = req.params.page;
    logger.info(`Websitet: ${website}, Query: ${query}, Page: ${page}`)
    if (website === '1337x') {
            scrap1337x.torrent1337x(query, page)
                .then((data) => {
                    if (data === null) {
                        return res.status(400).json({
                            error: 'Website is blocked change IP'
                        })

                    } else if (data.length === 0) {
                        return res.json({
                            error: 'No search result available for query (' + query + ')'
                        })
                    } else {
                        return res.send(data);
                    }

                })
    }
    if (website === 'yts') {
        scrapYts.yts(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }

            })
    }
    if (website === 'eztv') {
        scrapEzTVio.ezTV(query)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }

            })
    }
    if (website === 'torlock') {
        scrapTorLock.torLock(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }

            })
    }
    if (website === 'piratebay') {
        scrapPirateBay.pirateBay(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }

            })
    }
    if (website === 'tgx') {
        torrentGalaxy(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }

            })
    }

    if (website === 'rarbg') {
        rarbg(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }

            })
    }


    if (website === 'zooqle') {
        zooqle.zooqle(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }
            })
    }

    if (website === 'kickass') {
        kickAss(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }
            })
    }


    if (website === 'bitsearch') {
        bitSearch(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }
            })
    }
    if (website === 'glodls') {
        glodls(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }
            })
    }
    if (website === 'magnetdl') {
        magnet_dl(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }
            })
    }
    if (website === 'limetorrent') {
        limeTorrent(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }
            })
    }
    if (website === 'torrentfunk') {
        torrentFunk(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }
            })
    }
    if (website === 'torrentproject') {
        torrentProject(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }
            })
    }

    if (website === 'nyaasi') {
        if (page > 14) {
            return res.json({
                error: '14 is the last page'
            })
        } else {
            scrapNyaa.nyaaSI(query, page)
                .then((data) => {
                    if (data === null) {
                        return res.json({
                            error: 'Website is blocked change IP'
                        })

                    } else if (data.length === 0) {
                        return res.json({
                            error: 'No search result available for query (' + query + ')'
                        })
                    } else {
                        return res.send(data);
                    }

                })
        }

    }
    if (website === "ettv") {
        ettvCentral(query, page)
            .then((data) => {
                if (data === null) {
                    return  res.status(400).json({
                        error: 'Website is blocked change IP'
                    })

                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }

            })

    }
    if (website === "all") {
        combo(query, page).then((data) => {
            if (data !== null && data.length > 0) {
                return res.send(data);
            } else {
                return res.json({
                    error: 'No search result available for query (' + query + ')'
                });
            }
        })

    } else if (website !== 'nyaasi' && website !== '1337x' && website !== 'yts' && website !== 'piratebay' && website !== 'torlock' && website !== 'eztv' && website !== 'tgx' && website !== 'all' && website !== "rarbg" && website !== 'ettv' && website !== 'zooqle' && website !== 'kickass' && website !== 'bitsearch' && website !== 'glodls' && website !== 'magnetdl' && website !== 'limetorrent' && website !== 'torrentfunk' && website !== 'torrentproject') {
        return res.json({
            error: 'please select 1337x | nyaasi | yts | Piratebay | torlock | eztv | TorrentGalaxy(tgx) | rarbg | zooqle | kickass | bitsearch | glodls | magnetdl | limetorrent | torrentfunk | torrentproject | all (to scrap from every site)'
        })
    }

});

app.get('/', (req, res) => {
    res.send('<h1>Welcome to 1337x, NyaaSi, YTS, PirateBay, Torlock, EzTvio, TorrentGalaxy, Rarbg, Zooqle, KickAss, Bitsearch, Glodls, MagnetDL, Limetorrent, TorrentFunk, TorrentProject and Ettv Central Unoffical API</h1>');
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
const PORT = process.env.PORT || 8080;
logger.info(`Listening on PORT: ${PORT}`)

app.listen(PORT);