import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import AppContainer from 'components/container';
import {AppTextWithoutTranslate} from 'components/text';
import {AppImages} from 'components/image';
import {BODY_APP_WITH, PADDING_COMMON} from 'contants/themes/size';
import {SHALLOW_STYLE} from 'contants/themes';
import {
	HEIGHT_SCREEN,
	AppAlertOnlyOkay,
	AppAlertOnlyOkayWithOutTranslate,
	WIDTH_SCREEN,
} from 'utils/util';
import {APP_CONFIG} from 'contants/contants';
import ClueCustomer from '../components/ClueCustomer/ClueCustomer';
import themes from 'assets/themes';
import I18nTran from 'assets/language';
import AppPopupMenuWithCheck from 'components/popup-menu-with-check';
import {
	STATUS_CHANGE_MULTIPLE,
	ID_PAUSE,
	ID_REJECT,
	STATUS_CHANGE_ONE,
	ID_NOT_RESEARCH_YET,
	ID_RESEARCHING,
} from '../contants';
import {AppButton} from 'components/button';
import ModalDeny from '../components/ModalDeny';
import {AppModalManager} from 'components/app-modal/Manager';
import {customerApi} from 'networks/apis/extension';
import _ from 'lodash';
import ModalPause from '../components/ModalPause';
import realmHelper from 'utils/realm/realmHelper';
import realmCollectionName from 'utils/realm/realmCollectionName';
import ConfirmViewAfterCall from 'components/confirm-after-call';
import EmptyComp from 'components/empty-comp';
import {NavigationEvents} from 'react-navigation';

const headerMarginTop = 100;
const plusMarginLeft = 10;
const marginSpacing = 30;
const marginHorizontal = 20;
const initColumn = 3;
const chartWidth =
	(BODY_APP_WITH -
		marginHorizontal * 2 * (initColumn - 1) -
		marginHorizontal) /
	initColumn;
