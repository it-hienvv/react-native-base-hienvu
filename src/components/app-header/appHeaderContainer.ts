import {connect} from 'react-redux';
import AppHeader from './index';
import {leftTabAppItem} from 'selectors/leftTabAppSelector';

const mapsStateToProps = state => ({
	leftTabAppItem: leftTabAppItem(state),
});

const mapsDispatchToProps = dispatch => ({});

export default connect(mapsStateToProps, mapsDispatchToProps)(AppHeader);
