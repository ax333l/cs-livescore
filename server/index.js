const Hapi = require('@hapi/hapi');
const Joi = require('joi');
const WebSocketClient = require('./ws-client');

const ws = new WebSocketClient();

ws.open(process.env.SOCKET || 'ws://localhost:8001')
ws.onopen = function(){
	console.log("WebSocketClient connected");
}

ws.onmessage = function(data,flags,number){
    data = JSON.parse(data.toString()) || data
}

const sendMessage = (obj) => {
    ws.send(Buffer.from(JSON.stringify(obj)))
}


const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/',
        handler: (request, h) => {
            sendMessage({
                event: 'add',
                data: request.payload
            })
            return 'Pushed!';
        },
        options: {
            validate: {
                payload: Joi.object({
                    link: Joi.string().regex(/steamcommunity.com/).required(),
                    hltv: Joi.string(),
                    '1': Joi.object({
                        team: Joi.string()
                    }),
                    '2': Joi.object({
                        team: Joi.string()
                    }),
                    side: Joi.number().valid(1, 2)
                })
            }
        }
    })

    server.route({
        method: 'DELETE',
        path: '/{id}',
        handler: (request, h) => {
            return 'Hello World!';
        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
