import React from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Animated,
	BackHandler,
	TouchableOpacity,
} from 'react-native';
import AppContainer from 'components/container';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import HeaderAnimation from 'components/header-animation';
import {PADDING_COMMON} from 'contants/themes/size';
import BasicInformation from '../components/tab/basicInformation';
import MbRelationShip from '../components/tab/mbRelationShip';
import ControlRisk from '../components/tab/controlRisk';
import realmCollectionName from 'utils/realm/realmCollectionName';
import RealmHelper from 'utils/realm/realmHelper';
import {APP_CONFIG} from 'contants/contants';
import {defaultText} from '../contants';
import ProductAndService from '../components/tab/productAndService';
import {AppAlertOnlyOkayWithOutTranslate, isIos} from 'utils/util';
import ModalConfirm from '../../current/components/ModalConfirm';
import I18nTran from 'assets/language';
import {AppModalManager} from 'components/app-modal/Manager';
import _ from 'lodash';
import ModalContact from '../../current/components/ModalContact';
import {mainNavigationService} from 'routers/managerNavigator';
import Activity from 'features/customer/components/left/Activity';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {SHALLOW_STYLE} from 'contants/themes';
import {AppTextWithoutTranslate} from 'components/text';
import ModalAddActivity from 'features/customer/components/modal-add-activity';
import PubSub from 'pubsub-js';

const listAction = [
	{key: 0, action: 'call', text: 'phone-call', icon: 'telephone'},
	{key: 1, action: 'sms', text: 'SMS', icon: 'chat'},
	{key: 2, action: 'email', text: 'Email', icon: 'mail'},
	{key: 4, action: 'send', text: 'create-plan', icon: 'actionCalendar'},
	{key: 3, action: 'send', text: 'opportunity_sale', icon: 'shop'},
	{key: 5, action: 'send', text: 'control', icon: 'send'},
];

const listPage = [
	{id: 0, title: 'activities'},
	{id: 1, title: 'common-information'},
	{id: 2, title: 'mb-relationship'},
	{id: 3, title: 'control-risk'},
	{id: 4, title: 'product-service'},
];

const floatingAction = [
	{
		id: 1,
		title: I18nTran.t('add_activity'),
	},
	{
		id: 2,
		title: I18nTran.t('add_new_sale_chance'),
	},
	{
		id: 3,
		title: I18nTran.t('update_info'),
	},
];

const ACTION_TYPE = {
	call: 1,
	message: 2,
	email: 3,
};

const HEADER_EXPANDED_HEIGHT = 245;

