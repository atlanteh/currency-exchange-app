import { createSelector } from 'reselect';
import config from 'config/config';
import { roundCurrency } from 'utils/cunversionUtils';

export const sliceSelector = (state) => state.rates;
export const ratesMapSelector = createSelector(sliceSelector, slice => slice.rates || {});
export const lastUpdateSelector = createSelector(sliceSelector, slice => slice.lastUpdate);
export const historyToggleSelector = createSelector(sliceSelector, slice => slice.historyRangeToggle);
export const historyRangeMapSelector = createSelector(sliceSelector, slice => slice.historyRangeMap);

export const ratesSelector = createSelector(ratesMapSelector, rates => {
    const ratesResult = Object.keys(rates).map(k => ({
        currency: k,
        rate: rates[k]
    }))
    return ratesResult;
});

const rawSelectedRatesSelector = createSelector(sliceSelector, ratesSelector, (slice, rates) => {
    if (!rates.length) {
        return {};
    }
    if (slice.selectedRates) {
        return slice.selectedRates;
    }

    const defaultSource = rates.find(r => r.currency.toLowerCase() === config.defaultSourceRate.toLowerCase());
    const defaultTarget = rates.find(r => r.currency.toLowerCase() === config.defaultTargetRate.toLowerCase());
    
    return {
        source: {rate: defaultSource, amount: '1000.00'},
        target: {rate: defaultTarget},
    };
});

export const sourceTargetRatioSelector = createSelector(rawSelectedRatesSelector, ratesMapSelector, (selectedRates, ratesMap) => {
    
    const {source, target} = selectedRates;
    if (!source || !target) {
        return -1;
    }

    const sourceRate = ratesMap[source.rate.currency];
    const targetRate = ratesMap[target.rate.currency];
    const conversionRate = roundCurrency(targetRate / sourceRate);
    
    return conversionRate;
});

export const selectedRatesSelector = createSelector(rawSelectedRatesSelector, sourceTargetRatioSelector,
    (selectedRates, rateRatio) => {

    if (rateRatio === -1) {
        return selectedRates;
    }

    const rawTargetAmount = (parseFloat(selectedRates.source.amount, 10) * rateRatio);
    const targetAmount = roundCurrency(rawTargetAmount);
    return {...selectedRates, target: {...selectedRates.target, amount: targetAmount}};
});

export const selectedHistoryRangeSelector = createSelector(historyToggleSelector, historyRangeMapSelector,
    (toggleMonthCount, historyRangeMap) => {
        return historyRangeMap[toggleMonthCount];
    })