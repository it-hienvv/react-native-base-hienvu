import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {AppImages} from 'components/image';
import {AppNormalText} from 'components/text';
import {PADDING_DRAWER} from 'contants/themes/size';
import {NOTIFICATION_ACTION} from 'actions/actions';
import {connect} from 'react-redux';
import ListNotification from './ListNotification';
import NotificationDescription from './NotificationDescription';
import {
	notificationSelector,
	drawerOpenStatusSelector,
} from '../../../selectors/notificationSelector';
import {WIDTH_SCREEN} from 'utils/util';
import themes from 'assets/themes';

interface IProps {
	openNotificationDescriptionStatus: boolean;
	onCloseDrawer: () => void;
}
interface IStates {}
class MainDrawer extends React.PureComponent<IProps, IStates> {
	onTouchStartCloseDrawerWhenViewBlank = () => {
		const {onCloseDrawer} = this.props;
		onCloseDrawer && onCloseDrawer();
	};

	_doNothing = () => {};
	_renderHeader() {
		return (
			<View style={styles.header}>
				<AppNormalText text={'search'} />
				<AppImages uri={themes.getImages('search')} />
			</View>
		);
	}

	_renderListNotification() {
		return <ListNotification />;
	}

	_renderRightDrawer() {
		return (
			<View style={styles.rightDrawer}>
				{this._renderHeader()}
				{this._renderListNotification()}
			</View>
		);
	}

	_renderLeftDrawer() {
		const {openNotificationDescriptionStatus} = this.props;
		return (
			<View style={styles.leftDrawer}>
				<View
					style={styles.firstPieceLeftDrawer}
					onTouchStart={this.onTouchStartCloseDrawerWhenViewBlank}
				/>
				{openNotificationDescriptionStatus && (
					<View style={styles.secondPieceLeftDrawer}>
						<NotificationDescription />
					</View>
				)}
			</View>
		);
	}

	_render() {
		return (
			<View style={styles.container}>
				{this._renderLeftDrawer()}
				{this._renderRightDrawer()}
			</View>
		);
	}

	render() {
		return this._render();
	}
}
const mapsStateToProps = state => ({
	openNotificationDescriptionStatus: notificationSelector(state),
	openDrawerStatus: drawerOpenStatusSelector(state),
});

const mapsDispatchToProps = dispatch => ({
	onCloseDrawer: () => dispatch(NOTIFICATION_ACTION.onClose()),
});

export default connect(mapsStateToProps, mapsDispatchToProps)(MainDrawer);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	header: {
		paddingHorizontal: PADDING_DRAWER,
		paddingVertical: PADDING_DRAWER,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	rightDrawer: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		paddingTop: getStatusBarHeight(),
	},
	leftDrawer: {
		flexDirection: 'row',
		width: (WIDTH_SCREEN * 2) / 3,
		backgroundColor: 'transparent',
	},
	firstPieceLeftDrawer: {flex: 1, backgroundColor: 'transparent'},
	secondPieceLeftDrawer: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: getStatusBarHeight(),
	},
	white: {
		backgroundColor: '#FFFFFF',
	},
});
