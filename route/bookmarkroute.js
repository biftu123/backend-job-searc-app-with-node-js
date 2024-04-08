const route = require('express').Router();
const bookmarkcontroller =require("../controller/bookmarkcontoller");
const { verifyToken, verifyAndAuthorized, verifyisAdmin } = require('../midlware/verfiyToken');
route.post('/', verifyAndAuthorized,bookmarkcontroller.cratebookmarks);
route.delete('/:id',verifyToken,bookmarkcontroller.detetebookmark);
route.get('/:userId',bookmarkcontroller.getbookmark);
module.exports = route;