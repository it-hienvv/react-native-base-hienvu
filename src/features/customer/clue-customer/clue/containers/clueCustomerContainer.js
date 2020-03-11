import {connect} from 'react-redux';
import Clue from './index';
import {LEFT_APP_TAB_ACTION} from 'actions/actions';
import {reloadClueDataSelectedId} from '../selector/opportunitySelectors';
import {reloadClue} from '../actions/actions';

const mapsStateToProps = state => ({
	reloadClueData: reloadClueDataSelectedId(state),
});

const mapsDispatchToProps = dispatch => ({
	onTabPress: item => dispatch(LEFT_APP_TAB_ACTION.onLeftTabItemPress(item)),
	onReloadClueData: reloadClueData => dispatch(reloadClue(reloadClueData)),
});

export default connect(mapsStateToProps, mapsDispatchToProps)(Clue);
