import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        enum:['credit','debit'],
        required:true
    },
    description:{
        type:String,
        required:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:false
    },
    marchant:{
        type:String,
        required:false
    }
},{timestamps:true});

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction",TransactionSchema);

export default Transaction;