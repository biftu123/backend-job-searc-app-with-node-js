const jwt = require('jsonwebtoken');
const userModel = require('../model/user.js');
const cryptoJs = require('crypto-js');

exports.createuser = async (req, res, next) => {
  try {
    const { email, username,  Password } = req.body;

    const createUser = new userModel({
      email: email,
      username: username,
      
      Password: cryptoJs.AES.encrypt(Password, 'job').toString()
    });

    const savedUser = await createUser.save();

    // Generate token
    const token = jwt.sign({ userId: savedUser._id, role: savedUser.isAdmin }, 'job');


    res.json({ status: true, success: 'Successfully registered', token });
  } catch (err) {
    next(err);
  }
};

exports.loginuser = async (req, res) => {
  try {
    const { email, Password } = req.body;

    const login = await userModel.findOne({ email: email });
    if (!login) {
      return res.status(401).json('Wrong login');
    }

    const decryptedPass = cryptoJs.AES.decrypt(login.Password, 'job').toString(cryptoJs.enc.Utf8);

    if (decryptedPass !== Password) {
      return res.status(401).json('Wrong login');
    }

    const { password, __v, createdAt, ...others } = login._doc;

    // Generate token
    const token = jwt.sign({ userId: login._id,isAdmin: login.isAdmin  }, 'job');

    res.status(200).json({ token, ...others });
  } catch (error) {
    throw error;
  }
};