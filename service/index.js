const ws = require('ws');
const getScore = require('./score');
const getSteamMiniProfile = require('./steamprofile');

const port = process.env.PORT || 8001

const socket = new ws.Server({port: port});

let scores = []

socket.on('connection', function(ws) {
    ws.on('message', async function(data) {
        data = JSON.parse(data.toString()) || data
        if(data.event === 'add') {
            data.data.link = 'https://steamcommunity.com/miniprofile/' + await getSteamMiniProfile(data.data.link);
            data.data.id = scores.length + 1
            scores.push(data.data)
        }
        if(data.event === 'remove') {
            const index = scores.findIndex(score => score.id === score.data)
            if(index != -1) {
                scores.splice(index, 1)
            }
        }
    })

    const parse = () => {
        setInterval(() => {

            scores.map(async (score, i) => {
                scores[i].score = await getScore(score.link)
            })

            if(scores.length){
                ws.send(Buffer.from(JSON.stringify(scores)))
            }

        }, 5000);
    }

    parse()

})

console.log(`Server started at the port: ${port}`)