const mongoose =require("mongoose");
const ChatSchema= new mongoose.Schema({
    chatname:{type:String,trim:true},
    Groupchat:{type:Boolean ,default:false},
    users:[{
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

module.exports =mongoose.model('Chat',ChatSchema)