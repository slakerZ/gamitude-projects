const express = require('express');
const router = express.Router();
const connectDb = require("../db/mongoConnector.js");
const Project = require("../models/project.js");
const ProjectUsage = require("../models/projectUsage.js");
const mongoose = require("mongoose");

/* GET Connection. */
connectDb().then(
    () => { console.log("MongoDb connected"); },
    err => console.log("connecting to mongo error: ", err)
);

//STARTING PATH {baseUrl}/projects
/* GET Projects /{id} */
router.get('/:id', async (req, res) => {

    console.log("Get Projects by id start");
    const projectId = req.params.id;
    try {
        if (mongoose.Types.ObjectId.isValid(projectId)) {
            const project = await Project.findById(projectId);
            project ? res.status(200).send({
                projects: project,
                status: 0
            }) : res.status(404).send({
                error: "Project not found!",
                status: 1
            });
        }
        else {
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
/* GET Projects /user/{UserId}. */
router.get('/user/:userId', async (req, res) => {

    console.log("Get Projects by id start");
    const userId = req.params.userId;
    try {
        const project = await Project.find({ userId: { $eq: userId } });
        project ? res.status(200).send({
            projects: project,
            status: 0
        }) : res.status(404).send({
            error: "Project not found!",
            status: 1
        });
    } catch (err) {
        res.status(500).send({
            status: 1
        });
    }
});


/* POST Projects json{{projectData}}. */
router.post('/', async (req, res) => {
    console.log("Post Project start");
    const project = new Project(req.body);
    try {
        await project.save().then(() => res.status(200).send(project));
    } catch (err) {
        res.status(500).send({
            status: 1
        });
    }
});

/* PUT Projects  /{id} json{{projectData to update}}. */
router.put('/:id', async (req, res) => {
    console.log("Put Projects start");

    const projectId = req.params.id;
    const project = req.body;
    try {
        if (mongoose.Types.ObjectId.isValid(projectId)) {
            const projectUpdated = await Project.findByIdAndUpdate(projectId, project,
                 { new: true, useFindAndModify: false, runValidators: true });
            projectUpdated ? res.status(200).send(project) : res.status(404).send({
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
/* DELETE Project /{id} */
router.delete('/:id', async (req, res) => {
    console.log("Delete Projects start");

    const projectId = req.params.id;
    const project = req.body;
    try {
        if (mongoose.Types.ObjectId.isValid(projectId)) {
            const projectDeleted = await Project.findByIdAndRemove(projectId, { new: true, useFindAndModify: false });
            projectDeleted ? res.status(200).send({
                message: "Project: " + projectDeleted._id + " deleted",
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
module.exports = router;
