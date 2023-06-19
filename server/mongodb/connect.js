import mongoose from 'mongoose'

const connectDB = (url) => {
    

    mongoose.connect(url)
        .then(() => console.log('conectado a la BD'))
        .catch((error) => console.log(error))
}

export default connectDB