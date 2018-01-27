const R = require('ramda')
const Twit = require('twit')
const { http, log } = require('./utils')
const { BOT_NAME } = require('./constants')

const API_URL = 'https://api.twitter.com/1.1'
const ENDPOINTS = {
  UNLIMITED: {
    followers: (userNames) => {
      const baseUrl = 'https://cdn.syndication.twimg.com/widgets/followbutton/info.json'
      const commaSep = R.join(',', userNames)
      return `${baseUrl}?screen_names=${commaSep}`
    }
  },
}

const Official = () => {
  const makeClient = (env) => {
    const {
      TWITTER_CONSUMER_KEY,
      TWITTER_CONSUMER_SECRET,
      TWITTER_ACCESS_TOKEN,
      TWITTER_ACCESS_TOKEN_SECRET,
    } = env

    return new Twit({
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET,
      access_token: TWITTER_ACCESS_TOKEN,
      access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
      timeout_ms: 60 * 1000,
    })
  }

  const streamMentionsFor = (userName, { client }) => {
    //return client.stream('user', { track: [BOT_NAME, 'codeNCardboard'], follow: [BOT_NAME, 'codeNCardboard'] })
    return client.stream('user')
  }

  return {
    makeClient,
    streamMentionsFor,
  }
}

const Unofficial = () => {
  const getUserFollowerCounts = (userNames) => {
    const endpoint = ENDPOINTS.UNLIMITED.followers(userNames)
    log.info(`GET ${endpoint}`)
    return http.get(endpoint)
  }

  return {
    getUserFollowerCounts,
  }
}

module.exports = {
  Official: Official(),
  Unofficial: Unofficial(),
}
