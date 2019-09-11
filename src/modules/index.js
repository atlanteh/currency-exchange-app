import { combineReducers } from 'redux';
import {reducer as ratesReducer, Sagas as ratesSagas} from 'modules/rates';
import { all } from 'redux-saga/effects'

export const getRootReducer = (_options) => combineReducers({
  rates: ratesReducer,
})

export function * rootSaga() {
  yield all([
      ...ratesSagas,
  ])
}