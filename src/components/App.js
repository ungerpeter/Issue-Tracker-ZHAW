import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as projectActions from '../actions/projectActions';

import ProjectList from './ProjectList';
import ProjectCreator from './ProjectCreator';
import IssueList from './IssueList';
import IssueCreator from './IssueCreator';

import toastr from 'toastr';


class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.gotFromLocalStorage) {
            toastr.success("Loaded state from localStorage");
        }
    }

    render() {
        let currentProjectID = this.props.currentProject;
        let currentProjectData = {...this.props.projects.filter(p => { if(p.projectID == currentProjectID) return p; })[0]};

        if(this.props.currentProject == 'undefined') {
            currentProjectData.label = "No project selected";
        }

        return (
            <div>

                <div className="navigation">
                    <ProjectList projects={this.props.projects} switchProject={this.props.switchCurrentProject} />
                    <ProjectCreator />
                </div>

                <div className="content">
                    <div className="row">
                        <div className="col-lg-6">
                            <h3 id="projecttitle">{currentProjectData.label}</h3>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6"><h3>Create Issue</h3></div>
                    </div>

                    <IssueCreator/>


                    <div className="row">
                        <div className="col-lg-8"><h3>Project Issues</h3></div>
                    </div>
                    <div id="issues">
                        <IssueList currentProjectID={currentProjectID} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let gotFromLocalStorage = false;
    if(state != {}) gotFromLocalStorage = true;
    console.log(state);
    return {
        projects: state.projectsReducer.projects,
        currentProject: state.projectsReducer.currentProject,
        switchCurrentProject: state.projectsReducer.switchCurrentProject,
        issues: state.issuesReducer.issues,
        gotFromLocalStorage: gotFromLocalStorage
    };
};

const dispatchToProps = (dispatch) => {
    return bindActionCreators(projectActions, dispatch);
};

export default connect(mapStateToProps, dispatchToProps)(App);

//TODO: Progressbar