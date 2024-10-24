import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    pic: { type: String },
    caption:{type:String},
    description:{type:String} 
});



export default mongoose.model.movies||mongoose.model('movies',postSchema) 






