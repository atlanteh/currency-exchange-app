import {put, takeLatest, call} from 'redux-saga/effects';
import {Actions} from 'modules/rates';
import axios from 'services/axios';
import {ActionTypes as GapStepActionTypes} from 'containers/gapstep';

function* fetchRates() {
    yield put(Actions.FETCH_RATES_REQUEST());
    try {
        const {data} = yield call(axios.get, 'latest');
        
        yield put(Actions.FETCH_RATES_SUCCESS(data));
    } catch (err) {
        console.error(err);
        yield put(Actions.FETCH_RATES_FAILURE(err));
    }
}


export default [
    takeLatest(GapStepActionTypes.GAP_STEP_MOUNT, fetchRates),
]