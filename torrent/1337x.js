const cheerio = require('cheerio');
const logger = require('pino')()

const axios = require('axios');




async function torrent1337x(query = '', page = '1') {
    logger.info(`Query to 1337x`)

    const allTorrent = [];
    let html;
    const url = 'https://1337xx.to/search/' + query + '/' + page + '/';
    try{
        html = await axios.get(url);
    }catch{
        return null;
    }

    const $ = cheerio.load(html.data)

    const links = $('td.name').map((_, element) => {
        var link = 'https://1337xx.to' + $(element).find('a').next().attr('href');
        return link;
    }).get();


    await Promise.all(links.map(async (element) => {

        const data = {};
        const labels = ['Category', 'Type', 'Language', 'Size', 'UploadedBy', 'Downloads', 'LastChecked', 'DateUploaded', 'Seeders', 'Leechers'];
        let html;
        try{
            html = await axios.get(element);
        }catch{
            return null;
        }

        const $ = cheerio.load(html.data);
        data.Name = $('.box-info-heading h1').text().trim();
        data.Magnet = $('div .clearfix ul .dropdown ul').children('li').last().children('a').attr('href')
        data.Category = $('div .clearfix .list li span').first().text()
        data.Provider = '1337x'
        const poster = $('div.torrent-image img').attr('src');
        
        if (typeof poster !== 'undefined') {
            if (poster.startsWith('http')){
                data.Poster = poster;
            }
            else{
                data.Poster = 'https:' + poster;
            }
        } else {
            data.Poster = ''
        }

        $('div .clearfix ul li > span').each((i, element) => {
            $list = $(element);
            data[labels[i]] = $list.text();
        })

        data.Url = element
        if (!data.Name.includes('1337x Domains')) {
            allTorrent.push(data)
        }
    }))

    logger.info(`Find on 1337x ${allTorrent.length} torrents`)

    return allTorrent.sort((a, b) => b.Seeders - a.Seeders)
}
module.exports = {
    torrent1337x: torrent1337x
}