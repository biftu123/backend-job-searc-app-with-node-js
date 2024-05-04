const mongoose =require("mongoose");
const { schema } = require("./bookmark");
const ChatSchema= new mongoose.Schema({
    chatname:{type:String,trim:true},
    Groupchat:{type:boolen ,default:false},
    user:[{
        type: mongoose.Schema.Types.ObjectId,ref:"user"
    }],
    LatestMessage :{
        type: mongoose.Schema.Types.ObjectId,ref:"Message"
    },
    GroupAdmin :{
        type: mongoose.Schema.Types.ObjectId,ref:"user"
    }

},{timestamps:true}
)

