const express = require('express');
const router = express.Router();
const Project = require("../models/project.js");
const ProjectUsage = require("../models/projectUsage.js");
const mongoose = require("mongoose");
const endpoints = require("./endpoints.json");
const axios = require('axios');

const ranksUrl = (process.env.RANKS_URL || endpoints['ranks']);
const workflowUrl = (process.env.WORKFLOW_URL || endpoints['workflow']);

//STARTING PATH {baseUrl}/projectUsage
/* GET ProjectUsage /{id} */
router.get('/:id', async (req, res) => {
    console.log("Get ProjectUsage by id start");

    const projectUsageId = req.params.id;
    try {
        if (mongoose.Types.ObjectId.isValid(projectUsageId)) {
            const projectUsage = await ProjectUsage.findById(projectUsageId);
            projectUsage ? res.status(200).send({
                projectUsages: projectUsage,
                status: 0
            }) : res.status(404).send({
                error: "Project not found!",
                status: 1
            });
        }
        else {
            res.status(400).send({
                error: "projectUsageId not valid!",
                status: 1
            });
        }
    } catch (err) {
        res.status(500).send({
            status: 1
        });
    }
});

/* GET ProjectUsage /project/{ProjectId}. */
router.get('/project/:projectId', async (req, res) => {
    console.log("Get ProjectUsage by id start");

    const projectId = req.params.projectId;
    try {
        if (mongoose.Types.ObjectId.isValid(projectId)) {
            const projectUsage = await ProjectUsage.find({ projectId: { $eq: projectId } });
            projectUsage ? res.status(200).send({
                projectUsages: projectUsage,
                status: 0
            }) : res.status(404).send({
                error: "Project not found!",
                status: 1
            });
        } else {
            res.status(400).send({
                error: "projectId not valid!",
                status: 1
            });
        }
    } catch (err) {
        res.status(500).send({
            status: 1
        });
    }
});

/* POST ProjectUsage json{{projectUsageData}}. */
router.post('/', async (req, res) => {
    console.log("Post ProjectUsage start");

    const projectUsageReq = new ProjectUsage(req.body);
    const projectId = projectUsageReq.projectId;

    function postUsageData(address, request) {
        return axios.post(address, request);
    }

    try {
        if (mongoose.Types.ObjectId.isValid(projectId)) {
            await projectUsageReq.save().then((projectUsage) => {
                Project.findByIdAndUpdate(projectId, {
                    $push: { projectUsages: projectUsage._id }
                    , $inc: { totalTimeSpend: projectUsage.timeSpend }
                }, {
                    new: true, useFindAndModify: false, runValidators: true
                    , fields: { dominantStat: 1, stats: 1, userId: 1 }
                }).then((project) => {
                    const requestData = {
                        project: project,
                        projectUsage: projectUsage
                    }
                    axios.all([postUsageData(workflowUrl + '/workflow/energy', requestData)
                        , postUsageData(ranksUrl + '/stats', requestData)])
                        .then(axios.spread((...responses) => {
                            if (responses[0] && responses[1]) {
                                res.status(201).send({
                                    projectUsages: projectUsage,
                                    status: 0
                                });
                            };
                        })).catch((err)=>{
                            res.status(504).send({
                                status:1
                            });
                        });
                })
            });
        } else {
            res.status(400).send({
                error: "projectId not valid!",
                status: 1
            });
        }
    } catch (err) {
        res.status(500).send({
            status: 1
        });
    }
});

/* DELETE ProjectUsage /{id} */
router.delete('/:id', async (req, res) => {
    console.log("Delete ProjectUsage start");

    const projectUsageId = req.params.id;
    try {
        if (mongoose.Types.ObjectId.isValid(projectUsageId)) {
            const projectUsageDeleted = await ProjectUsage.findOneAndRemove(projectUsageId, { new: true, useFindAndModify: false });
            projectUsageDeleted ? res.status(200).send({
                message: "ProjectUsage: " + projectUsageDeleted._id + " deleted",
                status: 0
            }) : res.status(404).send({
                error: "ProjectUsage not found!",
                status: 1
            });
        } else {
            res.status(400).send({
                error: "projectUsageId not valid!",
                status: 1
            });
        }
    } catch (err) {
        res.status(500).send({
            status: 1
        });
    }
});

/* DELETE ProjectUsage /{projectId} */
router.delete('/project/:projectId', async (req, res) => {
    console.log("Delete ProjectUsage start");

    const projectId = req.params.projectId;
    try {
        if (mongoose.Types.ObjectId.isValid(projectId)) {
            const projectUsageDeleted = await ProjectUsage.deleteMany({ projectId: { $eq: projectId } });
            projectUsageDeleted ? res.status(200).send({
                message: "ProjectUsages of project id: " + projectId + " deleted",
                status: 0
            }) : res.status(404).send({
                error: "Project Usages not found!",
                status: 1
            });
        } else {
            res.status(400).send({
                error: "projectId not valid!",
                status: 1
            });
        }
    } catch (err) {
        res.status(500).send({
            status: 1
        });
    }
});
module.exports = router;
