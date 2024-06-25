import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxLength : 40,
        minLength : 5,
        unique : true
    },
    desc : String
},{ timestamps : true});

const todo = mongoose.model("todo",todoSchema);

export default todo;