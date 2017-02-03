import React, { Component } from 'react';
import md5 from 'md5';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as projectActions from '../actions/projectActions';

class ProjectCreator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectLabel: ''
        }
    }

    createProject(e) {
        var label = this.state.projectLabel;
        var uniqueID = md5(label + Date.now());
        var _project = {
            projectID: uniqueID,
            label: label
        };
        this.props.newProject(_project);
        this.projectLabelInput.value = '';
    }

    updateProjectLabel(e) {
        this.setState({
            ...this.state,
            projectLabel: e.target.value
        });
    }

    submitOnEnter(e) {
        if (e.key === 'Enter') {
            this.createProject();
        }
    }

    render() {
        return (
            <div className="addcontent">
                <div className="input-group input-group-sm" id="addprojecttext">
                    <span className="input-group-addon" id="sizing-addon3">Name</span>

                    <input ref={(input) => this.projectLabelInput = input} onChange={this.updateProjectLabel.bind(this)} type="text" className="form-control" placeholder="Projectname" aria-describedby="sizing-addon3" id="inputname" onKeyPress={this.submitOnEnter.bind(this)} />

                </div>

                <button type="button" className="btn btn-default" aria-label="Add" id="addbutton" onClick={this.createProject.bind(this)}>

                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projectsReducer.projects
    };
}

const dispatchToProps = (dispatch) => {
    // TODO: read doc from bindActionCreators
    return bindActionCreators(projectActions, dispatch);
}

// TODO: read doc from connect
export default connect(mapStateToProps, dispatchToProps)(ProjectCreator);
