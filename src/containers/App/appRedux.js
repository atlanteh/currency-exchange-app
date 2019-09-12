import {connect} from 'utils/reduxUtils';
import {Selectors as RatesSelectors} from 'modules/rates';
import App from './App';
import {Actions as AppActions} from './appActions';

const mapDispatchToProps = {
    onMount: AppActions.APP_MOUNTED,
};

const mapStateToProps = state => {
    return {
        rates: RatesSelectors.ratesSelector(state),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
