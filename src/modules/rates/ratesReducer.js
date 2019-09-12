import {ActionTypes} from './ratesActions';

const initialValue = {
    historyRangeMap: {},
    historyRangeToggle: '1',
}

const mergeHistoryRange = (state, payload) => {
    const updatedHistoryRange = {...state.historyRangeMap};
    updatedHistoryRange[payload.key] = payload.rates;
    return updatedHistoryRange;
}

export default (state = initialValue, action) => {
    let nextState;
    const {type, payload} = action;
    switch (type) {
    case ActionTypes.FETCH_RATES_REQUEST:
        nextState = {...state, loadingRates: true};
        break;
    case ActionTypes.FETCH_RATES_SUCCESS:
        nextState = {...state, loadingRates: false, rates: payload.rates, lastUpdate: new Date(payload.date)};
        break;
    case ActionTypes.FETCH_RATES_FAILURE:
        nextState = {...state, loadingRates: false, rates: null};
        break;
    case ActionTypes.RATES_UPDATED:
        nextState = {...state, selectedRates: action.payload};
        break;
    case ActionTypes.HISTORICAL_RANGE_TOGGLE_UPDATED:
        nextState = {...state, historyRangeToggle: action.payload};
        break;
    case ActionTypes.FETCH_HISTORY_RANGE_SUCCESS:
        nextState = {...state, historyRangeMap: mergeHistoryRange(state, payload)};
        break;
    default:
        nextState = state;
    }
    return nextState;
};
