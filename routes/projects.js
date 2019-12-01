var express = require('express');
var router = express.Router();
var template_ = {
    id : 14,
    userId : "",
    name : "",
    primaryMethod : "POMODORO",
    projectStatus : "ACTIVE",
    statsTemplate : 1,
    "status" : 0
}
/* GET Projects {id}||{Username}||{UsernameId}. */
router.get('/', function(req, res, next) {
    
    var projectId =  req.query.projectId;
    var userName = req.query.userName;
    var usernameId = req.query.usernameId;
    var response = template_;
    console.log(projectId,userName,usernameId);
    
        if (typeof projectId != 'undefined'){
            response["id"] = projectId;
            res.status(200).send(response);
        }
        else if (typeof usernameId != 'undefined') {
            response["userId"] = usernameId;
            res.status(200).send(response);
        }
        else if (typeof userName != 'undefined'){
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
router.post('/', function(req, res, next) {
    
    var name = req.body.name;
    var usernameId = req.body.userId;

    console.log(usernameId)
    console.log(req.body.name)
        var valid = 'true';
        if(typeof usernameId == 'undefined' ){
            
            valid = 'false'
        }    
        if (valid == 'true'){
            response = template_;
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
router.put('/', function(req, res, next) {
    
    var projectId =  req.body.id;

        var valid = 'true';
        if(typeof projectId == 'undefined' ){
            
            valid = 'false'
        }    
        if (valid == 'true'){
            response = template_   
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
