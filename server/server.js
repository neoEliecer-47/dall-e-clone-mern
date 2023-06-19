import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './mongodb/connect.js'

import postRoute from './routes/postRoute.js'
import dalleRoute from './routes/dalleRoute.js'


const app = express()

//middlewares

app.use(cors({
    origin: "https://dall-e-mern-clone.netlify.app"
}))
app.use(express.json({ limit: '50mb' }))

//
//routes - MIDLEWARESSSS 'remember to use -> 'USE'

app.use("/api/v1/post", postRoute)
app.use("/api/v1/dalle", dalleRoute)


app.get("/", async(req, res) => {
    res.send("hola mundo desde Node Js")
})


const startServer = () => {

    try {
        connectDB(process.env.URL_MONGO)
    
        app.listen(8000, () => console.log('el servidor esta corriendo en puerto http://localhost:8000'))
    } catch (error) {
        console.log(error)
    }


}



startServer()