const route = require('express').Router();
const chatcontroller =require("../controller/chatcontroller");
const { verifyToken, verifyAndAuthorized, verifyisAdmin } = require('../midlware/verfiyToken');


route.post("/",verifyAndAuthorized,chatcontroller.acesschat);
route.get("/getchat",verifyAndAuthorized,chatcontroller.getChat);
module.exports =route;