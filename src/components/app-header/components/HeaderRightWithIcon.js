import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import IconWithBagger from './IconWithBagger';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import AppPopupMenu from 'components/popup-menu';
import {connect} from 'react-redux';
import {NOTIFICATION_ACTION} from 'actions/actions';
import {AUTHENTICATION_STACK} from 'routers/screenNames';
import {mainNavigationService} from 'routers/managerNavigator';
import {AppAlertOnlyOkayWithOutTranslate} from 'utils/util';
import themes from 'assets/themes';
import ViewSys from 'features/Login/components/ViewSys';
import {AppModalManager} from 'components/app-modal/Manager';
import AppSys from 'utils/sys';
import {SYS_ACTION} from 'actions/actions';
import realmHelper from 'utils/realm/realmHelper';
import realmCollectionName from 'utils/realm/realmCollectionName';
import {APP_CONFIG} from 'contants/contants';
import {TOOL_ACTION} from 'features/sale-kit/product-and-service/actions/actions';
const height = 30;
const itemSpace = 10;
const defaultProps = {
	IStyles: {},
};
const propTypes = {
	IStyles: PropTypes.object,
};

const menuList = [
	{key: 0, text: 'Logout'},
	{key: 1, text: 'Đồng bộ dữ liệu'},
	{key: 2, text: 'delete'},
	{key: 3, text: 'remove'},
];

class HeaderRightWithIcon extends React.PureComponent {
	static defaultProps = defaultProps;
	static propTypes = propTypes;
	state = {
		isCBQL: false,
	};

	componentDidMount = async () => {
		let userInfo = await this._getUserInfo();
		userInfo.length &&
			userInfo[0].employeeType === 'CBQL' &&
			this.setState({isCBQL: true});
	};

	_onPress = async item => {
		if (item.key === 0) {
			mainNavigationService.navigate(AUTHENTICATION_STACK);
		} else if (item.key === 1) {
			const viewSys = <ViewSys />;
			AppModalManager.showModalWithJSX({data: viewSys, backDrop: false});
			const isDone = await AppSys.appSysListItem({
				isManualSys: true,
				callbackSetState: ({count, total}) => {
					this.props.onProgress &&
						this.props.onProgress(`${count}/${total}`);
				},
			});
			this.props.onDone && this.props.onDone();
			AppModalManager.hiddenModalWithJSX();
		} else {
			AppAlertOnlyOkayWithOutTranslate({
				title: 'Tính năng đang cập nhập',
				onPressOK: () => {},
			});
		}
		return;
	};

	_getUserInfo = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.currentUserInfo,
			});
		} catch (error) {}
	};

	onOpenDrawer = () => {
		this.props.openMainDrawer && this.props.openMainDrawer();
	};
	onShowMenu = () => {
		this.props.onShowMenu && this.props.onShowMenu();
	};
	onPressIconUser = () => {};
	render() {
		const {IStyles} = this.props;
		const data = [
			<IconWithBagger
				bagger
				IStyles={{marginRight: itemSpace}}
				ImageStyles={{marginBottom: 5}}
				uri={themes.getImages('cake')}
				key={'4'}
			/>,
			<IconWithBagger
				onPress={this.onShowMenu}
				bagger
				IStyles={{marginRight: itemSpace}}
				uri={themes.getImages('tableCalculator')}
				key={'1'}
			/>,
			<IconWithBagger
				onPress={this.onOpenDrawer}
				bagger
				IStyles={{marginRight: itemSpace}}
				uri={themes.getImages('alert')}
				key={'2'}
			/>,
			<IconWithBagger
				onPress={this.onPressIconUser}
				IStyles={{marginRight: itemSpace, marginBottom: 5}}
				uri={
					this.state.isCBQL
						? themes.getImages('iconCbql')
						: themes.getImages('iconRm')
				}
				key={'3'}
			/>,
			<AppPopupMenu
				onPress={this._onPress}
				key={'5'}
				data={menuList}
				triggerElement={
					<IconWithBagger
						disable={true}
						IStyles={{marginRight: itemSpace}}
						uri={themes.getImages('threeDot')}
						key={'5'}
					/>
				}
			/>,
		];
		return (
			<View style={[styles.container, {...IStyles}]}>
				{data.map(item => item)}
			</View>
		);
	}
}
const mapsStateToProps = state => ({});

const mapsDispatchToProps = dispatch => ({
	onShowMenu: () => dispatch(TOOL_ACTION.onShowMenu()),
	openMainDrawer: () => dispatch(NOTIFICATION_ACTION.onOpenDrawer()),
	onProgress: progress => dispatch(SYS_ACTION.onSetProgress(progress)),
	onDone: () => dispatch(SYS_ACTION.onDoneSys()),
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps,
)(HeaderRightWithIcon);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: height,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: isIphoneX() ? getStatusBarHeight() : 0,
	},
});
