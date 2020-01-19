const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const ENUM = require('./enums')

const projectSchema = new mongoose.Schema({
  id: ObjectId,
  userId: {
    type: String,
    required: true
  },
  name: { type: String },
  primaryMethod: {
    type: String,
    enum: ENUM.METHOD
  },
  projectStatus: {
    type: String,
    enum: ENUM.STATUS
  },
  dominantStat: {
    type: String,
    enum: ENUM.STATS
  },
  stats: {
    type: [String],
    enum: ENUM.STATS
  },
  projectUsages: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUsage' }
  ],
  totalTimeSpend:
  {
    type: Number,
    default: 0
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;




