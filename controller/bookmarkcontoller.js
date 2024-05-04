const bookmark = require("../model/bookmark");
const job = require("../model/job");

exports.cratebookmarks =async (req,res)=>{
 const jobID =req.body.job;
    try {
        if (!jobID) {
            return res.status(400).json('Missing required "job" property in request body');
          }
        const jobs = await job.findById(jobID);
        if(!jobs){
            res.status(404).json('not found');
        }
        const newbook =new bookmark({job:jobs,    userId:req.user.userId });
        const  create = await  newbook.save();
const{__v,updateAt,...otherinfos} =create._doc;
res.status(200).json(otherinfos);
    } catch (error) {
        
    }
};
exports.detetebookmark=async(req,res)=>{
    try {
        const jobId = req.params._id;
        await  bookmark.findOneAndDelete({ job: jobId, userId: req.user.userId});
        res.status(200).json ("delete sucessfully");
    } catch (error) {
        
    }
};
exports.getbookmark=async(req,res)=>{
    try {
      const getbook =  await  bookmark.find({userId:req.user.userId}).populate('job');
        res.status(200).json (getbook);
    } catch (error) {
        
    }
}