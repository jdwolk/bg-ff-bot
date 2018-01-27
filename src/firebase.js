const FB = require('firebase-admin')

const Firebase = () => {
  const database = () => FB.database()

  const init = () => {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCT_CERT)
    const databaseURL = process.env.FIREBASE_DB_URL

    return FB.initializeApp({
      credential: FB.credential.cert(serviceAccount),
      databaseURL
    })
  }

  const writeCurrentDate = (currentDate = Date()) => {
    return database().ref('/').set({ currentDate })
  }

  return {
    init,
    writeCurrentDate,
  }
}

const F = Firebase()
F.init()
module.exports = F

