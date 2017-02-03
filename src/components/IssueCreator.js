import React, { Component } from 'react';
import md5 from 'md5';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as issuesActions from '../actions/issueActions';

class IssueCreator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: 0,
            priority: 0
        };

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
                label: 'Done',
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
    }

    setLabel(issueLabel) {
        this.setState({
            label: issueLabel
        });
    }

    setStatus(statusIndex) {
        this.setState({
            status: statusIndex
        });
    }

    setPriority(priorityIndex) {
        this.setState({
            priority: priorityIndex
        });
    }

    resetComponent() {
        this.issueLabelInput.value = '';
        this.dateInput.value = '';
        this.setState({status: 0, priority: 0});
    }

    createIssue(e) {
        if (e.key === 'Enter') {
            var uniqueID = md5(this.state.label + Date.now());
            var _issue = {
                id: uniqueID,
                label: this.state.label,
                date: this.dateInput.value,
                status: this.state.status,
                priority: this.state.priority
            };
            this.props.newIssue(_issue, this.props.currentProject);
            this.resetComponent();
        }
    }

    render() {

        let workingState = this.workingStates[this.state.status];
        let priorityState = this.priorityStates[this.state.priority];

        return (
            <div className="issueitem">
                <div className="row">

                    <div className="col-sm-6">
                        <div className="input-group input-group-sm">

                            <input type="text" className="form-control" ref={(input) => this.issueLabelInput = input} onKeyPress={this.createIssue.bind(this)} onChange={(e) => this.setLabel(e.target.value)} />

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
                            <input type="date" ref={(i) => this.dateInput = i} className="form-control" aria-describedby="sizing-addon6" />
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <div className="btn-group-sm">

                            <button type="button" style={{width: "80px"}} className={priorityState.classes} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {priorityState.label}<span className="caret"></span>
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
                            <button type="button" className="btn btn-default" onClick={(e) => console.log(e)}>
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
        issuesReducer: state.issuesReducer,
        currentProject: state.projectsReducer.currentProject
    };
}

const dispatchToProps = (dispatch) => {
    // TODO: read doc from bindActionCreators
    return bindActionCreators(issuesActions, dispatch);
}

// TODO: read doc from connect
export default connect(mapStateToProps, dispatchToProps)(IssueCreator);
