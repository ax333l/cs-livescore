import Fastify from 'fastify';
import { request } from 'undici';
import cors from 'fastify-cors';
  
const server = Fastify({logger: true})

server.register(cors, { 
    origin: (origin, cb) => {
        if(/localhost/.test(origin)){
            //  Request from localhost will pass
            cb(null, true)
            return
        }
        // Generate an error on other origins, disabling access
        cb(new Error("Not allowed"))
    }
})

server.get('/miniprofile', async (req, res) => {
    let {
        body
    } = await request(`http://localhost:3001/miniprofile?link=${req.query?.link}`)
    body = await body.json()
    return { body }
})

server.get('/score', async (req, res) => {
    let {
        body
    } = await request(`http://localhost:3001/score?link=${req.query?.link}`)
    body = await body.json()
    return { body }
})

const start = async () => {
    try {
        await server.listen(process.env.PORT || 5000)

        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port
        server.log.info(`Server started at the port: ${port}`)

    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()