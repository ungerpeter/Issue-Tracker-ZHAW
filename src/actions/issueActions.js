import * as types from './actionTypes';
import { apiClient } from '../main.js';
import gql from 'graphql-tag';

export function newIssue(_issue, currentProjectID) {
    let issue = { ..._issue, projectID: currentProjectID };

    apiClient.mutate({
        mutation: gql`
            mutation($input: IssueInput!) {
                createNewIssue(input: $input) {
                    id
                    label
                }
            }
        `,
        variables: { input: issue }
    });

    return {
        type: types.ADD_NEW_ISSUE,
        issue: _issue,
        projectID: currentProjectID
    };
}

export function deleteIssue(projectID, index, issueID) {
    console.log("delete issueID: ");
    console.dir(issueID);
    apiClient.mutate({
        mutation: gql`
            mutation($id: String!) {
                deleteIssue(id: $id)
            }
        `,
        variables: { id: issueID }
    });

    return {
        type: types.DELETE_ISSUE,
        projectID: projectID,
        index: index
    }
}

export function changeIssueStatus(projectID, index, status) {
    return {
        type: types.CHANGE_ISSUE_STATUS,
        projectID: projectID,
        index: index,
        status: status
    }
}

export function changeIssuePriority(projectID, index, prio) {
    return {
        type: types.CHANGE_ISSUE_PRIORITY,
        projectID: projectID,
        index: index,
        priority: prio
    }
}