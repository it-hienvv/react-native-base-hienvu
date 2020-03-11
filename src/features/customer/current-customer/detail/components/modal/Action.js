import React from 'react';
import {StyleSheet, ViewStyle, View} from 'react-native';
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from 'react-native-popup-menu';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import _ from 'lodash';
import {AppNormalText} from 'components/text';
import ModalContact from '../ModalContact';
import {AppModalManager} from 'components/app-modal/Manager';
import I18nTran from 'assets/language';
import ModalConfirm from 'features/customer/current-customer/current/components/ModalConfirm';
import realmHelper from 'utils/realm/realmHelper';
import realmCollectionName from 'utils/realm/realmCollectionName';
import {APP_CONFIG} from 'contants/contants';

const ACTION_TYPE = {
	call: 1,
	message: 2,
	email: 3,
};
const data = [
	{key: 0, text: 'save'},
	{key: 1, text: 'update'},
	{key: 2, text: 'delete'},
	{key: 3, text: 'remove'},
];
const defaultProps = {
	triggerElement: undefined,
	data: data,
	customElementMenu: undefined,
	disable: false,
	isDisableAllItem: false,
	isMultiChoose: false,
	isShowCount: false,
};

class PopupAction extends React.PureComponent {
	static defaultProps = defaultProps;
	state = {
		type: ACTION_TYPE.call,
	};

	_onClose = () => {
		AppModalManager.hiddenModalWithJSX();
	};

	_onAfterCall = type => () => {
		this.props.onAfterCall(type);
	};

