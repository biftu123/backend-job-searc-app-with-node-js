const job = require("../model/job");

exports.createjob = async (req, res) => {
  try {
    const postjob = new job(req.body);
    const add = await postjob.save();
    const { __v, createdAt, updatedAt, ...newinfojob } = add._doc;
    res.status(200).json(newinfojob);
  } catch (error) {
    res.status(400).json('Error on posting job');
    console.log(error);
  }
};

exports.updatejob = async (req, res) => {
  try {
    const updatedUser = await job.findByIdAndUpdate(
      req.params._id,
      { $set: req.body },
      { new: true }
    );
    const { Password, __v, ...others } = updatedUser._doc;
    res.status(200).json({ ...others });
  } catch (error) {
    res.status(400).json('Error');
  }
};

exports.deletejob = async (req, res) => {
  try {
    await job.findByIdAndDelete(req.params._id);
    res.status(200).json('Delete successful');
  } catch (error) {
    res.status(400).json('Error');
  }
};

exports.search = async (req, res) => {
  try {
    const searchall = await job.find({
      $or: [
        { title: { $regex: req.params.key } },
        { location: { $regex: req.params.key } },
        { salary: { $regex: req.params.key } },
        { contract: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { period: { $regex: req.params.key } },
      ],
    });
    res.status(200).json(searchall);
  } catch (error) {
    res.status(400).json('Error');
  }
};
exports.getalljob = async (req, res) => {
  try {
    const alljob = await job.find();
    if (alljob.length === 0) {
      return res.status(404).json('No jobs found');
    }
    res.status(200).json(alljob);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
};
exports.getjob = async (req, res) => {
  try {
    const getjo = await job.findById(req.params.id);
    if (!getjo) {
      return res.status(404).json('Job not found');
    }
    res.status(200).json(getjo);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
};
