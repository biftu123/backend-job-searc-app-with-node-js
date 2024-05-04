const express = require('express');
const { verifyToken, verifyAndAuthorized, verifyisAdmin } = require('../midlware/verfiyToken');
const jobcontroller = require('../controller/jobcontroller');
const route = express.Router();

route.post('/create', verifyisAdmin, jobcontroller.createjob);
route.put('/update/:_id', verifyisAdmin, jobcontroller.updatejob);
route.delete('/delete/:_id', verifyisAdmin, jobcontroller.deletejob);
route.get('/search/:key', jobcontroller.search);
route.get('/:id', jobcontroller.getjob);
route.get('/', jobcontroller.getalljob);

module.exports = route;