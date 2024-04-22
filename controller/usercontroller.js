const user = require('../model/user');
const cryptoJs = require('crypto-js');

exports.updateUser = async (req, res) => {
  if (req.body.Password) {
    req.body.Password = cryptoJs.AES.encrypt(req.body.Password, "job").toString();
  }
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.user.userId,
      { $set: req.body },
      { new: true }
    );
   const { Password, __v, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    // Handle error if necessary
  }
};
exports. deleteUser = async(req,res)=>{
    try {
        await user.findByIdAndDelete(req.params._id);
        res.status(200).json('delete successfully');
        
    } catch (error) {
        
    }
};
exports.getuser = async (req, res) => {
  try {
   
    const userget = await user.findById(req.user.userId);
    console.log(userget);
    if (!userget) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { Password, __v, createdAt, ...others } = userget._doc;
    res.status(200).json(others);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getalluser  =async(req,res)=>{
    try {
        const userget  = await user.find();  
    
        res.status(200).json(userget);
        } catch (error) {
            
        }
}