class DetailCustomer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			indexPage: 1,
			scrollY: new Animated.Value(0),
			information: {
				name: '',
				email: '',
				phone: '',
				code: '',
				fullName: '',
			},
			list: [],
			showOverlay: false,
		};
	}

	componentDidMount() {
		this._onLoadData();
		this._loadListPhoneAndEmail();
		this.removeBackHandle();
	}

	removeBackHandle = () => {
		if (!isIos) {
			this.backHandler = BackHandler.addEventListener(
				'hardwareBackPress',
				this.handleBackPress,
			);
		}
	};

	handleBackPress = () => {
		mainNavigationService.pop();
		return true;
	};

	componentWillUnmount() {
		if (this.backHandler) this.backHandler.remove();
	}

	async _onLoadData() {
		try {
			const {navigation} = this.props;
			const accountId = navigation.getParam('accountId', 0);
			const collection =
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.accounts;
			const information = await RealmHelper.queryByKey({
				collection,
				key: accountId,
			});
			const {list} = this.state;
			if (information) {
				const company = [
					{
						fullName: I18nTran.t('phone_company'),
						phone: information.phone,
						hidden: true,
					},
					{
						fullName: I18nTran.t('email_company'),
						email: information.email,
						hidden: true,
					},
				];
				this.setState({information, list: [...company, ...list]});
			}
		} catch (error) {}
	}

	async _loadListPhoneAndEmail() {
		try {
			const {navigation} = this.props;
			const accountId = navigation.getParam('accountId', 0);
			const collection =
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.accountContacts;
			const queryString = `accountId = '${accountId}'`;
			const listContact = await RealmHelper.queryAllByFiltering({
				collection,
				condition: queryString,
			});
			const contactCollection =
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.contacts;
			const listContactId = listContact.filter(item =>
				Boolean(item.contactId),
			);
			const listPromise = listContactId.map(item =>
				RealmHelper.queryByKey({
					collection: contactCollection,
					key: item.contactId,
				}),
			);
			const positionCollection =
				realmCollectionName[APP_CONFIG.VERSION].SYS_CAT_SCHEMA_NAME
					.sysCatType;
			const listPosition = await RealmHelper.queryAllRealm({
				collection: positionCollection,
			});
			const filterListPosition = listPosition.filter(
				item => item.code === 'SMART_SME_NLH',
			);
			const positionCollectionName =
				realmCollectionName[APP_CONFIG.VERSION].SYS_CAT_SCHEMA_NAME
					.sysCat;
			const allPositionData = await RealmHelper.queryAllRealm({
				collection: positionCollectionName,
			});

			const listPositionData = allPositionData.filter(item =>
				filterListPosition.find(
					ii => ii.sysCatTypeId === item.sysCatTypeId,
				),
			);
			const data = await Promise.all(listPromise);
			const resultData = data.map(item => {
				const findItem = [...listPositionData].find(ii => {
					return +ii.value === item.position;
				});
				if (findItem) {
					return {
						...item,
						position: findItem.name || defaultText,
					};
				} else {
					return {
						...item,
						position: defaultText,
					};
				}
			});
			const {list} = this.state;
			this.setState({
				list: [...list, ...resultData.filter(item => Boolean(item))],
			});
		} catch (error) {}
	}

	onChangeTab = indexPage => this.setState({indexPage});

	_makePhoneCall = () => {
		const {list} = this.state;
		if (list.length > 0) {
			const {list} = this.state;
			const modal = (
				<ModalContact
					contactsConverted={list}
					title={'call'}
					type={ACTION_TYPE.call}
				/>
			);
			AppModalManager.showModalWithJSX({data: modal, backDrop: true});
		} else {
			const modal = (
				<ModalConfirm
					image={'warning'}
					content={`${I18nTran.t('not_number_phone')}`}
					contentDeny={'close'}
					onDeny={() => {
						AppModalManager.hiddenModalWithJSX();
					}}
				/>
			);
			AppModalManager.showModalWithJSX({data: modal, backDrop: true});
		}
	};
	_makeSms = () => {
		const {list} = this.state;
		if (list.length > 0) {
			const {list} = this.state;
			const modal = (
				<ModalContact
					contactsConverted={list}
					title={'send_message'}
					type={ACTION_TYPE.message}
				/>
			);
			AppModalManager.showModalWithJSX({data: modal, backDrop: true});
		} else {
			const modal = (
				<ModalConfirm
					image={'warning'}
					content={`${I18nTran.t('not_number_phone')}`}
					contentDeny={'close'}
					onDeny={() => {
						AppModalManager.hiddenModalWithJSX();
					}}
				/>
			);
			AppModalManager.showModalWithJSX({data: modal, backDrop: true});
		}
	};
	_makeEmail = () => {
		const list = this.state.list.filter(item => item.email);
		if (list.length > 0) {
			const {list} = this.state;
			const modal = (
				<ModalContact
					contactsConverted={list}
					title={'send_email'}
					type={ACTION_TYPE.email}
				/>
			);
			AppModalManager.showModalWithJSX({data: modal, backDrop: true});
		} else {
			const modal = (
				<ModalConfirm
					image={'warning'}
					content={`${I18nTran.t('not_email2')}`}
					contentDeny={'close'}
					onDeny={() => {
						AppModalManager.hiddenModalWithJSX();
					}}
				/>
			);
			AppModalManager.showModalWithJSX({data: modal, backDrop: true});
		}
	};

	handleAction = key => {
		switch (key) {
			case 0:
				this._makePhoneCall();
				return;
			case 1:
				this._makeSms();
				return;
			case 2:
				this._makeEmail();
				return;
			default:
				return AppAlertOnlyOkayWithOutTranslate({
					title: 'Tính năng đang phát triển',
				});
		}
	};

	onScrollViewScroll = y => {
		this.scrollView && this.scrollView.scrollTo({x: 0, y, animated: true});
	};

	_renderTab(Tab) {
		const {scrollY} = this.state;
		return (
			<ScrollView
				ref={refs => (this.scrollView = refs)}
				contentContainerStyle={{
					paddingTop: HEADER_EXPANDED_HEIGHT + PADDING_COMMON,
					paddingBottom: PADDING_COMMON * 2,
				}}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: {
									y: scrollY,
								},
							},
						},
					],
					{
						listener: this._onScroll,
					},
				)}
				scrollEventThrottle={16}>
				{Tab}
			</ScrollView>
		);
	}

	_handlePressFloating = () => {
		this.setState({showOverlay: !this.state.showOverlay});
	};

	_renderFloatingButton = () => {
		if (this.state.indexPage !== 0 && this.state.indexPage !== 1)
			return <View />;
		return (
			<AppImages
				ButtonProps={{
					onPress: this._handlePressFloating,
				}}
				ImageStyle={styles.floatingButtonImage}
				ButtonStyles={[
					styles.floatingButton,
					{
						transform: [
							{rotate: this.state.showOverlay ? '45deg' : '0deg'},
						],
					},
				]}
				uri={themes.getImages('plus')}
			/>
		);
	};

	_handleChangeTab = ({key, i}) => {
		if (this.state.indexPage !== i) {
			this.setState({indexPage: i});
		}
	};

	_handlePressFloatingItem = item => {
		this.setState({showOverlay: false});
		const accountId = this.props.navigation.getParam('accountId', 0);
		if (item.id === 1) {
			const data = (
				<ModalAddActivity
					accountId={accountId}
					leadId={null}
					accountName={this.state?.information?.name || ''}
				/>
			);
			AppModalManager.showModalWithJSX({data, backDrop: true});
		} else if (item.id === 2) {
		} else if (item.id === 3) {
		}
	};

	_renderFloatingItem = (item, index) => {
		const isLastItem = index === floatingAction.length - 1;
		const isFirstItem = index === 0;
		const borderTopColor = isLastItem
			? themes.getColor('grayLight')
			: themes.getColor('transparent');
		const borderTopWidth = isLastItem ? 1 : 0;

		// const paddingTop = isLastItem || isFirstItem ? P

		return (
			<TouchableOpacity
				onPress={() => this._handlePressFloatingItem(item)}>
				<View
					key={item.index}
					style={{
						...styles.floatingActionItem,
						borderTopColor,
						borderTopWidth,
					}}>
					<AppTextWithoutTranslate text={item.title} type={'BODY'} />
				</View>
			</TouchableOpacity>
		);
	};

	_handlePressOverlay = () => {
		this.setState({showOverlay: false});
	};

	_renderOverlay = () => {
		if (!this.state.showOverlay) return <View />;
		return (
			<TouchableOpacity
				style={styles.overlay}
				onPress={this._handlePressOverlay}>
				<View style={styles.floatingActionContainer}>
					{floatingAction.map(this._renderFloatingItem)}
				</View>
			</TouchableOpacity>
		);
	};

	_onScroll = ({nativeEvent}) => {
		if (nativeEvent) {
			const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
			const paddingToBottom = 20;
			if (
				layoutMeasurement.height + contentOffset.y >=
					contentSize.height - paddingToBottom &&
				this.state.indexPage == 0
			) {
				console.log('Reach end');
				PubSub.publish('ACTIVITY_REACH_END');
			}
		}
	};

	render() {
		const {indexPage, scrollY, information, list} = this.state;
		const {navigation} = this.props;
		const accountId = navigation.getParam('accountId', 0);
		let name = '';
		if (information.code) name += `${information.code} - `;
		if (information.name) name += information.name;
		if (information.fullName) name += ` - ${information.fullName}`;
		return (
			<AppContainer ContainerStyles={styles.containerStyles}>
				<HeaderAnimation
					title={name || defaultText}
					segmentation={'Hiện hữu'}
					listAction={listAction}
					scrollY={scrollY}
					indexPage={indexPage}
					listPage={listPage}
					onChangeTab={this.onChangeTab}
					handleAction={this.handleAction}
				/>
				<ScrollableTabView
					style={{width: '100%'}}
					initialPage={indexPage}
					renderTabBar={() => <View style={{width: 0, height: 0}} />}
					tabBarUnderlineStyle={{backgroundColor: '#fff'}}
					page={indexPage}
					onChangeTab={this._handleChangeTab}
					locked={true}>
					{this._renderTab(
						<Activity
							accountId={accountId}
							leadId={null}
							accountName={this.state?.information?.name || ''}
						/>,
					)}
					{this._renderTab(
						<BasicInformation list={list} accountId={accountId} />,
					)}
					{this._renderTab(<MbRelationShip accountId={accountId} />)}
					{this._renderTab(<ControlRisk accountId={accountId} />)}
					{this._renderTab(
						<ProductAndService
							accountId={accountId}
							onScrollViewScroll={this.onScrollViewScroll}
						/>,
					)}
				</ScrollableTabView>
				{this._renderFloatingButton()}
				{this._renderOverlay()}
			</AppContainer>
		);
	}
}

export default DetailCustomer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerStyles: {
		paddingHorizontal: 0,
		paddingTop: 0,
	},
	floatingButton: {
		position: 'absolute',
		bottom: 70,
		right: 50,
		zIndex: 1000,
		...SHALLOW_STYLE,
		width: 60,
		height: 60,
		borderRadius: 30,
	},
	floatingButtonImage: {
		width: 60,
		height: 60,
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 100,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	floatingActionContainer: {
		borderRadius: 4,
		backgroundColor: themes.getColor('white'),
		position: 'absolute',
		bottom: 150,
		right: 20,
	},
	floatingActionItem: {
		paddingHorizontal: PADDING_COMMON,
		paddingVertical: 12,
		minWidth: 220,
	},
});
