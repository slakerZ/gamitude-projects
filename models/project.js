const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
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
  statsTemplate: { type: Number },//Temporary ?? document in Db || just {stat1:value ....}
  projectUsages: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUsage' }
  ]
});
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;




