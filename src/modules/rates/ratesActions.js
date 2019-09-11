import {createActionTypes, createActionCreators} from 'utils/reduxUtils';

const typesArray = [
    'FETCH_RATES_REQUEST',
    'FETCH_RATES_SUCCESS',
    'FETCH_RATES_FAILURE',
];

export const ActionTypes = createActionTypes(typesArray);
export const Actions = createActionCreators(typesArray);
