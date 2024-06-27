import mongoose from "mongoose";

const connectToDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to DB");
    }
    catch(error){
        console.log("Error connecting to DB");
        console.log(error.message);
    }
}

export default connectToDb;