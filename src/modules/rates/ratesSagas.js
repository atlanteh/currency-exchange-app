import {put, takeLatest, call, select, take, fork} from 'redux-saga/effects';
import {Actions, ActionTypes, Selectors} from 'modules/rates';
import axios from 'services/axios';
import {ActionTypes as AppActionTypes} from 'containers/App/appActions';
import {ActionTypes as CurrencyConverterTypes} from 'containers/CurrencyConverter';
import {ActionTypes as HistoricalRatesTypes} from 'containers/HistoricalRates';
import { formatDateLexicographically } from 'utils/cunversionUtils';

function* fetchRates() {
    yield put(Actions.FETCH_RATES_REQUEST());
    try {
        const {data} = yield call(axios.get, 'latest?base_currency=EUR');
        
        yield put(Actions.FETCH_RATES_SUCCESS(data.data));
    } catch (err) {
        console.error(err);
        yield put(Actions.FETCH_RATES_FAILURE(err));
    }
}

function* fetchHistoryRange() {
    try {
        const historyRange = yield select(Selectors.selectedHistoryRangeSelector);
        if (historyRange) {
            return;
        }
        yield put(Actions.FETCH_HISTORY_RANGE_REQUEST());

        const rates = yield select(Selectors.ratesSelector);
        if (!rates.length) {
            yield take(ActionTypes.FETCH_RATES_SUCCESS);
        }
        const {source, target} = yield select(Selectors.selectedRatesSelector);
        const monthsBackCount = yield select(Selectors.historyToggleSelector);
        const symbols = `${source.currency},${target.currency}`
        const endAt = new Date();
        endAt.setDate(endAt.getDate() - 1)

        const startAt = new Date(endAt.getFullYear(), endAt.getMonth() - monthsBackCount, endAt.getDate());

        const params = {
            base_currency: source.currency,

            currencies: target.currency,
            date_from: formatDateLexicographically(startAt),
            date_to: formatDateLexicographically(endAt),
        }
        const {data} = yield call(axios.get, 'historical', {params});

        const historicalRates = Object.keys(data.data).map(key => ({key, rate: data.data[key][target.currency]}))
        const key = symbols + monthsBackCount;
        yield put(Actions.FETCH_HISTORY_RANGE_SUCCESS({rates: historicalRates, key}));
    } catch (err) {
        console.error(err);
        yield put(Actions.FETCH_HISTORY_RANGE_FAILURE(err));
    }
}

function* updateRates(action) {
    // Seperate UI logic from Reducer logic
    yield put(Actions.RATES_UPDATED(action.payload));
}

function* updateHistoricalRates(action) {
    // Seperate UI logic from Reducer logic
    yield put(Actions.HISTORICAL_RANGE_TOGGLE_UPDATED(action.payload));
    yield fork(fetchHistoryRange);
}


export default [
    takeLatest(AppActionTypes.APP_MOUNTED, fetchRates),
    takeLatest(CurrencyConverterTypes.UPDATE_RATES, updateRates),
    takeLatest(HistoricalRatesTypes.UPDATE_HISTORY_RANGE_TOGGLE, updateHistoricalRates),
    takeLatest([HistoricalRatesTypes.HISTORY_RANGE_MOUNTED, HistoricalRatesTypes.REFRESH_GRAPH], fetchHistoryRange),
]