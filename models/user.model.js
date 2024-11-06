import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    profile:{type: String},
    name: { type: String }, 
    email:{type: String},
    phone:{type: Number},
    pass:{type: String},
    otp:{type : Number},
});


export default mongoose.model.user||mongoose.model('user',userSchema)