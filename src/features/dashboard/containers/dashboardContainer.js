import {connect} from 'react-redux';
import {LEFT_APP_TAB_ACTION} from 'actions/actions';
import Dashboard from './Dashboard';
const mapsStateToProps = state => ({});

const mapsDispatchToProps = dispatch => ({
	onTabPress: item => dispatch(LEFT_APP_TAB_ACTION.onLeftTabItemPress(item)),
});

export default connect(mapsStateToProps, mapsDispatchToProps)(Dashboard);
