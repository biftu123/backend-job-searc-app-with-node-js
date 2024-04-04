const route =require('express').Router();
const authcontroller =require('../controller/authcontroller');
route.post('/register',authcontroller.createuser);
module.exports =route;