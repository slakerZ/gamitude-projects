var express = require('express');
var router = express.Router();
var projectTemplate_ = {
    id : 14,
    userId : "",
    name : "",
    primaryMethod : "POMODORO",
    projectStatus : "ACTIVE",
    statsTemplate : 1,
    projectUsageIds : [1,2],
    "status" : 0
}
var projectUsageTemplate_ = {
    id : 1,
    projectId : 14,
    method : 14,
    timeSpend : 25,
    "status" : 0
}
//STARTING PATH {url}/projects

/* GET Projects {id}||{Username}||{UsernameId}. */
router.get('/', function(req, res, next) {
    
    var projectId =  req.query.projectId;
    var userName = req.query.userName;
    var usernameId = req.query.usernameId;
    var response = projectTemplate_;
    
        if (typeof projectId != 'undefined'){
            //TODO query
            response["id"] = projectId;
            res.status(200).send(response);
        }
        
        else if (typeof usernameId != 'undefined') {
            //TODO query
            response["userId"] = usernameId;
            res.status(200).send(response);
        }
        else if (typeof userName != 'undefined'){
            //TODO query
            res.status(200).send(response);
        }
        else { 
            console.log("no argument");
            response = {
                "Status" : 1
            }      
            res.status(200).send(response);
        }
});

/* POST Projects json{{projectData}}. */
router.post('/', function(req, res, next) {
    
    var name = req.body.name;
    var usernameId = req.body.userId;
        var valid = 'true';
        if(typeof usernameId == 'undefined' ){
            valid = 'false'
        }    
        if (valid == 'true'){
            response = projectTemplate_;
            response["userId"]=usernameId;
            response["name"]=name;
            //TODO save data
            res.status(200).send(response);
        }
        else { 
            console.log("no argument");
            response = {
                "Status" : 1
            }      
            res.status(200).send(response);
        }
});

/* PUT Projects json{{id + projectData to update}}. */
router.put('/', function(req, res, next) {
    
    var projectId =  req.body.id;

        var valid = 'true';
        if(typeof projectId == 'undefined' ){
            valid = 'false'
        }    
        if (valid == 'true'){
            response = projectTemplate_   
            response["id"]=projectId;
            response["name"]=req.body.name;
            response["primaryMethod"]=req.body.primaryMethod;
            response["projectStatus"]=req.body.projectId;
            response["statsTemplate"]=req.body.statsTemplate;
            //TODO save data
            res.status(200).send(response);
        }
        else { 
            console.log("no argument");
            response = {
                "Status" : 1
            }      
            res.status(200).send(response);
        }
});


module.exports = router;
