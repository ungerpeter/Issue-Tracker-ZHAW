/**
 * Created by andreyparamonov on 01/10/16.
 */

var projectList;

(new function () {
    projectList  = new ProjectList();
});

$(document).ready(function(){
    setupNavigationBar();

    $('#createdate').datepicker({
        format : "dd.mm.yyyy"
    });

    showProject(0);
});


function setupNavigationBar() {
    for (index = 0; index < projectList.project.length; index++) {
        addProjectUI(projectList.project[index]);
    }
}

function showProject(index) {
    var p = projectList.project[index];

    document.getElementById("projecttitle").innerHTML = p.id;

    var node = document.getElementById("issues");
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }

    for (index = 0; index < p.issues.length; index++) {
        addIssueUI(p.issues[index]);
    }

}
function addProject() {
    var name = document.getElementById("inputname").value;
    var project = projectList.createProject(name);
    document.getElementById("projecttitle").innerHTML = project.id;

    return addProjectUI(project);
}

function addProjectUI(project) {

   var nr = projectList.project.length <=1 ?0 : projectList.project.length-1;

    if ( project != null) {
        var list = document.getElementById("projectlist");
        var html = '<li role="presentation" onclick="showProject('
            + nr +
            ')"><a href="#">' + project.id + '</a></li>';
        if (list != null)
            list.innerHTML += (html);
    }
    return project;
}

function addIssue() {
    var title = document.getElementById("inputtitle").value;
    var prio = document.getElementById("inputprio").innerText;
    var date = document.getElementById("createdate").value;
    var issue  = projectList.current.createIssue(title,date,prio,"Open");

    document.getElementById("createdate").value = "";
    document.getElementById("inputtitle").value= "";
    return addIssueUI(issue);
}

function addIssueUI(issue) {
    var list = document.getElementById("issues");
    list.innerHTML += issue.render();
    return issue;

}

function removeIssue(issueid){
    $("#issue"+issueid).remove();
    projectList.current.removeIssue(issueid);
    //TODO remove from db
}


