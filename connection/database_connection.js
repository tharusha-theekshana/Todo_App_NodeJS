import mongoose from "mongoose";

const connectionUrl = "mongodb://localhost:27017/todo_db";
const databaseConnection = async () => {
    try{
        await mongoose.connect(connectionUrl);
        console.log("Database connection successful ... !")
    }catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}

export default databaseConnection;