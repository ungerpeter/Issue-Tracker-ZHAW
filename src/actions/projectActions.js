import * as types from './actionTypes';


// Define trip action creators

export function newProject(_project) {
    let newProject = {
        type: types.ADD_NEW_PROJECT,
        project: {..._project}
    };
    return newProject;
}


export function switchCurrentProject(projectID) {
    return {
        type: types.SWITCH_CURRENT_PROJECT,
        projectID: projectID
    };
}
