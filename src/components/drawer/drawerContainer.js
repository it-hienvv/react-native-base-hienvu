import {connect} from 'react-redux';
import AppDrawer from './index';
import {NOTIFICATION_ACTION} from 'actions/actions';
import {drawerOpenStatusSelector} from '../../selectors/notificationSelector';
const mapsStateToProps = state => ({
	openDrawerStatus: drawerOpenStatusSelector(state),
});

const mapsDispatchToProps = dispatch => ({
	onOpen: () => dispatch(NOTIFICATION_ACTION.onOpenDrawer()),
	onClose: () => dispatch(NOTIFICATION_ACTION.onClose()),
});

export default connect(mapsStateToProps, mapsDispatchToProps)(AppDrawer);
