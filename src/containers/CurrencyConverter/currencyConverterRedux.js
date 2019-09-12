import {connect} from 'utils/reduxUtils';
import {Selectors as RatesSelectors} from 'modules/rates';
import CurrencyConverter from './CurrencyConverter';
import {Actions} from './currencyConverterActions';

const mapDispatchToProps = {
    onMount: Actions.APP_MOUNTED,
    onRatesChange: Actions.UPDATE_RATES,
};

const mapStateToProps = state => {
    return {
        rates: RatesSelectors.ratesSelector(state),
        selectedRates: RatesSelectors.selectedRatesSelector(state),
        rateRatio: RatesSelectors.sourceTargetRatioSelector(state),
        lastUpdate: RatesSelectors.lastUpdateSelector(state),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter);
