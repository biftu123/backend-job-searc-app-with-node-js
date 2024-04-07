const express = require('express');
const { verifyToken, verifyAndAuthorized, verifyisAdmin } = require('../midlware/verfiyToken');
const jobcontroller = require('../controller/jobcontroller'), getjob = require("../controller/getjob"), getalljob = require("../controller/getalljob");

const route = express.Router();

route.post('/create', verifyisAdmin, jobcontroller.createjob);
route.put('/update/:_id', verifyisAdmin, jobcontroller.updatejob);
route.delete('/delete/:_id', verifyisAdmin, jobcontroller.deletejob);
route.get('/search/:key', jobcontroller.search);
route.get('/:id', getjob.getjob);
route.get('/', getalljob.getalljob);

module.exports = route;