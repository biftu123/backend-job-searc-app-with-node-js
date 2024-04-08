const bookmark = require("../model/bookmark");
const job = require("../model/job");
const { get } = require("../route/authroute");
exports.cratebookmarks =async (req,res)=>{
 const jobID =req.body.job;
    try {
        const job = await job.findById(jobID);
        if(!job){
            res.status(404).json('not found');
        }
        const newbook =new bookmark({job:job,userId:req.user.id});
        const  create = await  newbook.save();
const{__v,updateAt,...otherinfos} =create._doc;
res.status(200).json(otherinfos);
    } catch (error) {
        
    }
};
exports.detetebookmark=async(req,res)=>{
    try {
        await  bookmark.findByIdAndDelete(req.params.id);
        res.status(200).json ("delete sucessfully");
    } catch (error) {
        
    }
};
exports.getbookmark=async(req,res)=>{
    try {
      const getbook =  await  bookmark.find({userId:req.params.userId});
        res.status(200).json (getbook);
    } catch (error) {
        
    }
}