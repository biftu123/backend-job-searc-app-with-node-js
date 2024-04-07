
const job = require("../model/job");exports.getjob = async (req, res) => {
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