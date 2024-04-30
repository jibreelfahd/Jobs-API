import mongoose from "mongoose";

const connectDB = async (dbURI) => {
    try {
        await mongoose.connect(dbURI);
    } catch (err) {
        console.log('Error from connect database', err);
    }
}

export default connectDB;