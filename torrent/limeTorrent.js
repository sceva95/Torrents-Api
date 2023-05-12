const cheerio = require('cheerio')
const axios = require('axios')
const logger = require('pino')()

async function limeTorrent(query, page = '1') {
    var ALLTORRENT = [];
    const baseUrl = 'https://www.limetorrents.pro'
    const url = `${baseUrl}/search/all/${query}/seeds/${page}/`;
    let html;
    try {
        html = await axios.get(url, headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
        });

    } catch {
        return null;
    }

    const $ = cheerio.load(html.data);

    $('.table2 tbody tr').each(async (i, element) => {
        if (i > 0) {
            let category_and_age = $(element).find('td').eq(1).text().trim();
            category_and_age = category_and_age.split('-');
            let age = category_and_age[0].trim();
            let category = category_and_age[1].replace('in', '').trim();
            let torrent = {
                "Name": $(element).find('div.tt-name').text().trim(),
                "Size": $(element).find('td').eq(2).text().trim(),
                "Category": category,
                "Age": age,
                "Seeders": $(element).find('td').eq(3).text().trim(),
                "Leechers": $(element).find('td').eq(4).text().trim(),
                "Torrent": $(element).find('div.tt-name a').attr('href'),
                "Url": "https://www.limetorrents.pro" + $(element).find('div.tt-name a').next().attr('href'),
                "Provider":"limetorrent"
            }
            const link = $(element).find('div.tt-name a:nth-child(2)').attr('href');

            console.log(link)
            let html;
            try{
                html = await axios.get(link);
            }catch{
                logget.info(`Limetorrent: Error getting link for ${query}`)
            }

                const $ = cheerio.load(html.data);

                $('.torrentinfo .downloadarea').map((_, element) => {
                    const el = $(element).find('a').attr('href')
                    torrent.Magnet = el
                })
            ALLTORRENT.push(torrent);
        }

    })
    logger.info(`Find on limetorrent ${ALLTORRENT.length} torrents`)

    return ALLTORRENT;

}
module.exports = limeTorrent
