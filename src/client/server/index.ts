import express from 'express'
import path from 'path'

const PORT = '3000'

const publicPath = path.resolve(__dirname, './public')

const init = async (): Promise<void> => {

    const app = express()

    app.get('/', (req, res) => {
        res.sendFile(`${publicPath}/index.html`)
    })

    app.listen(PORT, () => {
        console.log('server start at port: ' + PORT);
    })
} 