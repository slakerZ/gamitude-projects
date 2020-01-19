const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const ENUM = require('./enums')

const projectUsageSchema = new mongoose.Schema({
    id: ObjectId,
    projectId: { type: ObjectId, ref: 'Project' },
    method: {
        type: String,
        enum: ENUM.METHOD
    },
    timeSpend: { type: Number },
    date:  {
        type: Date,
        default: Date.now
      }
});
const ProjectUsage = mongoose.model("ProjectUsage", projectUsageSchema);
module.exports = ProjectUsage;