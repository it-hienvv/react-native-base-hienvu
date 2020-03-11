import {connect} from 'react-redux';
import {LEFT_APP_TAB_ACTION} from 'actions/actions';
import WarningCustomer from './index';

const mapsStateToProps = state => ({
	onDoneSys: state.notificationReducers.onDoneSys,
});

const mapsDispatchToProps = dispatch => ({
	onTabPress: item => dispatch(LEFT_APP_TAB_ACTION.onLeftTabItemPress(item)),
});

export default connect(mapsStateToProps, mapsDispatchToProps)(WarningCustomer);
