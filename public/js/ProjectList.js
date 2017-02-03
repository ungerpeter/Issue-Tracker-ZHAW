/**
 * Created by andreyparamonov on 01/10/16.
 */
"use strict";


function ProjectList() {

    this.project = [];
    this.current =new Project("Example Project");
    this.project.push(this.current);

    this.current.createIssue("Some much important issue","12.10.2016","HIGH","Open");
    this.current.createIssue("Some less important issue","12.10.2016","MIDDLE","Open");
    this.current.createIssue("Some not important issue","12.10.2016","LOW","Open");

    this.current.createIssue("Some finished issue","12.10.2016","MIDDLE","Done");
}


ProjectList.prototype.createProject = function(name) {
    var _project = new Project(name);

    if( this.project.size >0) {
        this.project.forEach(new function (entry) {
            if (entry.name == name) {
                alert("Project " + name + " already exists");
                return _project;
            }
        });
    }

    this.project.push(_project);
    this.current = _project;
    //TODO add to db

    return this.current;
};


ProjectList.prototype.save = function () {
    var _that = this;
    var json = JSON.stringify(_that);

    alert(json);
};



