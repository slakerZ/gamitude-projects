const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId; 
const projectSchema = new mongoose.Schema({
    id: ObjectId,
    username: { type: String },
    userId: { type: Number },//Temporary ?? ObjectId, ref: 'User'
    name: { type: String },
    primaryMethod: { type: String },
    projectStatus: { type: String },//Temporary ?? Number 
    statsTemplate: { type: Number },//Temporary ?? document in Db
    projectUsages: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUsage'}
      ]
});
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;