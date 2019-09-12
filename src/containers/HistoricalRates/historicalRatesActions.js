import {createActionTypes, createActionCreators} from 'utils/reduxUtils';

const typesArray = [
    'HISTORY_RANGE_MOUNTED',
    'UPDATE_HISTORY_RANGE_TOGGLE',
];

export const ActionTypes = createActionTypes(typesArray);
export const Actions = createActionCreators(typesArray);
