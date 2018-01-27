require('dotenv').config()

const Twitter = require('./twitter')

module.exports = {
}

const client = Twitter.Official.makeClient(process.env)

let stream = Twitter.Official.streamMentionsFor('codeNCardboard', { client })

console.log('Listening for tweets...')
stream.on('message', (msg) => console.log(msg))

module.exports = {
  stream
}
