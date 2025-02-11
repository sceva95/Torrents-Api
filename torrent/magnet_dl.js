const cheerio = require('cheerio')
const axios = require('axios')
const logger = require('pino')()

async function magnet_dl(query, page) {
    var ALLTORRENT = [];

    const url = 'https://magnetdl.abcproxy.org/' + query[0] + '/' + query.split(' ').join('-') + '/se/desc/' + page + '/'

    let html;
    try {
        html = await axios.get(url, headers = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Mobile Safari/537.36"
        });

    } catch {
        return null;
    }

    const $ = cheerio.load(html.data);

    $('.download tbody tr').each((_, element) => {


        let torrent = {
            'Name': $(element).find('td').eq(1).find('a').text().trim(),
            'Size': $(element).find('td').eq(5).text(),
            'DateUploaded': $(element).find('td').eq(2).text(),
            'Category': $(element).find('td').eq(3).text(),
            'Seeders': $(element).find('td').eq(6).text(),
            'Leechers': $(element).find('td').eq(7).text(),
            'Url': "https://www.magnetdl.com" + $(element).find('td').eq(1).find('a').attr('href'),
            'Magnet': $(element).find('td').eq(0).find('a').attr('href'),
            "Provider":"magnet_dl"
        }
        if (torrent.Name !== '') {
            ALLTORRENT.push(torrent);
        }
    })

    logger.info(`Find on magnetdl ${ALLTORRENT.length} torrents`)

    return ALLTORRENT;
}

module.exports = magnet_dl
