import mongoose from "mongoose";

const filmSchema = mongoose.Schema({
    title: {type: String, required: true},
    type: {type: String, enum: ['movie', 'series'], required: true},
    image: {type: String, required: true},
    country: {type: String},
    language: {type: String}
    
})

const Film = mongoose.model('Film', filmSchema);

export default Film