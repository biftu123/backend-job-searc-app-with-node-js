const user = require('../model/user');
const cryptoJs = require('crypto-js');

exports.updateUser = async (req, res) => {
  if (req.body.Password) {
    req.body.Password = cryptoJs.AES.encrypt(req.body.Password, "job").toString();
  }
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true }
    );
   // const { Password, __v, ...others } = updatedUser._doc;
    res.status(200).json('UPDATE SUCESSFUL');
  } catch (error) {
    // Handle error if necessary
  }
};
exports. deleteUser = async(req,res)=>{
    try {
        await user.findByIdAndDelete(req.user._id);
        res.status(200).json('delete successfully');
        
    } catch (error) {
        
    }
};
exports. getuser = async(req,res)=>{
    try {
    const userget  =    await user.findById(req.user.id);
    const { Password, __v, createdAt, ...others } = userget._doc;
    res.status(200).json(others);
    } catch (error) {
        
    }
};
exports.getalluser  =async(req,res)=>{
    try {
        const userget  = await user.find();  
    
        res.status(200).json(userget);
        } catch (error) {
            
        }
}