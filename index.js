const database = require('./src/services/database')
database.connect('development')

const app = require('./src/app')

app.listen(3000, () => {
    console.log('server listening on port 3000')
})
