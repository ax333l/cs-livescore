import Fastify from 'fastify';
import { miniprofileController } from './controllers/miniprofile.controller.js'
import { getScoreController } from './controllers/score.controller.js'

const server = Fastify({logger: true})

server.get('/miniprofile', miniprofileController)

server.get('/score', getScoreController)

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