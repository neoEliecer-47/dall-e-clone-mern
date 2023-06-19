import { Router } from "express" //desestructuring a express

import { v2 as cloudinary } from 'cloudinary'

import Post from '../mongodb/models/postModel.js'



const router = Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//get all post

router.get("/", async (req, res) => {

    try {
        
        const posts = await Post.find({})
        if(!posts) throw new Error('no hay posts en la base de datos')//esto funcina como return

        res.status(200).json({ success: true, data: posts })
    } catch (error) {
        res.status(404).json({ success: false, error: error.message})
    }

})

//create a post

router.post("/", async (req, res) => {

    try {
        
        const { name, prompt, photo } = req.body
    
    const photoUrl = await cloudinary.uploader.upload(photo)

    const newPost = await Post({
        name,
        prompt,
        photo: photoUrl.url
    })
    await newPost.save()
    return res.status(201).json({ success: true, data: newPost })

    } catch (error) {
        res.status(500).json({ success: false, error: error.message})
    }

})



export default router