const user = require('../model/user');
const Message = require('../model/message');
const Chat = require('../model/chat');


exports.sendmessage = async(req ,res)=>{
    const {content,receiver,chatId}=req.body;
    if(!content && ! chatId){
        console.log("invalied");
      return  res.status(401);
    }
    var NewMessage ={
        sender: req.user.userId,
        receiver :receiver,
        content:content,
        chat:chatId
    };
    try {
        
        var message = await Message.create(NewMessage);
        const populatedMessage = await Message.findById(message._id)
      .populate("sender", "username Profile email")
      .populate({
        path: "chat",
        populate: { path: "users", select: "username Profile email" }
      });
        await Chat.findByIdAndUpdate(req.body.chatId,{LatestMessage:populatedMessage});
     
        res.json(populatedMessage);
    } catch (error) {
        console.log(error);
return res.status(500).json('error');

        
    }
    exports.getmessages = async(req,res)=>{
        try {
            const pagesize =12;
            const page = req.quary.page|| 1;
            const skipmessages =(page-1)*pagesize;
            var messages = await Message.find({chatId:req.params.id}).populate("sender","username Profile email")
            .populate("chat").sort({createdAt:-1}).skip({skipmessages}).limit({pagesize});

            messages = user.populate(messages,{
            path:"chat.users",
            select: "username Profile email"

        
        });
        res.json(messages);
        } catch (error) {
            return res.status(400).json('error'); 
        }
    }
}