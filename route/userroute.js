const route =require("express").Router();
const usercontroller =require('../controller/usercontroller');
const {verifyToken, verifyAndAuthorized,verifyisAdmin} = require('../midlware/verfiyToken');
route.put('/users/update/',verifyAndAuthorized,usercontroller.updateUser );

route.delete('/users/:_id',verifyAndAuthorized,usercontroller.deleteUser );

route.get('/users/getuser',verifyAndAuthorized,usercontroller.getuser );
route.get('/users',verifyAndAuthorized,usercontroller.getalluser );
module.exports = route;