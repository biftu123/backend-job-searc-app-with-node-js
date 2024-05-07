const Chat =require("../model/chat");
const user =require("../model/user");


exports.getChat = async (req, res) => {
  try {
    const userId = req.user.userId;
     Chat.find({ users: { $elemMatch: { $eq: userId } } }).populate("users", " -Password").
    populate("GroupAdmin", " -Password").populate("LatestMessage").sort({updateAt: -1}).then(async(results)=>{
        results = await user.populate(results,{ path:"users.sender",
        select: "username Profile email"
        }
           
            
        );
    });
res.json(result);
  } catch (error) {
   res.status(500).json({ error: "Internal server error" }); console.error(error);
    
  }
};
exports.acesschat= async(req,res)=>{
    
        const{Id}= req.body;
        if(!Id){
            res.status(400).json("invalide user");
        }
        var Ischat = await Chat.find({ Groupchat:false, $and :[
            {users : req.user.userId},
            {users :Id }
        ]}).populate("users", " -Password").populate("LatestMessage");
        Ischat= await user.populate(Ischat,{
            path:"users.sender",
        select: "username Profile email"
        })
if(Ischat.length>0){
    res.json(Ischat[0]);
}else{
    var chatData = {
        chatname: req.user.userId,
        Groupchat:false,
        users:[req.user.userId,Id]
    }
    try {
        const createchat = await Chat.create(chatData);
        const Fullchat = await Chat.findOne(id =createchat.id).populate("users", " -Password");
        res.status(200).json(Fullchat);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" }); console.error(error);
        console.log(error);
    }
}
   
}