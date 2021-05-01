const axios = require('axios');
const cheerio = require('cheerio');

const getSteamMiniProfile = (url) => {
    return new Promise(async (resolve, reject) => {
        if(!/steamcommunity.com/.test(url)) {
            reject('Link error')
        }
        axios.get(url).then((response) => {
            const $ = cheerio.load(response.data)
            $('div[class]').map((index, element) => {
                if(element.attribs['data-miniprofile']) {
                    resolve(element.attribs['data-miniprofile'])
                }
            })
        })
    })
}

module.exports = getSteamMiniProfile;