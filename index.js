const database = require('./src/services/database')
const app = require('./src/app')
const dotenv = require('dotenv')

dotenv.config()
const PORT = process.env.PORT || 3000
const BASE_URI = process.env.BASE_URI || 'http://localhost'
const BASE_URL = process.env.BASE_URL || `${BASE_URI}:${PORT}`
process.env.BASE_URL = BASE_URL

database.connect('development')

app.listen(3000, () => {
    log.info(`server listening on port ${PORT} (${BASE_URL})`)
})
