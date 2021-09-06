import axios from 'axios'
import cheerio from 'cheerio'

/**
 * This function returns current game score by steam miniprofile link.
 * 
 * @param {string} url - Steam miniprofile link
 * @returns {Promise} Promise that resolved with array with 2 values standing for score.
 */
export function getScore (url) {
     return new Promise((resolve, reject) => {
        axios.get(url).then((response) => {
            const $ = cheerio.load(response.data)
            resolve($('body > div > div.miniprofile_gamesection.miniprofile_backdrop > div > span.rich_presence').text().replace(/^.*\[|\]/g, '').split(':').map(s => s.trim()))
        }).catch(e => reject(e));
     })
}