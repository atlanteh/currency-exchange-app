import { createSelector } from 'reselect';
import config from 'config/config';
import { roundCurrency, floorCurrency } from 'utils/cunversionUtils';

export const sliceSelector = (state) => state.rates;
export const ratesMapSelector = createSelector(sliceSelector, slice => slice.rates || {});
export const lastUpdateSelector = createSelector(sliceSelector, slice => slice.lastUpdate);
export const historyToggleSelector = createSelector(sliceSelector, slice => slice.historyRangeToggle);
export const historyRangeMapSelector = createSelector(sliceSelector, slice => slice.historyRangeMap);

export const selectedSourceSelector = createSelector(sliceSelector, slice => slice.selectedRates.source);
export const selectedtargetSelector = createSelector(sliceSelector, slice => slice.selectedRates.target);

export const ratesSelector = createSelector(ratesMapSelector, rates => {
    const ratesResult = Object.keys(rates).sort().map(k => ({
        currency: k,
        rate: rates[k]
    }))
    return ratesResult;
});

export const sourceRateSelector = createSelector(ratesMapSelector, selectedSourceSelector, (rates, selected) => {
    const rate = rates[selected.currency];
    return rate && {...selected, rate};
});

export const targetRateSelector = createSelector(ratesMapSelector, selectedtargetSelector, (rates, selected) => {
    const rate = rates[selected.currency];
    return rate && {...selected, rate};
});

const rawSelectedRatesSelector = createSelector(sourceRateSelector, targetRateSelector, (source, target) => {
    return {source, target};
});

export const sourceTargetRatioSelector = createSelector(sourceRateSelector, targetRateSelector, (source, target) => {
    if (!source || !target) {
        return -1;
    }

    const conversionRate = roundCurrency(target.rate / source.rate, config.ratioStep);
    
    return conversionRate;
});

export const selectedRatesSelector = createSelector(rawSelectedRatesSelector, sourceTargetRatioSelector,
    (selectedRates, rateRatio) => {

    if (rateRatio === -1) {
        return selectedRates;
    }

    const rawTargetAmount = (parseFloat(selectedRates.source.amount, 10) * rateRatio);
    const targetAmount = floorCurrency(rawTargetAmount, config.amountStep);
    return {...selectedRates, target: {...selectedRates.target, amount: targetAmount}};
});

export const selectedHistoryRangeSelector = createSelector(historyToggleSelector, historyRangeMapSelector, rawSelectedRatesSelector,
    (toggleMonthCount, historyRangeMap, selectedRates) => {
        const {source, target} = selectedRates;
        if (!source || !target) {
            return null;
        }
        const range = historyRangeMap[`${source.currency},${target.currency}${toggleMonthCount}`];

        if (!range) {
            return null;
        }
        const sourceKey = source.currency;
        const targetKey = target.currency;
        const result = Object.keys(range).sort().map(key => {
            const item = range[key];
            const ratio = roundCurrency(item[targetKey] / item[sourceKey], config.ratioStep);
            return {key, ratio};
        });
        return result;
    })

export const todaysRatesCurrencieSelector = createSelector(selectedSourceSelector, selectedtargetSelector,
    (source, target) => {
        if (!source || !target) {
            return [];
        }
        const defatulRates = config.defaultTodayRates;
        const currencies = defatulRates.map(r => r === source.currency ? 'USD' : r);

        if (source.currency !== 'ILS' && target.currency !== 'ILS') {
            currencies[currencies.length - 1] = 'ILS'
        }
        return currencies;
    }
)

export const todaysRatesSelector = createSelector(todaysRatesCurrencieSelector, sourceRateSelector, ratesMapSelector,
    (todaysCurrencies, sourceRate, ratesMap) => {
        if (!sourceRate) {
            return [];
        }
        return todaysCurrencies.map(tc => {
            const targetRate = ratesMap[tc];
            const rate = roundCurrency(targetRate / sourceRate.rate, config.ratioStep);
            return {currency: tc, rate};
        })
    }
)