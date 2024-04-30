import mongoose from "mongoose";

export const Connect = async()=>{
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("Mongo Conneted!!!")
        })
        connection.on('error',()=>{
            console.log(`MongoDb Connection Error.Please Make Sure MongoDB is Running`);
            process.exit();
        })
    } catch (error:any) {
        console.log("error")
    }
}