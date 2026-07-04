const Application = require('../models/Application');

const createApplication = async (req, res) => {
  const { company, role, status, notes, dateApplied } = req.body;

  const newApplication = new Application({
    user: req.userId,
    company,
    role,
    status,
    notes,
    dateApplied,
  });

  await newApplication.save();

  res.status(201).json(newApplication);
};
//

const getApplications = async (req, res) => {
  const applications = await Application.find({ user: req.userId });
  res.json(applications);
};


//
const getApplicationById = async (req, res) => {
  const application = await Application.findOne({
    _id: req.params.id,
    user: req.userId,
  });

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  res.json(application);
};

//

const updateApplication = async (req, res) => {
  const application = await Application.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  res.json(application);
};


//
const deleteApplication = async (req, res) => {
  const application = await Application.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  res.json({ message: 'Application deleted' });
};






module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};