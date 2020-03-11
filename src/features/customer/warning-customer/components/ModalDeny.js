import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WIDTH_SCREEN, HEIGHT_SCREEN} from 'utils/util';
import {AppNormalText, AppTextWithoutTranslate} from 'components/text';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {AppModalManager} from 'components/app-modal/Manager';
import AppTextInput from 'components/text-input';
import I18nTran from 'assets/language';
import {PADDING_COMMON} from 'contants/themes/size';
import AppPopupMenuWithCheck from 'components/popup-menu-with-check';
import _ from 'lodash';
import {REASON_DENY, ID_REJECT} from '../contants';
import {MenuProvider} from 'react-native-popup-menu';
import {AppButton} from 'components/button';
import {customerApi} from 'networks/apis/extension';
import {AppAlertOnlyOkayWithOutTranslate} from 'utils/util';
import ModalResult from './ModalResult';
import realmHelper from 'utils/realm/realmHelper';
import realmCollectionName from 'utils/realm/realmCollectionName';
import {APP_CONFIG} from 'contants/contants';
import {reloadClueDataSelectedId} from '../selector/opportunitySelectors';
import {reloadClue} from '../actions/actions';
import {connect} from 'react-redux';
class ModalDeny extends React.PureComponent {
	state = {
		reasonDeny: 5,
	};
	_onCancel = () => {
		AppModalManager.hiddenModalWithJSX();
	};

	showModalResult = listFailed => {
		let numberSuccess =
			this.props.listChoosedClue.length +
			this.props.listChoosedAccount.length -
			listFailed.length;
		const data = (
			<ModalResult
				listFailed={listFailed}
				numberSuccess={numberSuccess}
				smeStatusId={ID_REJECT}
			/>
		);
		AppModalManager.showModalWithJSX({data, backDrop: true});
	};

	_onChangeStatus = async () => {
		AppModalManager.hiddenModalWithJSX();
		let objectChange = {
			lstLeadId: this.props.listChoosedClue,
			lstAccountId: this.props.listChoosedAccount,
			smeStatusId: ID_REJECT,
			smeStatusReasonId: this.state.reasonDeny,
			smeStatusReasonNotice: '',
		};
		let listFailed = [];
		let leadSuccess = [];
		let accountSuccess = [];
		AppModalManager.showLoading();
		const response = await customerApi.changeStatus(objectChange);
		console.log(response);
		if (response.code === 0) {
			if (response.data.length) {
				response.data.forEach(element => {
					if (element.status === false) {
						listFailed.push(element);
					} else {
						if (element.leadId) {
							leadSuccess.push(element.leadId);
						} else accountSuccess.push(element.accountId);
					}
				});
				this.showModalResult(listFailed);

				// Update data
				this.props.onReloadClueData({
					leadSuccess,
					accountSuccess,
					type: ID_REJECT,
				});

				// Update realm
				leadSuccess.map(item => {
					realmHelper
						.update({
							collection:
								realmCollectionName[APP_CONFIG.VERSION]
									.CUSTOMER_SCHEMA_NAME.leads,
							data: {
								leadId: item,
								smeStatusId: ID_REJECT,
							},
						})
						.then(response => {})
						.catch(err => {});
				});
				accountSuccess.map(item => {
					realmHelper
						.update({
							collection:
								realmCollectionName[APP_CONFIG.VERSION]
									.CUSTOMER_SCHEMA_NAME.accounts,
							data: {
								accountId: item,
								smeStatusId: ID_REJECT,
							},
						})
						.then(response => {})
						.catch(err => {});
				});
			}
		} else {
			AppAlertOnlyOkayWithOutTranslate({
				title: response.message,
				onPressOK: () => {},
			});
		}
	};

	_renderNote() {
		return (
			<AppTextInput
				TextInputStyles={styles.textInputStyle}
				TextInputProps={{multiline: true, textAlignVertical: 'top'}}
				type={'BODY'}
				text={''}
				placeholder={''}
				ref={refs => (this.descriptionTextInput = refs)}
			/>
		);
	}

	_renderMenuReasonDeny() {
		let filteredItem = _.filter(REASON_DENY, [
			'key',
			this.state.reasonDeny,
		]);
		let titleMenu = (filteredItem.length && filteredItem[0].text) || '';
		return (
			<View style={styles.triggerElementHideShow}>
				<AppTextWithoutTranslate type={'BODY'} text={titleMenu} />
				<AppImages
					uri={themes.getImages('dropDown')}
					ImageStyle={styles.iconDropDown}
				/>
			</View>
		);
	}

