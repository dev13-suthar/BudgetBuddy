import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min:3
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        default:0,  
    },
    transactions:[{type:mongoose.Schema.Types.ObjectId, ref:'Transaction'}]
},{timestamps:true});

const User = mongoose.models.User || mongoose.model("User",UserSchema);

export default User;