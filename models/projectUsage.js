const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const ENUM = require('./enums');
const Project = require('./project');

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

//Cascade for projectUsage
projectUsageSchema.post("deleteMany", async function(){    
    const projectId = this.getQuery().projectId;
    const projectUpdated = await Project.findByIdAndUpdate(projectId,{
        $set:{projectUsages:[]}},
        {useFindAndModify: false});
  });
  projectUsageSchema.post("findOneAndRemove", async function(doc){   
    const projectId = doc.projectId;
    const usageId = doc._id;    
    const projectUpdated = await Project.findByIdAndUpdate(projectId,{
        $pull:{projectUsages:{$in:usageId}}},
        {useFindAndModify: false});
    
  });
const ProjectUsage = mongoose.model("ProjectUsage", projectUsageSchema);
module.exports = ProjectUsage;