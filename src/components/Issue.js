import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as issuesActions from '../actions/issueActions';

class Issue extends Component {

    constructor(props) {
        super(props);

        this.workingStates = {
            0: {
                label: 'Open',
                classes: 'btn btn-primary dropdown-toggle'
            },
            1: {
                label: 'Working',
                classes: 'btn btn-warning dropdown-toggle'
            },
            2: {
                label: 'Completed',
                classes: 'btn btn-success dropdown-toggle'
            }
        };

        this.priorityStates = {
            0: {
                label: 'LOW',
                classes: 'btn btn-primary dropdown-toggle'
            },
            1: {
                label: 'MEDIUM',
                classes: 'btn btn-warning dropdown-toggle'
            },
            2: {
                label: 'HIGH',
                classes: 'btn btn-danger dropdown-toggle'
            }
        };

        this.setStatus = this.setStatus.bind(this);
    }

    setPriority(priorityIndex) {
        let index = this.props.index;
        let projectID = this.props.currentProject;
        let priority = priorityIndex;
        this.props.changeIssuePriority(projectID, index, priority);

    }

    removeThisIssue() {
        let index = this.props.index;
        let projectID = this.props.currentProject;
        let issueID = this.props.id || "empty";
        this.props.deleteIssue(projectID, index, issueID);
    }

    setStatus(statusIndex) {
        let index = this.props.index;
        let projectID = this.props.currentProject;
        let status = statusIndex;
        this.props.changeIssueStatus(projectID, index, status);
    }

    render() {

        let { label } = this.props;
        let workingState = this.workingStates[this.props.status];
        let prioState = this.priorityStates[this.props.priority];

        return (
            <div className="issueitem" id="issue1477665216734">
                <div className="row">

                    <div className="col-sm-6">
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control" aria-label="..." value={label} readOnly="true" />
                            <div className="input-group-btn">

                                <button type="button" className={workingState.classes} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {workingState.label}<span className="caret"></span>
                                </button>

                                <ul className="dropdown-menu">
                                    <li>
                                        <a href="#" onClick={() => this.setStatus(0)}>Open</a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={() => this.setStatus(1)}>Working</a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={() => this.setStatus(2)}>Done</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <div className="input-group input-group-sm">
                            <span className="input-group-addon" id="sizing-addon6">Date</span>
                            <input type="text" className="form-control" aria-describedby="sizing-addon6" readOnly="true" value={this.props.date} />
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <div className="btn-group-sm">
                            <button type="button" style={{width: "80px"}} className={prioState.classes} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {prioState.label}<span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a href="#" onClick={() => this.setPriority(0)}>LOW</a>
                                </li>
                                <li>
                                    <a href="#" onClick={() => this.setPriority(1)}>MEDIUM</a>
                                </li>
                                <li>
                                    <a href="#" onClick={() => this.setPriority(2)}>HIGH</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-sm-1">
                        <div className="btn-group-sm">
                            <button type="button" className="btn btn-default" onClick={this.removeThisIssue.bind(this)}>
                                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        issues: state.issuesReducer.issues,
        currentProject: state.projectsReducer.currentProject
    };
};

const dispatchToProps = (dispatch) => {
    return bindActionCreators(issuesActions, dispatch);
};

export default connect(mapStateToProps, dispatchToProps)(Issue);
