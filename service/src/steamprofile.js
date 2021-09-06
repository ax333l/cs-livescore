import axios from 'axios'
import cheerio from 'cheerio'

/**
 * This function returns steam miniprofile URL
 * by default steam profile URL
 * 
 * @param {string} url - Steam profile URL
 * @returns {Promise} Promise resolved with steam miniprofile URL
 */
export function getSteamMiniProfile(url){
    return new Promise(async (resolve, reject) => {
        if(!/steamcommunity.com/.test(url)) {
            reject('Wrong link')
        }
        axios.get(url).then((response) => {
            const $ = cheerio.load(response.data)
            $('div[class]').map((index, element) => {
                if(element.attribs['data-miniprofile']) {
                    resolve(element.attribs['data-miniprofile'])
                }
            })
        }).catch(err => reject(err))
    })
}
