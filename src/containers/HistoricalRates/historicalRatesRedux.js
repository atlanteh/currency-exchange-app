import {connect} from 'utils/reduxUtils';
import {Selectors as RatesSelectors} from 'modules/rates';
import HistoricalRates from './HistoricalRates';
import {Actions} from './historicalRatesActions';

const mapDispatchToProps = {
    onToggleChange: Actions.UPDATE_HISTORY_RANGE_TOGGLE,
    onMount: Actions.HISTORY_RANGE_MOUNTED,
    refreshGraph: Actions.REFRESH_GRAPH,
};

const mapStateToProps = state => {
    return {
        selectedRates: RatesSelectors.selectedRatesSelector(state),
        toggleValue: RatesSelectors.historyToggleSelector(state),
        historyRange: RatesSelectors.selectedHistoryRangeSelector(state),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoricalRates);
