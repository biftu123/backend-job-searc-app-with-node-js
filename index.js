const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./route/authroute');
const userroute =require("./route/userroute");
const jobroute =require("./route/jobroute");
const bookroute =require("./route/bookmarkroute");
const Messageroute =require("./route/messageroute");
const chatroute =require("./route/chatroute");
const { Socket } = require('socket.io');

const app = express();
const port = 4099;

mongoose.connect('mongodb://localhost:27017/bifob')
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(error);
  });

app.get('/', (req, res, next) => {
  res.send('Hello Biftu');
});

app.use(express.json());
app.use('/', authRoute);
app.use('/',userroute);
app.use('/job',jobroute);
app.use('/bookmark',bookroute);
app.use("/message",Messageroute);
app.use('/chat',chatroute);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:4099',
  },
  pingInterval: 10000, // Set the ping interval to 10 seconds (adjust as needed)
  pingTimeout: 5000 // Set the ping timeout to 5 seconds (adjust as needed)
});
io.on('connect', (socket) => {
  console.log("Connected to socket");
  socket.on('setup', (userId) => {
    socket.join(userId);
    socket.brodcast.emit ("online user",userId);
    console.log(userId);

  });
  socket.on("typing", (room) =>{
    console.log("typing");
    console.log("room");
    socket.to(room).emit('typing',room);
  });
  socket.on("stoping", (room) =>{
    console.log("stoping");
    console.log("room");
    socket.to(room).emit('stoping',room);
  });
  socket.on('join chat', (room) =>{
    socket.Join(room);
  });
  socket.on('new messsage',(newMessageRecieved) =>{
    var chat =newMessageRecieved.chat;
    var room =chat._id;
    var sender =newMessageRecieved.sender;
    var senderId = sender._id;

if(!sender|| senderId){
  console.log(" in defined user");
      retrun;
}


    const user = chat.users
    if(!user){
      console.log(" in defined user");
      retrun;
    }
    socket .to(room).emit("messege recived",newMessageRecieved);
    socket .to(room).emit("messege sent","New Message");
  });
  socket.off('setup', ()=>{
    console.log("user offline");
    socket.leave();
  })
});