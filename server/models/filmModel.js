import mongoose from "mongoose";
import { countries, languages } from "../utils/constant.js";

const filmSchema = mongoose.Schema({
    title: {type: String, required: true},
    type: {type: String, enum: ['movie', 'series'], required: true},
    image: {type: String, required: true},
    country: {type: String, enum: countries},
    language: {type: String, enum: languages}
    
})

const Film = mongoose.model('Film', filmSchema);

export default Film