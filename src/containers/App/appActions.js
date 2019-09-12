import {createActionTypes, createActionCreators} from 'utils/reduxUtils';

const typesArray = [
    'APP_MOUNTED',
];

export const ActionTypes = createActionTypes(typesArray);
export const Actions = createActionCreators(typesArray);
