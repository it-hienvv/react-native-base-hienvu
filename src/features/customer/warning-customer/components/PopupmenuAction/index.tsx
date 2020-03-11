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
import {AppTextWithoutTranslate, AppNormalText} from 'components/text';
import {makePhoneSMS, makePhoneCall, makePhoneEmail} from 'utils/util';
import ModalContact from '../ModalContact';
import {AppModalManager} from 'components/app-modal/Manager';
import {ACTION_TYPE} from '../../contants';
import ModalConfirm from '../ModalConfirm';
import I18nTran from 'assets/language';

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
interface PopupData {
	key: string;
	text: string;
	disable?: boolean;
}
interface IProps {
	triggerElement: React.ReactNode | undefined; // button for show
	data: Array<PopupData>;
	customElementMenu?: React.ReactNode | undefined; // element,
	onPress?: (item: PopupData) => void;
	disable?: boolean;
	optionsContainerStyle?: ViewStyle | ViewStyle[];
	flatListStyle?: ViewStyle | ViewStyle[];
	selectedIndex?: number;
	isDisableAllItem?: boolean;
	isMultiChoose?: boolean;
	isShowCount?: boolean;
	onShowDetail?: () => void;
	listContacts?: Array<any>;
	listLeadContacts?: Array<any>;
	listSysCat?: Array<any>;
	item?: any;
	onEdit?: Function;
	onAfterCall?: Function;
}
interface IStates {}

class PopupAction extends React.PureComponent<IProps, IStates> {
	static defaultProps = defaultProps;
	state: IStates = {
		type: ACTION_TYPE.call,
	};

	_onPress = item => () => {
		if (this.props.onPress) {
			this.props.onPress(item);
		} else {
			alert('Truyền onPress props di');
		}
	};

	_onClose = () => {
		AppModalManager.hiddenModalWithJSX();
	};

	_onAfterCall = type => () => {
		console.log('_onAfterCall popup action', type, this.props.onAfterCall);
		this.props.onAfterCall(type);
	};

	_getContact = () => {
		const {listLeadContacts, item, listContacts, listSysCat} = this.props;
		console.log('Item', item);
		let contactIds = [];
		if (item.leadId) {
			contactIds = _.filter(listLeadContacts, [
				'leadId',
				item.leadId,
			]).map(item => item.contactId);
		} else {
			contactIds = _.filter(listLeadContacts, [
				'accountId',
				item.accountId,
			]).map(item => item.contactId);
		}

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
				email: item.email,
			},
		];
		return [...company, ...contactsConverted];
	};

	// _getContact = () => {
	//     const { listLeadContacts, item, listContacts, listSysCat } = this.props;
	//     let contactIds = [];
	//     if (item.leadId) {
	//         contactIds = _.filter(listLeadContacts, [
	//             'leadId',
	//             item.leadId,
	//         ]).map(item => item.contactId);
	//     } else {
	//         contactIds = _.filter(listLeadContacts, [
	//             'accountId',
	//             item.accountId,
	//         ]).map(item => item.contactId);
	//     }
	//     let contacts = _.filter(listContacts, o =>
	//         _.includes(contactIds, o.contactId),
	//     );

	//     console.log('listLeadContacts', contactIds, listLeadContacts.map(item => ({ ...item })));
	//     console.log('item', item);
	//     console.log('listContacts', contacts, listContacts.map(item => ({ ...item })));
	//     const contactsConverted = contacts.map(item => ({
	//         ...item,
	//         namePosition:
	//             (listSysCat &&
	//                 listSysCat.filter(
	//                     element => item.position === element.sysCatId,
	//                 )[0]?.name) ||
	//             null,
	//     }));
	//     return contactsConverted;
	// };

	_onPressMessage = () => {
		// console.log('_onPressMessage', ACTION_TYPE.message);
		// this._onAfterCall(ACTION_TYPE.message)();
		let data = undefined;
		let contactsConverted = this._getContact();
		console.log(contactsConverted);
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
					content={`${I18nTran.t('not_number_phone2')}`}
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
		console.log(contactsConverted);
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
		console.log('contactsConverted', contactsConverted);
		for (let index = 0; index < contactsConverted.length; index++) {
			if (contactsConverted[index].email) {
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
			flatListStyle,
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
								ButtonProps={{disabled: true}}
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
								ButtonProps={{disabled: true}}
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
								ButtonProps={{disabled: true}}
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
								ButtonProps={{disabled: true}}
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
		alignItems: 'flex-start',
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
