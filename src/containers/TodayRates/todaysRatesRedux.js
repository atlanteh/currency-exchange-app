import {connect} from 'utils/reduxUtils';
import {Selectors as RatesSelectors} from 'modules/rates';
import TodaysRates from './TodayRates';

const mapDispatchToProps = {
};

const mapStateToProps = state => {
    return {
        rates: RatesSelectors.ratesSelector(state),
        sourceRate: RatesSelectors.sourceRateSelector(state),
        rateRatio: RatesSelectors.sourceTargetRatioSelector(state),
        todaysRates: RatesSelectors.todaysRatesSelector(state),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodaysRates);
