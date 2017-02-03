import * as type from '../actions/actionTypes';

const initialState = {
    projects: [
        {
            projectID: 'project01',
            label: 'Example Project',
        }
    ],
    currentProject: 'project01'
};

export default function projectsReducer(state = initialState, action = {}) {
    switch (action.type) {

        case type.ADD_NEW_PROJECT:
            console.log('action in reducer: ');
            console.dir(action);
            console.log("State in reducer");
            console.dir(state);
            return {...state, projects: state.projects.concat(action.project)};

        case type.SWITCH_CURRENT_PROJECT:
            return {...state, currentProject: action.projectID};

        default:
            return state;
    }
}