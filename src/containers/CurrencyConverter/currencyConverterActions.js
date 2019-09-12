import {createActionTypes, createActionCreators} from 'utils/reduxUtils';

const typesArray = [
    'SOURCE_CURRENCY_CHANGED',
    'UPDATE_RATES',
];

export const ActionTypes = createActionTypes(typesArray);
export const Actions = createActionCreators(typesArray);
