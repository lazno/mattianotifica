import path from 'path'
import express from 'express'
import createApi from './api.js'


const app = express(),
    DIST_DIR = __dirname,
    HTML_FILE = path.join(DIST_DIR, 'index.html')


app.use(express.static(DIST_DIR))

createApi(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})