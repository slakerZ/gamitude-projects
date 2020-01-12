const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId; 
const projectUsageSchema = new mongoose.Schema({
    id: ObjectId,
    projectId: { type: ObjectId, ref: 'Project' },
    method: { type: Number },
    timeSpend: { type: Number },
    date: { type: Date }
});
const ProjectUsage = mongoose.model("ProjectUsage", projectUsageSchema);
module.exports = ProjectUsage;