	_getListAccountContacts = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.accountContacts,
			});
		} catch (error) {}
	};

	_getListContacts = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.contacts,
			});
		} catch (error) {}
	};

	_getSysCat = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].SYS_CAT_SCHEMA_NAME
						.sysCat,
			});
		} catch (error) {}
	};

	_getContact = async () => {
		const {item} = this.props;

		const values = await Promise.all([
			this._getListContacts(),
			this._getListAccountContacts(),
			this._getSysCat(),
		]);
		const listAccountContacts = values[0];
		const listContacts = values[1];
		const listSysCat = values[2];
		const contactIds = _.filter(listAccountContacts, [
			'accountId',
			item.accountId,
		]).map(item => item.contactId);

		let contacts = _.filter(listContacts, o =>
			_.includes(contactIds, o.contactId),
		);
		const contactsConverted = contacts.map(item => ({
			...item,
			namePosition:
				(listSysCat &&
					listSysCat.filter(
						element => item.position === element.sysCatId,
					)[0]?.name) ||
				null,
		}));
		let company = [
			{
				fullName: I18nTran.t('phone_company'),
				phone: item.phone,
			},
			{
				fullName: I18nTran.t('email_company'),
				phone: item.email,
			},
		];
		return [...company, ...contactsConverted];
	};

	_onPressMessage = () => {
		let data = undefined;
		let contactsConverted = this._getContact();
		for (let index = 0; index < contactsConverted.length; index++) {
			if (contactsConverted[index].phone) {
				data = (
					<ModalContact
						contactsConverted={contactsConverted}
						title={'send_message'}
						type={ACTION_TYPE.message}
						onAfterCall={this._onAfterCall(ACTION_TYPE.message)}
					/>
				);
				break;
			}
		}
		if (!data) {
			data = (
				<ModalConfirm
					image={'warning'}
					content={`${I18nTran.t('not_number_phone')}`}
					contentDeny={'close'}
					onAccept={this._onEdit}
					onDeny={this._onClose}
				/>
			);
		}
		AppModalManager.showModalWithJSX({data, backDrop: true});
	};

	_onPressCall = () => {
		let data = undefined;
		let contactsConverted = this._getContact();
		for (let index = 0; index < contactsConverted.length; index++) {
			if (contactsConverted[index].phone) {
				data = (
					<ModalContact
						contactsConverted={contactsConverted}
						title={'call'}
						type={ACTION_TYPE.call}
						onAfterCall={this._onAfterCall(ACTION_TYPE.call)}
					/>
				);
				break;
			}
		}
		if (!data) {
			data = (
				<ModalConfirm
					image={'warning'}
					content={`${I18nTran.t('not_number_phone2')}`}
					contentDeny={'close'}
					onAccept={this._onEdit}
					onDeny={this._onClose}
				/>
			);
		}
		AppModalManager.showModalWithJSX({data, backDrop: true});
	};

	_onPressMail = () => {
		let data = undefined;
		let contactsConverted = this._getContact();
		for (let index = 0; index < contactsConverted.length; index++) {
			if (contactsConverted[index].phone) {
				data = (
					<ModalContact
						contactsConverted={contactsConverted}
						title={'send_email'}
						type={ACTION_TYPE.email}
						onAfterCall={this._onAfterCall(ACTION_TYPE.email)}
					/>
				);
				break;
			}
		}
		if (!data) {
			data = (
				<ModalConfirm
					image={'warning'}
					content={`${I18nTran.t('not_email2')}`}
					contentDeny={'close'}
					onAccept={this._onEdit}
					onDeny={this._onClose}
				/>
			);
		}
		AppModalManager.showModalWithJSX({data, backDrop: true});
	};

	_onShowDetail = () => {
		const {onShowDetail} = this.props;
		onShowDetail && onShowDetail();
	};

	_onEdit = () => {
		const {onEdit} = this.props;
		onEdit && onEdit();
		AppModalManager.hiddenModalWithJSX();
	};

	_renderMenu() {
		const {
			triggerElement,
			disable,
			optionsContainerStyle,
		} = this.props;
		return (
			<Menu>
				{triggerElement && (
					<MenuTrigger disabled={disable}>
						{triggerElement}
					</MenuTrigger>
				)}
				<MenuOptions
					optionsContainerStyle={[
						styles.optionsContainerDefault,
						optionsContainerStyle instanceof Array
							? [...optionsContainerStyle]
							: {...optionsContainerStyle},
					]}>
					<MenuOption
						onSelect={this._onPressMessage}
						style={styles.paddingZero}>
						<View style={styles.viewItem}>
							<AppImages
								ImageStyle={styles.imageStyle}
								uri={themes.getImages('actionMessage')}
							/>
							<AppNormalText
								text={'send_message'}
								IStyles={styles.textStyle}
								type={'BODY'}
							/>
						</View>
					</MenuOption>
					<MenuOption
						onSelect={this._onPressCall}
						style={styles.paddingZero}>
						<View style={styles.viewItem}>
							<AppImages
								ImageStyle={styles.imageStyle}
								uri={themes.getImages('actionCall')}
							/>
							<AppNormalText
								text={'call'}
								IStyles={styles.textStyle}
								type={'BODY'}
							/>
						</View>
					</MenuOption>
					<MenuOption
						onSelect={this._onPressMail}
						style={styles.paddingZero}>
						<View style={styles.viewItem}>
							<AppImages
								ImageStyle={styles.imageStyle}
								uri={themes.getImages('actionEmail')}
							/>
							<AppNormalText
								text={'send_email'}
								IStyles={styles.textStyle}
								type={'BODY'}
							/>
						</View>
					</MenuOption>
					<MenuOption style={styles.paddingZero}>
						<View style={styles.viewItem}>
							<AppImages
								ImageStyle={styles.imageStyle}
								uri={themes.getImages('actionCalendar')}
							/>
							<AppNormalText
								text={'create_calendar'}
								IStyles={styles.textStyle}
								type={'BODY'}
							/>
						</View>
					</MenuOption>
					<MenuOption
						style={styles.paddingZero}
						onSelect={this._onShowDetail}>
						<View style={styles.viewItemOnlyText}>
							<AppNormalText
								text={'show_detail'}
								IStyles={styles.textStyle}
								type={'BODY'}
							/>
						</View>
					</MenuOption>
				</MenuOptions>
			</Menu>
		);
	}
	render() {
		return this._renderMenu();
	}
}

const styles = StyleSheet.create({
	viewItemOnlyText: {
		flexDirection: 'row',
		height: 50,
		alignItems: 'center',
		borderColor: themes.getColor('grayBold'),
		borderTopWidth: 1,
		padding: 20,
	},
	textStyle: {color: themes.getColor('textLight')},
	imageStyle: {marginHorizontal: 20},
	paddingZero: {padding: 0},

	wrapAll: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	count: {
		height: 22,
		width: 35,
		borderRadius: 5,
		borderColor: themes.getColor('grayBold'),
		borderWidth: 1,
		marginRight: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	optionsContainerDefault: {
		borderRadius: 5,
		width: 220,
		paddingVertical: 10,
	},
	checkmark: {
		height: 17,
		width: 17,
		marginHorizontal: 10,
	},
	checkBox: {
		marginHorizontal: 10,
	},
	viewItem: {height: 40, flexDirection: 'row', alignItems: 'center', flex: 1},
});

export default PopupAction;
