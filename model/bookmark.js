const mongoose = require("mongoose");
 const bookmarkSchema = new mongoose.Schema({
    job:{type:mongoose.Schema.Types.ObjectId,ref:"job"},
   
    userId:{type:String,required:true},
    
 },{timestamps:true});
 module.exports = mongoose.model('bookmark',bookmarkSchema);