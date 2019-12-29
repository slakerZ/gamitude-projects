const express = require('express');
const router = express.Router();
const connectDb = require("../db/mongoConnector.js.js");
const Project = require("../models/project.js");
const ProjectUsage = require("../models/projectUsage.js");

const projectTemplate_ = {
    id: 14,
    userId: "",
    name: "",
    primaryMethod: "POMODORO",
    projectStatus: "ACTIVE",
    statsTemplate: 1,
    projectUsageIds: [1, 2],
    "status": 0
}
const projectUsageTemplate_ = {
    id: 1,
    projectId: 14,
    method: 14,
    timeSpend: 25,
    "status": 0
}
/* GET Connection. */
connectDb().then(
    () => {console.log("MongoDb connected");},
    err => console.log("connecting to mongo error: ",err)
    );

//STARTING PATH {baseUrl}/projects
/* GET Projects {id}||{Username}||{UsernameId}. */
router.get('/', function (req, res) {

    console.log("Get Projects start");
    const projectId = req.query.projectId;
    const userName = req.query.userName;
    const usernameId = req.query.userNameId;
    let response = projectTemplate_;

    if (typeof projectId !== 'undefined') {
        //TODO query
        response["id"] = projectId;
        res.status(200).send(response);
    }

    else if (typeof usernameId !== 'undefined') {
        //TODO query
        response["userId"] = usernameId;
        res.status(200).send(response);
    }
    else if (typeof userName !== 'undefined') {
        //TODO query
        res.status(200).send(response);
    }
    else {
        console.log("no argument");
        response = {
            "Status": 1
        }
        res.status(200).send(response);
    }
    console.log("Get Projects finish");
});

/* POST Projects json{{projectData}}. */
router.post('/', function (req, res) {
    console.log("Post Project start");

    const name = req.body.name;
    const usernameId = req.body.userId;
    let valid = 'true';
    if (typeof usernameId === 'undefined') {
        valid = 'false'
    }
    if (valid === 'true') {
        const response = projectTemplate_;
        response["userId"] = usernameId;
        response["name"] = name;
        //TODO save data
        res.status(200).send(response);
    }
    else {
        console.log("no argument");
        const response = {
            "Status": 1
        }
        res.status(200).send(response);
    }
    console.log("Get Project finish");
});

/* PUT Projects json{{id + projectData to update}}. */
router.put('/', function (req, res) {
    console.log("Put Projects start");

    const projectId = req.body.id;
    let valid = 'true';
    if (typeof projectId === 'undefined') {
        valid = 'false'
    }
    if (valid === 'true') {
        const response = projectTemplate_
        response["id"] = projectId;
        response["name"] = req.body.name;
        response["primaryMethod"] = req.body.primaryMethod;
        response["projectStatus"] = req.body.projectId;
        response["statsTemplate"] = req.body.statsTemplate;
        //TODO save data
        res.status(200).send(response);
    }
    else {
        console.log("no argument");
        const response = {
            "Status": 1
        }
        res.status(200).send(response);
    }
    console.log("Put Projects finish");
});

/* SAVE PROJECT TO MONGO //TEST//. */
router.get('/mongo/project', async function (req, res) {

    console.log("Save Project mongo test start");
    const project = new Project({
        userId: 1,
        name: "mongo test",
        primaryMethod: "POMODORO",
        projectStatus: "ACTIVE",
        statsTemplate: 1
    })
    // project.projectUsages.push("5e08b4c7e502cb1fd8963222"); adding foreign key
    await project.save().then(() => console.log("Project created"));
    res.status(200).send(project);
    console.log("Save Project mongo test finish");
});
/* SAVE PROJECTUSAGE TO MONGO //TEST//. */
router.get('/mongo/projectUsage', async function (req, res) {

    console.log("Save Projectusage mongo test start");
    const projectUsage = new ProjectUsage({
        method: 14,
        timeSpend: 25
    })
    await projectUsage.save().then(() => console.log("ProjectUsage created"));
    res.status(200).send(projectUsage);
    console.log("Save Projectusage mongo test finish");
});
module.exports = router;
