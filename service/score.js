const axios = require('axios')
const cheerio = require('cheerio')

const getScore = (url) => {
     return new Promise((resolve, reject) => {
        axios.get(url).then((response) => {
            const $ = cheerio.load(response.data)
            resolve($('body > div > div.miniprofile_gamesection.miniprofile_backdrop > div > span.rich_presence').text())
        })
     })
}

module.exports = getScore