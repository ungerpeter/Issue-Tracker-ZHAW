import * as type from '../actions/actionTypes';

const initialState = {
    issues: {
        "project01": [
            {
                date: "01.01.1999",
                label: "Example Issue",
                status: 0,
                priority: 0
            }
        ]
    }
};

export default function issuesReducer(state = initialState, action = {}) {
    switch (action.type) {

        case type.ADD_NEW_ISSUE:
            // can't use let at this point
            var _issues = {...state.issues};
            if(typeof _issues[action.projectID] == 'undefined') {
                _issues[action.projectID] = [];
            }
            _issues[action.projectID] = _issues[action.projectID].concat(action.issue);
            return {...state, issues: _issues};

        case type.DELETE_ISSUE:
            var _issues = {...state.issues};
            if(typeof _issues[action.projectID] == 'undefined') {
                _issues[action.projectID] = [];
            }
            _issues[action.projectID] = _issues[action.projectID].filter((elem, index, arr) => arr.indexOf(elem) !== action.index);
            return {...state, issues: _issues};

        case type.CHANGE_ISSUE_STATUS:
            var _issues = {...state.issues};
            if(typeof _issues[action.projectID][action.index] == 'undefined') {
                return state;
            }
            _issues[action.projectID][action.index] = {..._issues[action.projectID][action.index], status: action.status};
            return {...state, issues: _issues};

        case type.CHANGE_ISSUE_PRIORITY:
            var _issues = {...state.issues};
            if(typeof _issues[action.projectID][action.index] == 'undefined') {
                return state;
            }
            _issues[action.projectID][action.index] = {..._issues[action.projectID][action.index], priority: action.priority};
            return {...state, issues: _issues};

        default:
            return state;
    }
}