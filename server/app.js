import Fastify from 'fastify';
import { request } from 'undici';
import cors from 'fastify-cors';
  
const server = Fastify({logger: true})

server.register(cors, { 
    origin: (origin, cb) => {
        cb(null, true)
        return
    }
})

server.get('/miniprofile', async (req, res) => {
    try{
        let {
            body
        } = await request(`http://service:3001/miniprofile?link=${req.query?.link}`, {
            connections: 128,
            pipelining: 1,
            keepAliveTimeout: 60 * 1000,
            tls: {
                rejectUnauthorized: false
            }
        })
        body = await body.json()
        return { body }
    } catch(error ) {
        return { error }
    }
})

server.get('/score', async (req, res) => {
    try{
        let {
            body
        } = await request(`http://service:3001/score?link=${req.query?.link}`, {
            connections: 128,
            pipelining: 1,
            keepAliveTimeout: 60 * 1000,
            tls: {
                rejectUnauthorized: false
            }
        })
        body = await body.json()
        return { body }
    } catch(error) {
        return { error }
    }
})

const start = async () => {
    try {
        await server.listen(process.env.PORT || 5000, '0.0.0.0')

        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port
        server.log.info(`Server started at the port: ${port}`)

    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()