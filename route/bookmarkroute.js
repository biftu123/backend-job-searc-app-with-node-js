const route = require('express').Router();
const bookmarkcontroller =require("../controller/bookmarkcontoller");
const { verifyToken, verifyAndAuthorized, verifyisAdmin } = require('../midlware/verfiyToken');
route.post('/create', verifyAndAuthorized,bookmarkcontroller.cratebookmarks);
route.delete('/:_id',verifyAndAuthorized,bookmarkcontroller.detetebookmark);
route.get('/',verifyAndAuthorized,bookmarkcontroller.getbookmark);
module.exports = route;