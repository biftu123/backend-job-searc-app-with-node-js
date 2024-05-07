const user = require('../model/user');
const Message = require('../model/message');
const chat = require('../model/chat');


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
        messageb= message.populate("sender","username Profile email");
        messageb= message.populate("chat");
        messageb= user.populate(messageb,{
            path:"chat.users",
            select: "username Profile email"
        
        });
        await chat.findByIdAndUpdate(req.body.chatId,{LatestMessage:message});
        res.json(message);
    } catch (error) {
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