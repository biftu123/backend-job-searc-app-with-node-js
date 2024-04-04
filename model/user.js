const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username :{type:String,required:true},
    email:{type:String,required:true,uniqe:true},
    Password :{type:String,required:true},
    location:{type:String,required:false},
    isAdmn:{type:Boolean,required:false},
    isAgent:{type:Boolean,required:false},
    skill: {type:Array ,required:false},
    Profile: {type:String,required:false,
    default:"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
},{timestamps:true});
module.exports = mongoose.model("user",userSchema);