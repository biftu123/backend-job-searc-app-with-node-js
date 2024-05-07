const route = require('express').Router();
const { verifyToken, verifyAndAuthorized, verifyisAdmin } = require('../midlware/verfiyToken');

const messagecontroller = require('../controller/messagecontroller')


route.post("/sendmessage",verifyAndAuthorized,messagecontroller.sendmessage);
route.get("/:id",verifyAndAuthorized,messagecontroller.sendmessage);









module.exports =route;