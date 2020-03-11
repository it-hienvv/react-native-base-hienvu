import {connect} from 'react-redux';
import CurrentCustomer from './index';
import {LEFT_APP_TAB_ACTION} from 'actions/actions';

const mapsStateToProps = state => ({
	onDoneSys: state.notificationReducers.onDoneSys,
});

const mapsDispatchToProps = dispatch => ({
	onTabPress: item => dispatch(LEFT_APP_TAB_ACTION.onLeftTabItemPress(item)),
});

export default connect(mapsStateToProps, mapsDispatchToProps)(CurrentCustomer);
