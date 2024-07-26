import express from "express"
import { config } from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import { v2 as cloudinary } from "cloudinary"
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import filmRoute from "./routes/filmRoute.js"
import { authRouter } from "./controllers/authController.js"

config();

const app = express();

app.use(cors());

app.listen(process.env.PORT, ()=> console.log(`Server running on ${process.env.PORT} port`))

mongoose
    .connect(process.env.mongoDb)
    .then(() => console.log('Database is connected'))
    .catch((error) => console.log(error))

app.use(express.json())

app.use('/film', filmRoute)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use((req, res, next) => {
    req.cloudinary = cloudinary;
    next();
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
})

const parser = multer({storage: storage})

app.post('/upload-image', parser.single('file'), (req, res) => {
    if(!req.file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        if(!req.file.path) {
            throw new Error('File uploaded, but no path available');
        }

        res.json({secure_url : req.file.path})
    } catch(error) {
        console.error('Error during file upload', error)
        res.status(500).send({message: 'Internal server error'})
    }
})

app.use('/auth', authRouter)