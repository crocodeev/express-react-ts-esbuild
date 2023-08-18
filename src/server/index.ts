import express from 'express'
import path from 'path'

const PORT = '3000'

const publicPath = path.resolve(__dirname, './public')

const init = async (): Promise<void> => {

    const app = express()

    app.use(express.static(publicPath, {
        index: false,
        maxAge: 30 * 24 * 60 * 3600,
      }))

    app.get('/', (req, res) => {
        console.log(publicPath);
        
        res.sendFile(`${publicPath}/index.html`)
    })

    app.get('/test', (req, res) => {
        res.statusCode = 200
        res.send("Hello world")
    })

    app.listen(PORT, () => {
        console.log('server start at port: ' + PORT);
    })
} 

init()