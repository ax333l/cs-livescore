import { getScore } from '../src/score.js'

export async function getScoreController(req, res) {
    const link = req.query?.link
    if(!link) return { error: 'Link is not provided in request query' }
    try{
        const score = await getScore(link)
        return { score }
    } catch(error) {
        return { error }
    }
}