import mongoose from "mongoose";

export default class DatabaseConfig {
    
    connect() {
        mongoose.connect(`${process.env.MONGODB_URI}`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log("Database connected")
        })
    }

    disconnect() { 
        mongoose.disconnect() 
        console.log("database disconnected")
    }
}
