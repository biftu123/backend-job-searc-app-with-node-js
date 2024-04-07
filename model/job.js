const mongodb =require('mongoose');
const jobschema = new mongodb.Schema({
    title: {type:String,required:true},
    location:{type:String,required:true},
    descrption:{type:String,required:true},
    company:{type:String,required:false},
    salary:{type:String,required:true},
    period:{type:String,required:true},
    contract:{type:String,required:true},
    requirments :{type:Array,required:true},
    imageUrl :{type:String,required:true},
   AgentId:{type:mongodb.Schema.Types.ObjectId,
      ref:'user',
     required:false
    }
    
} ,{timestamps :true});
module.exports =mongodb.model("job",jobschema);