const borderRadius = 10;
const tableHeight = HEIGHT_SCREEN / 2;
class Clue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			load: true,
			listChoosedClue: [],
			listChoosedAccount: [],
			statusToChange: 0,
			isShowViewResult: false,
			itemChangedStatus: null,
			statusToChangeOne: null,
			isShowAfterCall: false,
			item: null,
			type: null,
		};
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({load: false});
		}, 1000);
	}

	UNSAFE_componentWillReceiveProps(nextProps, prevState) {
		if (!_.isEqual(nextProps.reloadClueData, this.props.reloadClueData)) {
			this.setState({
				listChoosedClue: [],
				listChoosedAccount: [],
				statusToChange: 0,
			});
		}
	}

	_onClearChoosed = () => {
		this.setState({
			listChoosedClue: [],
			listChoosedAccount: [],
		});
	};

	_onPressChooseItem = item => {
		if (item.leadId) {
			let tempListChoosedCustomer = this.state.listChoosedClue;
			let i = tempListChoosedCustomer.indexOf(item.leadId);
			if (i > -1) {
				tempListChoosedCustomer.splice(i, 1);
			} else {
				tempListChoosedCustomer.push(item.leadId);
			}
			this.setState({listChoosedClue: tempListChoosedCustomer});
		} else {
			let tempListChoosedAccount = this.state.listChoosedAccount;
			let i = tempListChoosedAccount.indexOf(item.accountId);
			if (i > -1) {
				tempListChoosedAccount.splice(i, 1);
			} else {
				tempListChoosedAccount.push(item.accountId);
			}
			this.setState({listChoosedAccount: tempListChoosedAccount});
		}
	};

	_onChangeDone = (isSuccess = true) => {
		let title = '';
		if (isSuccess) {
			title = 'update_customer_success';
		} else {
			title = 'update_customer_error';
		}
		AppToastManager.show({message: I18nTran.t(title), timerShow: 1000});
	};

	_keyExtractor = (item, index) => `${index}`;

	_onChangeMulti = () => {
		if (this.state.statusToChange === ID_PAUSE) {
			const data = (
				<ModalPause
					isMultiple={true}
					listChoosedClue={this.state.listChoosedClue}
					listChoosedAccount={this.state.listChoosedAccount}
				/>
			);
			AppModalManager.showModalWithJSX({data, backDrop: true});
		} else if (this.state.statusToChange === ID_REJECT) {
			const data = (
				<ModalDeny
					isMultiple={true}
					listChoosedClue={this.state.listChoosedClue}
					listChoosedAccount={this.state.listChoosedAccount}
				/>
			);
			AppModalManager.showModalWithJSX({data, backDrop: true});
		} else {
			AppAlertOnlyOkay({
				title: 'you_do_not_choose_status',
			});
		}
	};

	async _onChangeStatusNotReason(statusChoosed, item) {
		let objectChange = {
			lstLeadId: item.leadId ? [item.leadId] : [],
			lstAccountId: item.accountId ? [item.accountId] : [],
			smeStatusId: statusChoosed.key,
		};
		AppModalManager.showLoading();
		const response = await customerApi.changeStatus(objectChange);
		AppModalManager.hiddenModalWithJSX();
		console.log(response);
		if (response.code === 0) {
			if (response.data.length && response.data[0].status) {
				this.setState({
					isShowViewResult: true,
					itemChangedStatus: item,
					statusToChangeOne: statusChoosed.key,
				});

				let itemSuccess = response.data[0];
				// Update data
				this.props.onReloadClueData({
					leadSuccess: itemSuccess.leadId ? [itemSuccess.leadId] : [],
					accountSuccess: itemSuccess.accountId
						? [itemSuccess.accountId]
						: [],
					type: ID_RESEARCHING,
				});

				// Update realm
				if (itemSuccess.leadId) {
					realmHelper
						.update({
							collection:
								realmCollectionName[APP_CONFIG.VERSION]
									.CUSTOMER_SCHEMA_NAME.leads,
							data: {
								leadId: itemSuccess.leadId,
								smeStatusId: ID_RESEARCHING,
							},
						})
						.then(response => {})
						.catch(err => {});
				} else {
					realmHelper
						.update({
							collection:
								realmCollectionName[APP_CONFIG.VERSION]
									.CUSTOMER_SCHEMA_NAME.accounts,
							data: {
								accountId: itemSuccess.accountId,
								smeStatusId: ID_RESEARCHING,
							},
						})
						.then(response => {})
						.catch(err => {});
				}
			} else {
				AppAlertOnlyOkay({
					title: 'change_status_failed',
					onPressOK: () => {},
				});
			}
		} else {
			AppAlertOnlyOkayWithOutTranslate({
				title: response.message,
				onPressOK: () => {},
			});
		}
	}

	_onCloseViewResult = () => {
		this.setState({
			isShowViewResult: false,
			itemChangedStatus: null,
			statusToChangeOne: null,
		});
	};

	_onUpdate = () => {
		this.clueCustomer._onEdit(this.state.itemChangedStatus, true)();
		this._onCloseViewResult();
	};

	_renderViewResult = () => {
		if (this.state.isShowViewResult) {
			let filteredItem = _.filter(STATUS_CHANGE_ONE, [
				'key',
				this.state.statusToChangeOne,
			]);
			let titleMenu = (filteredItem.length && filteredItem[0].text) || '';
			return (
				<View style={styles.viewResult}>
					<AppTextWithoutTranslate
						text={I18nTran.t('changed_status')}
						IStyles={{
							color: themes.getColor('white'),
							width: '75%',
						}}
						IProps={{
							numberOfLines: 2,
							ellipsizeMode: 'tail',
						}}>
						<AppTextWithoutTranslate
							IStyles={{
								color: themes.getColor('white'),
							}}
							text={` "${this.state.itemChangedStatus?.code ||
								''} ${this.state.itemChangedStatus?.name ||
								''}" `}></AppTextWithoutTranslate>
						<AppTextWithoutTranslate
							IStyles={{
								color: themes.getColor('white'),
							}}
							text={I18nTran.t('to_status')}
						/>
						<AppTextWithoutTranslate
							text={` "${titleMenu}"`}
							IStyles={{
								color: themes.getColor('white'),
							}}
						/>
						<AppTextWithoutTranslate
							text={I18nTran.t('success')}
							IStyles={{
								color: themes.getColor('white'),
							}}
						/>
					</AppTextWithoutTranslate>
					<View
						style={{
							justifyContent: 'flex-end',
							paddingTop: 10,
						}}>
						<AppImages
							ButtonProps={{onPress: this._onCloseViewResult}}
							ButtonStyles={{marginTop: 10}}
							ImageStyle={{
								tintColor: themes.getColor('white'),
								alignSelf: 'flex-end',
								marginRight: 10,
							}}
							uri={themes.getImages('cancel')}
						/>
						{this.state.itemChangedStatus.leadId && (
							<AppButton
								ButtonStyle={{
									backgroundColor: 'transparent',
									borderColor: 'transparent',
									marginTop: 5,
								}}
								TextStyle={{color: themes.getColor('violet')}}
								text={'update_customer_info_button'}
								ButtonProps={{
									onPress: this._onUpdate,
								}}
							/>
						)}
					</View>
				</View>
			);
		}
		return null;
	};

	_onChangeOneItem = (statusChoosed, item) => {
		if (this.state.isShowAfterCall) {
			this.setState({isShowAfterCall: false});
		}
		if (item.smeStatusId === statusChoosed.key) return;
		if (statusChoosed.key === ID_NOT_RESEARCH_YET) {
			AppAlertOnlyOkayWithOutTranslate({
				title: I18nTran.t('can_not_go_to_not_research_yet'),
				onPressOK: () => {},
			});
		} else if (statusChoosed.key === ID_RESEARCHING) {
			this._onChangeStatusNotReason(statusChoosed, item);
		} else if (statusChoosed.key === ID_PAUSE) {
			const data = (
				<ModalPause
					isMultiple={false}
					name={item.name}
					listChoosedClue={item.leadId ? [item.leadId] : []}
					listChoosedAccount={item.accountId ? [item.accountId] : []}
				/>
			);
			AppModalManager.showModalWithJSX({data, backDrop: true});
		} else {
			const data = (
				<ModalDeny
					isMultiple={false}
					name={item.name}
					listChoosedClue={item.leadId ? [item.leadId] : []}
					listChoosedAccount={item.accountId ? [item.accountId] : []}
				/>
			);
			AppModalManager.showModalWithJSX({data, backDrop: true});
		}
	};

	_onAfterCall = (item, type) => {
		this.setState({isShowAfterCall: true, item, type});
	};

	_renderClueCustomer() {
		// console.log('_renderClueCustomer');
		return (
			<ClueCustomer
				ref={ref => {
					this.clueCustomer = ref;
				}}
				onPressChooseItem={this._onPressChooseItem}
				onChangeOneItem={this._onChangeOneItem}
				onAfterCall={this._onAfterCall}
				onClearChoosed={this._onClearChoosed}
			/>
		);
	}

	_renderMenuStatus() {
		let filteredItem = _.filter(STATUS_CHANGE_MULTIPLE, [
			'key',
			this.state.statusToChange,
		]);
		let titleMenu =
			(filteredItem.length && filteredItem[0].text) ||
			I18nTran.t('choose_status');
		return (
			<View style={styles.triggerMenuStatus}>
				<AppTextWithoutTranslate type={'BODY'} text={`${titleMenu}`} />
				<AppImages
					ButtonProps={{disabled: true}}
					uri={themes.getImages('dropDown')}
					ImageStyle={styles.iconDropDown}
				/>
			</View>
		);
	}

	_renderBottomTab() {
		return this.state.listChoosedClue.length ||
			this.state.listChoosedAccount.length ? (
			<View style={styles.bottomTab}>
				<AppImages
					ButtonProps={{disabled: true}}
					uri={themes.getImages('leftAbove')}
					ImageStyle={styles.imagesLeftAbove}
				/>
				<AppTextWithoutTranslate
					type={'BODY'}
					IStyles={{marginLeft: 10}}
					text={I18nTran.t('choose')}>
					<AppTextWithoutTranslate
						type={'BODY'}
						text={` ${this.state.listChoosedClue.length +
							this.state.listChoosedAccount.length} `}
						IStyles={{color: themes.getColor('mainColor')}}
					/>
					<AppTextWithoutTranslate
						type={'BODY'}
						text={I18nTran.t('customer').toLowerCase()}
					/>
				</AppTextWithoutTranslate>
				<AppImages
					ButtonProps={{disabled: true}}
					uri={themes.getImages('arrowRight')}
					ImageStyle={styles.imagesArrowRight}
				/>
				<View>
					<AppPopupMenuWithCheck
						triggerElement={this._renderMenuStatus()}
						data={STATUS_CHANGE_MULTIPLE}
						onPress={item => {
							this.setState({statusToChange: item.key});
						}}
					/>
				</View>
				<AppButton
					text={'change_status'}
					ButtonStyle={styles.buttonBlue}
					TextStyle={styles.textButtonBlue}
					ButtonProps={{onPress: this._onChangeMulti}}
				/>
				<AppButton
					text={'change_approach_step'}
					ButtonStyle={styles.buttonWhite}
				/>
			</View>
		) : null;
	}

	_onCloseView = () => {
		this.setState({isShowAfterCall: false});
	};

	_onRenderViewAfterCall = () => {
		return this.state.isShowAfterCall ? (
			<ConfirmViewAfterCall
				item={this.state.item}
				type={this.state.type}
				onClose={this._onCloseView}
				onChangeOneItem={this._onChangeOneItem}
			/>
		) : null;
	};

	render() {
		return (
			<AppContainer marginLeft>
				<View style={styles.container}>
					{this.state.load ? (
						<ActivityIndicator
							size="small"
							color={themes.getColor('blackLight')}
						/>
					) : (
						this._renderClueCustomer()
					)}
					{this._renderBottomTab()}
					{this._renderViewResult()}
					{this._onRenderViewAfterCall()}
				</View>
			</AppContainer>
		);
	}
}

