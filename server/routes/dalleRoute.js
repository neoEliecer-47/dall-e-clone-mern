import { Router } from "express" //desestructuring a express
import 'dotenv/config'
import { Configuration, OpenAIApi } from 'openai'


const router = Router()

const configuration = new Configuration({
    
    apiKey: process.env.API_KEY_OAI,
}) 

const openai = new OpenAIApi(configuration)

router.route('/').get(( req, res ) => {
    res.send('hola desde el route dall E')
})

router.post("/", async ( req, res ) => {
    try {
        const { prompt } = req.body

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        })

        const image = aiResponse.data.data[0].b64_json


        return res.status(200).json({ photo: image })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "error de servidor"})
        res.status(500).send(error?.res?.data?.error.message)
    }
})


export default router