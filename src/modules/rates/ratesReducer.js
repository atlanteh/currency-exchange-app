import {ActionTypes} from './ratesActions';


export default (state = {}, action) => {
    let nextState;
    const {type, payload} = action;
    switch (type) {
    case ActionTypes.FETCH_RATES_REQUEST:
        nextState = {...state, loadingRates: true};
        break;
    case ActionTypes.FETCH_RATES_SUCCESS:
        nextState = {...state, loadingRates: false, rates: payload};
        break;
    case ActionTypes.FETCH_RATES_FAILURE:
        nextState = {...state, loadingRates: false, rates: null};
        break;
    default:
        nextState = state;
    }
    return nextState;
};