export default Clue;

const styles = StyleSheet.create({
	viewResult: {
		position: 'absolute',
		height: 80,
		width: (WIDTH_SCREEN * 3) / 4,
		left: 80,
		bottom: 10,
		backgroundColor: themes.getColor('blackBold'),
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	bottomTab: {
		position: 'absolute',
		flex: 1,
		bottom: 0,
		height: 50,
		width: '100%',
		flexDirection: 'row',
		...SHALLOW_STYLE,
		borderColor: themes.getColor('grayLight'),
		borderTopWidth: 2,
		alignItems: 'center',
	},
	imagesArrowRight: {
		height: 50,
		width: 50,
		marginLeft: 25,
	},
	textButtonBlue: {
		color: themes.getColor('white'),
		fontWeight: 'bold',
	},
	imagesLeftAbove: {
		width: 26,
		height: 26,
		marginLeft: 20,
		marginBottom: 13,
	},
	container: {
		flex: 1,
		backgroundColor: themes.getColor('white'),
		paddingTop: 2 * PADDING_COMMON,
		borderRadius: 10,
		borderColor: themes.getColor('grayBold'),
		borderWidth: 0.5,
	},
	body: {
		marginBottom: 50,
	},
	header: {
		marginTop: headerMarginTop,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: marginSpacing,
	},
	plusIcon: {
		width: 25,
		height: 25,
	},
	plusIconContainer: {
		marginLeft: plusMarginLeft,
	},
	blockChart: {
		height: 500,
		backgroundColor: themes.getColor('white'),
		borderRadius: borderRadius,
		width: chartWidth,
		...SHALLOW_STYLE,
		marginBottom: marginSpacing,
	},
	listBlockChart: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	table: {
		width: '100%',
		...SHALLOW_STYLE,
		borderRadius: borderRadius,
		height: tableHeight,
		paddingTop: marginSpacing,
		borderWidth: 0.5,
		borderColor: themes.getColor('grayLight'),
	},
	clueCustomer: {
		width: '100%',
		...SHALLOW_STYLE,
		borderRadius: borderRadius,
		paddingTop: marginSpacing,
		borderWidth: 0.5,
		borderColor: themes.getColor('grayLight'),
	},
	triggerMenuStatus: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 20,
		paddingHorizontal: 5,
	},
	iconDropDown: {
		width: 15,
		height: 15,
		marginLeft: 10,
		tintColor: themes.getColor('blackLight'),
	},
	buttonBlue: {
		marginLeft: 25,
		height: 40,
		borderRadius: 5,
		backgroundColor: themes.getColor('mainColor'),
	},
	buttonWhite: {
		marginLeft: 25,
		height: 40,
		borderRadius: 5,
	},
});
