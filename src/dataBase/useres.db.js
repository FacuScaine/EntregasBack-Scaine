import mongoose from "mongoose";

const collection = 'Chat';

const usersSchema = mongoose.Schema({
    author:{
        nombre: String,
        apellido: String,
        edad: Number,
        userName: String,
        email: String,
        avatar: String
    },
    mensaje:String
},{timestamps:true})

const usersService = mongoose.model(collection,usersSchema);
export default usersService;