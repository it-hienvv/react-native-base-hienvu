import {connect} from 'react-redux';
import LeftAppTab from './index';
import {LEFT_APP_TAB_ACTION} from 'actions/actions';
import {leftTabAppItem} from 'selectors/leftTabAppSelector';

const mapsStateToProps = state => ({
	leftTabAppItem: leftTabAppItem(state),
	clueTabActiveId: state.opportunityReducers.headerOpportunityActiveId,
});

const mapsDispatchToProps = dispatch => ({
	onTabPress: item => dispatch(LEFT_APP_TAB_ACTION.onLeftTabItemPress(item)),
});

export default connect(mapsStateToProps, mapsDispatchToProps)(LeftAppTab);
