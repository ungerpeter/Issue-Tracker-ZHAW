/**
 * Created by andreyparamonov on 01/10/16.
 */
"use strict";



function Project(name){
    this.id = name;
    this.issues = [];
}

Project.prototype.createIssue = function(title,date, prio, status) {
    var _issue = new Issue(title,date,prio,status);
    this.issues.push(_issue);
    //TODO add to db

    return _issue;
};

Project.prototype.removeIssue = function (issueId) {

    for(var i = this.issues.length - 1; i >= 0; i--) {
        if( this.issues[i].id == issueId){
            this.issues.splice(i,1);
            return;
        }
    }
};

Project.prototype.updateIssue = function (issue) {
    for(var i = this.issues.length - 1; i >= 0; i--) {
        if( this.issues[i].id == issue.id){

            //TODO
            return;
        }
    }
};