	_renderTitle() {
		const {isMultiple, listChoosedClue, listChoosedAccount} = this.props;
		if (isMultiple) {
			return (
				<AppTextWithoutTranslate
					type={'H2'}
					text={I18nTran.t('reject')}
					IStyles={{
						color: themes.getColor('red'),
						fontWeight: '600',
					}}>
					<AppTextWithoutTranslate
						type={'H2'}
						text={` ${listChoosedClue.length +
							listChoosedAccount.length} `}
						IStyles={{
							fontWeight: '600',
						}}
					/>
					<AppTextWithoutTranslate
						type={'H2'}
						text={I18nTran.t('customer').toLowerCase()}
						IStyles={{
							fontWeight: '600',
						}}
					/>
				</AppTextWithoutTranslate>
			);
		} else {
			return (
				<AppTextWithoutTranslate
					type={'H2'}
					text={I18nTran.t('reject')}
					IStyles={{
						color: themes.getColor('red'),
						fontWeight: '600',
					}}>
					<AppTextWithoutTranslate
						type={'H2'}
						text={` ${I18nTran.t('customer').toLowerCase()}`}
						IStyles={{
							fontWeight: '600',
						}}
					/>
					<AppTextWithoutTranslate
						type={'H2'}
						text={': Công ty TNHH Vinfast - Vingroup'}
						IStyles={{
							fontWeight: '600',
							color: themes.getColor('mainColor'),
						}}
					/>
				</AppTextWithoutTranslate>
			);
		}
	}

	render() {
		return (
			<View style={styles.wrapper}>
				<MenuProvider style={{flex: 1}}>
					<View style={styles.viewHeader}>
						{this._renderTitle()}
						<AppImages
							ButtonProps={{onPress: this._onCancel}}
							uri={themes.getImages('cancelModal')}
							ImageStyle={styles.cancelImage}
						/>
					</View>
					<View style={styles.viewBody}>
						<View style={styles.rowFilterHideShow}>
							<View style={styles.nameFilterHideShow}>
								<AppNormalText
									type={'BODY1'}
									text={'reason_deny'}
								/>
							</View>
							<AppPopupMenuWithCheck
								triggerElement={this._renderMenuReasonDeny()}
								data={REASON_DENY}
								onPress={item => {
									this.setState({reasonDeny: item.key});
								}}
								optionsContainerStyle={{width: 400}}
								selectedIndex={this.state.reasonDeny}
							/>
						</View>
						<View
							style={[
								styles.rowFilterHideShow,
								{height: 110, marginTop: PADDING_COMMON},
							]}>
							<View style={styles.nameFilterHideShow}>
								<AppNormalText
									type={'BODY1'}
									text={'note_option'}
								/>
							</View>
							{this._renderNote()}
						</View>
						<View style={styles.rowButton}>
							<AppButton
								text={'done'}
								ButtonStyle={styles.buttonBlue}
								TextStyle={styles.textButtonBlue}
								ButtonProps={{onPress: this._onChangeStatus}}
							/>
							<AppButton
								text={'cancel_vi'}
								ButtonStyle={styles.buttonWhite}
								TextStyle={styles.textButtonWhite}
							/>
						</View>
					</View>
				</MenuProvider>
			</View>
		);
	}
}

const mapsStateToProps = state => ({
	reloadClueData: reloadClueDataSelectedId(state),
});

const mapsDispatchToProps = dispatch => ({
	onReloadClueData: reloadClueData => dispatch(reloadClue(reloadClueData)),
});

export default connect(mapsStateToProps, mapsDispatchToProps)(ModalDeny);

const styles = StyleSheet.create({
	rowButton: {
		flexDirection: 'row',
		width: WIDTH_SCREEN / 2 - 50,
		justifyContent: 'flex-start',
		marginTop: PADDING_COMMON,
	},
	textButtonBlue: {
		color: themes.getColor('white'),
		fontWeight: 'bold',
	},
	textButtonWhite: {
		fontWeight: 'bold',
	},
	buttonBlue: {
		height: 40,
		borderRadius: 5,
		backgroundColor: themes.getColor('red'),
	},
	buttonWhite: {
		marginLeft: 25,
		height: 40,
		borderRadius: 5,
	},
	textInputStyle: {
		flex: 1,
		justifyContent: 'flex-start',
		width: '100%',
		borderWidth: 0,
	},
	triggerElementHideShow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 30,
	},
	iconDropDown: {
		width: 15,
		height: 15,
		marginLeft: 10,
		tintColor: themes.getColor('blackLight'),
	},
	nameFilterHideShow: {
		position: 'absolute',
		top: -10,
		left: 12,
		backgroundColor: themes.getColor('white'),
		zIndex: 1,
		paddingRight: 30,
		paddingLeft: 5,
	},
	rowFilterHideShow: {
		borderColor: themes.getColor('grayBold'),
		borderWidth: 1,
		height: 50,
		width: WIDTH_SCREEN / 2 - 50,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
	},
	wrapper: {
		width: WIDTH_SCREEN / 2,
		minHeight: 320,
		backgroundColor: themes.getColor('white'),
		borderRadius: 10,
	},
	viewHeader: {
		width: '100%',
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
		paddingLeft: 30,
		paddingRight: 15,
	},
	viewBody: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cancelImage: {
		width: 25,
		height: 25,
	},
});
