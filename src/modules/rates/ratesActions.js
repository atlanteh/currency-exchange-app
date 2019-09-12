import {createActionTypes, createActionCreators} from 'utils/reduxUtils';

const typesArray = [
    'FETCH_RATES_REQUEST',
    'FETCH_RATES_SUCCESS',
    'FETCH_RATES_FAILURE',

    'FETCH_HISTORY_RANGE_REQUEST',
    'FETCH_HISTORY_RANGE_SUCCESS',
    'FETCH_HISTORY_RANGE_FAILURE',

    'RATES_UPDATED',
    'HISTORICAL_RANGE_TOGGLE_UPDATED'
];

export const ActionTypes = createActionTypes(typesArray);
export const Actions = createActionCreators(typesArray);
