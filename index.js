const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')

const PORT = process.env.PORT || 5000
const app = express()
const DB_URL = `mongodb://jekapl:jekapl@cluster0-shard-00-00.fgibv.mongodb.net:27017,cluster0-shard-00-01.fgibv.mongodb.net:27017,cluster0-shard-00-02.fgibv.mongodb.net:27017/auth?ssl=true&replicaSet=atlas-14lez1-shard-0&authSource=admin&retryWrites=true&w=majority`

app.use(express.json())
app.use("/auth", authRouter)

async function start() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => {
            console.log(`Start on ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()