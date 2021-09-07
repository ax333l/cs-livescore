import Fastify from 'fastify';
import { miniprofileController } from './controllers/miniprofile.controller.js'
import { getScoreController } from './controllers/score.controller.js'

const server = Fastify({logger: true})

server.get('/miniprofile', miniprofileController)

server.get('/score', getScoreController);

const start = async () => {
    try {
        await server.listen(process.env.PORT || 3001, '0.0.0.0');
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()