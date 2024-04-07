const job = require("../model/job");

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
