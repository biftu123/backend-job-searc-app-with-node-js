const { json } = require('body-parser');
const userModel = require('../model/user.js');

const cryptoJs = require('crypto-js');

exports.createuser = async (req, res, next) => {
  try {
    const createUser = new userModel({
      email: req.body.email,
      username: req.body.username,
      Password: cryptoJs.AES.encrypt(req.body.Password, "job").toString()
    });

    const savedUser = await createUser.save();
    res.json({ status: true, success: "Successfully registered" });
  } catch (err) {
    next(err);
  }
};