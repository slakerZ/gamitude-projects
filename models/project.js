const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const statsEnums=["STRENGTH","INTELLIGENCE","CREATIVITY","FLUENCY"];
const projectSchema = new mongoose.Schema({
  id: ObjectId,
  userId: {
    type: String,
    required: true
  },
  name: { type: String },
  primaryMethod: {
    type: String,
    enum: ["POMODORO", "90/30"]
  },
  projectStatus: {
    type: String,
    enum: ["ACTIVE", "ONHOLD", "DONE"]
  },
  dominantStat:{
    type: String,
    enum: statsEnums
  },
  stats:{
    type:[String],
    enum:statsEnums
  },
  projectUsages: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUsage' }
  ]
});
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;




