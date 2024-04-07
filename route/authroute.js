const route =require('express').Router();
const authcontroller =require('../controller/authcontroller');
route.post('/register',authcontroller.createuser);
route.post('/login',authcontroller.loginuser);
module.exports =route;