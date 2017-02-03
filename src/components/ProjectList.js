import React, {Component} from 'react';
import Project from './Project';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as projectActions from '../actions/projectActions';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class ProjectList extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.data.loading) {
            newProps.data.projects.map((newProject) => {
                let p = newProps.projects.filter((p) => { return p.projectID == newProject.id });
                if(p.length < 1) {
                    this.props.newProject({ projectID: newProject.id, label: newProject.label });
                }
            });
        }
    }

    render() {
        return (
            <div className="projectcontainer">
                <div id="loader1"></div>
                <ul className="nav nav-pills nav-stacked" id="projectlist">
                    {this.props.projects.map((projectData, index) => (
                        <li role="presentation" onClick={() => this.props.switchProject(projectData.projectID)}
                            key={"p-key-" + index.toString()}>
                            <a href="#">
                                <Project label={projectData.label} index={index}/>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

//TODO: Dynamic badges

const mapStateToProps = (state) => {
    return {
        projects: state.projectsReducer.projects,
        currentProject: state.projectsReducer.currentProject
    };
};

const dispatchToProps = (dispatch) => { return bindActionCreators(projectActions, dispatch); };

const MyQuery = gql`
    query Query { 
        projects { 
            id,
            label
        } 
    }
`;

export default compose(
    graphql(MyQuery),
    connect(mapStateToProps, dispatchToProps)
)(ProjectList);