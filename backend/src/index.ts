import express from 'express'
import * as dotenv from 'dotenv'

const app = express()
dotenv.config()
const Port = process.env.PORT  || 3000

app.listen(Port, () => {
    console.log(`[server]: Server is running at http://localhost:${Port}`);;
});