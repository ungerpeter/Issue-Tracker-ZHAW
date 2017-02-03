/**
 * Created by andreyparamonov on 01/10/16.
 */
"use strict";



function Issue(title,date, prio, status){
    this.id = (new Date()).getTime();
    this.title = title;
    this.date = date;
    this.prio = prio;
    this.status = status;
}


Issue.prototype.render = function () {
    return '<div class="issueitem" id="issue'+
        this.id+
        '"> <div class="row"> <div class="col-sm-6"> <div class="input-group input-group-sm">'+

        '<input type="text" class="form-control" aria-label="..." value="'+
        this.title+
        '" readonly="true">'+
        '<div class="input-group-btn">'+
        '<button type="button" class="btn btn-'+
        (this.status === 'Done' ? 'success' : 'default')+

        ' dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
        this.status+

        '<span class="caret"></span></button> <ul class="dropdown-menu"> <li><a href="#">Open</a></li> <li><a href="#">Working</a></li> <li><a href="#">Done</a></li>'+
        '</ul> </div> </div> </div>'+
        '<div class="col-sm-2"> <div class="input-group input-group-sm" > <span class="input-group-addon" id="sizing-addon6">Date'+
        '</span> <input type="text" class="form-control" aria-describedby="sizing-addon6" readonly="true" value="'+

        this.date+
        '" id="date'+

        this.id+

        '">'+ '</div> </div> '+
        '<div class="col-sm-2"> <div class="btn-group-sm"> <button type="button" style="width: 80px" class="btn btn-'+

        (this.prio === "HIGH" ? 'danger' : this.prio === "LOW" ? 'success' :'warning')+
        ' id="prio'+
        this.id+

        '">'+
        this.prio
        +'</button>  </div> </div>'+
        '<div class="col-sm-1"> <div class="btn-group-sm">'+
        '<button type="button" class="btn btn-default" onclick="removeIssue('+
        this.id+
        ')" > <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> </button>  </div> </div> </div> </div>';
};