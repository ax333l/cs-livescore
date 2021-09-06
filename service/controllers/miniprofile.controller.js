import { getSteamMiniProfile } from '../src/steamprofile.js'

export async function miniprofileController(req, res) {
    const link = req.query?.link
    if(!link) return { error: 'Link is not provided in request query' }
    try{
        const steamLink = await getSteamMiniProfile(link)
        return { link: steamLink }
    } catch(error) {
        return { error }
    }
}