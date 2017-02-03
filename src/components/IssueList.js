let regeneratorRuntime =  require("regenerator-runtime");
import React, {Component} from 'react';
import Issue from './Issue';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as issuesActions from '../actions/issueActions';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { store } from '../main';

class IssueList extends Component {

    constructor(props) {
        super(props);
        this.progressBarValues = {
            low: 0,
            medium: 0,
            high: 0
        };
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.data.loading) {
            console.dir(newProps.data);
            console.dir(newProps);
            newProps.data.issues.map((newIssue) => {
                let i = [];
                try {
                    i = newProps.issues[newProps.currentProject].filter((i) => { return i.id == newIssue.id });
                } catch(err) {
                    console.log(err);
                }
                if(i.length < 1) {
                    var _issue = {
                        id: newIssue.id,
                        label: newIssue.label,
                        date: newIssue.value,
                        status: newIssue.status,
                        priority: newIssue.priority
                    };
                    this.props.newIssue(_issue, this.props.currentProject);
                }
            });
        }
    }

    updateProgressBar(issues) {
        let {low, medium, high} = {low: 0, medium: 0, high: 0};
        let finishedIssues = issues.filter((p) => { if(p.status != 2) return p});
        finishedIssues.forEach((issue) => {
            switch(issue.priority) {
                case 0:
                    low += 1 / issues.length * 100;
                    break;
                case 1:
                    medium += 1 / issues.length * 100;
                    break;
                case 2:
                    high += 1 / issues.length * 100;
                    break;
            }
        });

        return {low, medium, high};
    }

    render() {
        console.log(this.props);

        let issues = this.props.issues[this.props.currentProject] || [];
        let pbv = this.updateProgressBar(issues);

        if (typeof issues == 'undefined' || issues.length <= 0) {
            return <h2>no issue found..</h2>
        }

        return (
            <div>
                <div className="row">
                    <div className="col-xs-10">
                        <div className="progress">
                            <div className="progress-bar progress-bar-primary progress-bar-striped active" style={{width: pbv.low + '%'}}></div>
                            <div className="progress-bar progress-bar-warning progress-bar-striped active" style={{width: pbv.medium + '%'}}></div>
                            <div className="progress-bar progress-bar-danger progress-bar-striped active" style={{width: pbv.high + '%'}}></div>
                        </div>
                    </div>
                </div>

                <div className="issues">
                    {console.dir(issues)}
                    {issues.map((issueData, index) => (
                        <Issue label={issueData.label} id={issueData.id} index={index} status={issueData.status} priority={issueData.priority}
                               date={issueData.date} key={"i-key-" + index.toString()}/>
                    ))}
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

const MyQuery = gql`
    query Query($currentProjectID: String!) { 
        issues(projectID: $currentProjectID) { 
            id,
            label,
            date,
            status,
            priority
        } 
    }
`;

export default compose(
    graphql(MyQuery, {
        options: ({ currentProjectID }) => ({ variables: { currentProjectID: currentProjectID } }),
    }),
    connect(mapStateToProps, dispatchToProps)
)(IssueList);

console.log("log store:");
console.dir(store);