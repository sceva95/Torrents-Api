const cheerio = require('cheerio')
const axios = require('axios')


async function rarbg(query, page = '1') {
    const ALLURLARRAY = [];
    var ALLTORRENT = [];
    const url = "https://www.proxyrarbg.org/torrents.php?search=" + query + '&page=' + page;

    let html;
    try {
        html = await axios.get(url, headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
        });

    } catch {
        return null;
    }

    const $ = cheerio.load(html.data);

    $('table.lista2t tbody').each((_, element) => {
        $('tr.lista2').each((_, el) => {
            const data = {};
            const td = $(el).children('td');
            data.Name = $(td).eq(1).find('a').attr('title');
            data.DateUploaded = $(td).eq(2).text();
            data.Size = $(td).eq(3).text();
            data.Seeders = $(td).eq(4).text();
            data.Leechers = $(td).eq(5).text();
            data.UploadedBy = $(td).eq(8).text();
            data.Url = "https://www.proxyrarbg.org" + $(td).eq(1).find('a').attr('href');
            data.Provider = 'rarbg'
            ALLURLARRAY.push(data.Url);
            ALLTORRENT.push(data);
        })
    });

    await Promise.all(ALLURLARRAY.map(async (url) => {
        for (let i = 0; i < ALLTORRENT.length; i++) {
            if (ALLTORRENT[i]['Url'] === url) {
                let html;
                try{
                    html = await axios.get(url, headers = {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
                    });
                }catch{
                    return null;
                }
                
                let $ = cheerio.load(html.data);

                let poster = "https://rargb.to" + $("tr:nth-child(4) > td:nth-child(2) > img:nth-child(1)").attr('src') || "";
                if (!poster.endsWith('undefined')) {
                    ALLTORRENT[i].Poster = poster;
                } else {
                    ALLTORRENT[i].Poster = "";
                }
                ALLTORRENT[i].Magnet = $("tr:nth-child(1) > td:nth-child(2) > a:nth-child(3)").attr('href');
            }
        }

    }))
    return ALLTORRENT.sort((a, b) => b.Seeders - a.Seeders);
}
module.exports = rarbg;