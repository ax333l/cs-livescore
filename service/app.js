import Fastify from 'fastify';
import { getSteamMiniProfile } from './src/steamprofile.js'
import { getScore } from './src/score.js'

const server = Fastify({logger: true})

server.get('/miniprofile', async (req, res) => {
    const link = req.query?.link
    if(!link) return { error: 'Link is not provided in request query' }
    try{
        const steamLink = await getSteamMiniProfile(link)
        return { link: steamLink }
    } catch(error) {
        return { error }
    }
})

server.get('/score', async (req, res) => {
    const link = req.query?.link
    if(!link) return { error: 'Link is not provided in request query' }
    try{
        const score = await getScore(link)
        return { score }
    } catch(error) {
        return { error }
    }
})

const start = async () => {
    try {
        await server.listen(process.env.PORT || 3000)

        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port
        server.log.info(`Server started at the port: ${port}`)

    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()