import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
	WIDTH_SCREEN,
	HEIGHT_SCREEN,
	AppAlertOnlyOkayWithOutTranslate,
} from 'utils/util';
import {AppNormalText, AppTextWithoutTranslate} from 'components/text';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {AppModalManager} from 'components/app-modal/Manager';
import I18nTran from 'assets/language';
import _ from 'lodash';
import {MenuProvider} from 'react-native-popup-menu';
import {AppButton} from 'components/button';
import realmHelper from 'utils/realm/realmHelper';
import realmCollectionName from 'utils/realm/realmCollectionName';
import {
	APP_CONFIG,
	ACTIVITY_TYPE,
	LENGTH_NOTE,
	LENGTH_NAME,
} from 'contants/contants';
import CheckBox from 'react-native-check-box';
import TextInputAnimation from 'components/text-input-animation';
import DatePickerAnimation from 'components/date-picker-animation';
import CompPopupAnim from 'components/comp-popup-animation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {customerApi} from 'networks/apis/extension';
import moment from 'moment';
import memoizeOne from 'memoize-one';
import PubSub from 'pubsub-js';

const LIST_ACTIVITY = [
	{
		key: ACTIVITY_TYPE.CALL,
		text: I18nTran.t('phone-call'),
	},
	{
		key: ACTIVITY_TYPE.SMS,
		text: I18nTran.t('activity_send_sms'),
	},
	{
		key: ACTIVITY_TYPE.EMAIL,
		text: I18nTran.t('activity_send_email'),
	},
	{
		key: ACTIVITY_TYPE.MEETING,
		text: I18nTran.t('activity_meeting'),
	},
];

export default class ModalAddActivity extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			activity: props.type || ACTIVITY_TYPE.CALL,
			meetingAddress: props.address || '',
			time: props.executionTime
				? new Date(moment(props.executionTime, 'YYYY-MM-DD HH:mm:ss'))
				: new Date(),
			result: props.result || '',
			note: props.note || '',
			partner: props.partner || '',
			partnerDisplay: '',
			partners: [],
			isShowViewNextJob: false,
			nextActivity: ACTIVITY_TYPE.CALL,
			nextMeetingAddress: '',
			nextTime: '',
			nextNote: '',
			nextPartner: '',
			nextPartnerDisplay: '',
		};
	}

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
				smeStatusId={ID_PAUSE}
			/>
		);
		AppModalManager.showModalWithJSX({
			data,
			backDrop: true,
		});
	};

	_handleChangePickerTime = date => {
		this.setState({time: date});
	};

	_handleChangePickerNextTime = date => {
		this.setState({nextTime: date});
	};

	_handlePressDone = async () => {
		console.log('_handlePressDone');
		AppModalManager.hiddenModalWithJSX();
		const {accountId, leadId, activityId} = this.props;
		const requestObj = !this.state.isShowViewNextJob
			? [
					{
						...(activityId && {activityId}),
						accountId,
						leadId,
						address: this.state.meetingAddress,
						note: this.state.note,
						partner: this.state.partner,
						result: this.state.result,
						type: this.state.activity,
						executionTime: this.state.time
							? moment(this.state.time).format(
									'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
							  )
							: null,
					},
			  ]
			: [
					{
						...(activityId && {activityId}),
						accountId,
						leadId,
						address: this.state.meetingAddress,
						note: this.state.note,
						partner: this.state.partner,
						result: this.state.result,
						type: this.state.activity,
						executionTime: this.state.time
							? moment(this.state.time).format(
									'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
							  )
							: null,
					},
					{
						accountId,
						leadId,
						address: this.state.meetingAddress,
						note: this.state.nextNote,
						partner: this.state.nextPartner,
						type: this.state.nextActivity,
						executionTime: this.state.nextTime
							? moment(this.state.nextTime).format(
									'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
							  )
							: null,
					},
			  ];
		console.log('Request Obj', requestObj);
		AppModalManager.showLoading();
		const response = await customerApi.saveActivity(requestObj);
		console.log('Save activity res', response);
		AppModalManager.hideLoading();
		PubSub.publish('SAVE_ACTIVITY_SUCCESS');
	};

	_onClickCheckBox = () => {
		this.setState({
			isShowViewNextJob: !this.state.isShowViewNextJob,
		});
	};

	_handleChangeNextActivity = item => {
		this.setState({nextActivity: item.key});
	};

	_renderMenuActivity() {
		let filteredItem = _.filter(LIST_ACTIVITY, [
			'key',
			this.state.activity,
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
		const {accountName} = this.props;
		return (
			<AppTextWithoutTranslate
				type={'H2'}
				text={`${I18nTran.t('add_new_activity_title')}: `}
				IStyles={{
					color: themes.getColor('blackBold'),
					fontWeight: '600',
				}}>
				<AppTextWithoutTranslate
					type={'H2'}
					text={accountName}
					IStyles={{
						fontWeight: '600',
						color: themes.getColor('mainColor'),
					}}
				/>
			</AppTextWithoutTranslate>
		);
	}

	_handleChangeNote = text => {
		this.setState({note: text});
	};

	_handleChangeNextMeetingAddress = text => {
		this.setState({nextMeetingAddress: text});
	};

	_handleChangeNextNote = text => {
		this.setState({nextNote: text});
	};

	_onChangeNextPartner = item => {
		console.log('_onChangePartner', item);
		this.setState({
			nextParter: item.employeeId,
			nextPartnerDisplay: item.text,
		});
	};

	_renderViewNextJob = () => {
		const isInFuture = !!(
			this.state.nextTime &&
			this.state.nextTime.getTime() > new Date().getTime()
		);
		return (
			<View style={{marginTop: 30, width: '100%'}}>
				<AppNormalText
					text={'next_job'}
					type={'H1'}
					IStyles={{
						paddingBottom: 15,
						width: WIDTH_SCREEN - 50,
						borderColor: themes.getColor('grayLight'),
						overflow: 'hidden',
						borderBottomWidth: 1,
					}}
				/>
				<View style={styles.space} />
				<View style={{flexDirection: 'row'}}>
					<CompPopupAnim
						title={I18nTran.t('activity')}
						listOption={LIST_ACTIVITY}
						value={this._getActivityValue(
							this.state.nextActivity,
							LIST_ACTIVITY,
						)}
						styleProps={{width: 150}}
						popupMenuStyle={{
							width: 500,
							maxHeight: 500,
						}}
						onPress={this._handleChangeNextActivity}
						selectedIndex={this._getActivityIndex(
							this.state.nextActivity,
							LIST_ACTIVITY,
						)}
					/>
					<DatePickerAnimation
						textTitle={I18nTran.t('date_time')}
						datePicked={this.state.nextTime}
						handleDatePicked={this._handleChangePickerNextTime}
						calendarIcon={'calendar2'}
						mode={'datetime'}
						styleProps={{width: 250}}
						date={this.state.nextTime}
					/>
					{this.state.nextActivity == ACTIVITY_TYPE.MEETING && (
						<TextInputAnimation
							label={I18nTran.t('meeting_address')}
							value={this.state.nextMeetingAddress}
							styleProps={{
								flex: 1,
							}}
							onChangeText={this._handleChangeNextMeetingAddress}
						/>
					)}
				</View>
				<View style={styles.space} />
				<View style={styles.row}>
					<TextInputAnimation
						label={I18nTran.t('note_option')}
						value={this.state.nextNote}
						styleProps={styles.fullWidth}
						textInputProps={styles.multilineInput}
						onChangeText={this._handleChangeNextNote}
						multiline={true}
						numberOfLines={3}
						maxLength={LENGTH_NAME}
					/>
				</View>
				{this.state.nextActivity == ACTIVITY_TYPE.MEETING &&
					isInFuture && (
						<View style={styles.fullWidth}>
							<View style={styles.space} />
							<View style={styles.row}>
								<CompPopupAnim
									title={I18nTran.t(
										'activity_invite_partner',
									)}
									listOption={this.state.partners}
									value={this.state.nextPartnerDisplay}
									styleProps={{
										width: '40%',
										marginRight: 0,
									}}
									popupMenuStyle={{
										marginTop: 58,
									}}
									onPress={this._onChangeNextPartner}
									selectedIndex={this._getPartnerIndex(
										this.state.partners,
										this.state.nextParter,
									)}
									hasSearch={true}
								/>
							</View>
						</View>
					)}
			</View>
		);
	};

	_handleChangeResult = text => {
		this.setState({result: text});
	};

	_handleChangeActivity = item => {
		console.log('_handleChangeActivity', item);
		this.setState({activity: item.key});
	};

	_handleChangeMeetingAddress = text => {
		this.setState({meetingAddress: text});
	};

	_getEmployee = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.employee,
			});
		} catch (error) {}
	};

	componentDidMount() {
		this._getEmployee().then(results => {
			const partners = [];
			results.forEach(element => {
				partners.push({
					key: element.employeeId,
					text: `${element.code} - ${element.fullName}`,
					fullName: element.fullName,
					employeeId: element.employeeId,
					code: element.code,
				});
			});
			console.log('partners');
			this.setState({partners});
		});
	}

	_onChangePartner = item => {
		console.log('_onChangePartner', item);
		this.setState({
			partner: item.employeeId,
			partnerDisplay: item.text,
		});
	};

	_getPartnerIndex = memoizeOne((partners, partner) => {
		return partners.findIndex(item => item.employeeId === partner);
	});

	_getActivityValue = memoizeOne((activity, listActivity) => {
		const activityItem = listActivity.find(item => item.key == activity);
		if (!activityItem) return '';
		return activityItem.text;
	});

	_getActivityIndex = memoizeOne((activity, listActivity) => {
		return listActivity.findIndex(item => item.key == activity);
	});

	render() {
		const isInFuture = this.state.time.getTime() > new Date().getTime();
		return (
			<MenuProvider style={{flex: 1}}>
				<View style={styles.container}>
					<View
						style={[
							styles.wrapper,
							{
								borderLeftWidth: isInFuture ? 6 : 0,
								borderLeftColor: isInFuture
									? themes.getColor('orange')
									: themes.getColor('transparent'),
							},
						]}>
						<View style={styles.viewHeader}>
							{this._renderTitle()}
							<AppImages
								ButtonProps={{
									onPress: this._onCancel,
								}}
								uri={themes.getImages('cancelModal')}
								ImageStyle={styles.cancelImage}
							/>
						</View>
						<KeyboardAwareScrollView
							enableOnAndroid={true}
							extraHeight={180}
							keyboardShouldPersistTaps={'handled'}>
							<View style={styles.viewBody}>
								<View style={styles.space} />
								<View style={styles.row}>
									<CompPopupAnim
										title={I18nTran.t('activity')}
										listOption={LIST_ACTIVITY}
										value={this._getActivityValue(
											this.state.activity,
											LIST_ACTIVITY,
										)}
										styleProps={{
											width: 150,
										}}
										popupMenuStyle={{
											width: 500,
											maxHeight: 500,
										}}
										onPress={this._handleChangeActivity}
										selectedIndex={this._getActivityIndex(
											this.state.activity,
											LIST_ACTIVITY,
										)}
									/>
									<DatePickerAnimation
										textTitle={I18nTran.t('date_time')}
										datePicked={this.state.time}
										value={this.state.time}
										handleDatePicked={
											this._handleChangePickerTime
										}
										calendarIcon={'calendar2'}
										mode={'datetime'}
										styleProps={{
											width: 250,
										}}
										date={this.state.time}
									/>
									{this.state.activity ==
										ACTIVITY_TYPE.MEETING && (
										<TextInputAnimation
											label={I18nTran.t(
												'meeting_address',
											)}
											value={this.state.meetingAddress}
											styleProps={{
												flex: 1,
											}}
											onChangeText={
												this._handleChangeMeetingAddress
											}
										/>
									)}
								</View>
								<View style={styles.space} />
								<View style={styles.row}>
									{this.state.time.getTime() <
									new Date().getTime() ? (
										<TextInputAnimation
											label={I18nTran.t('result')}
											value={this.state.result}
											styleProps={{
												width: '100%',
											}}
											textInputProps={
												styles.multilineInput
											}
											onChangeText={
												this._handleChangeResult
											}
											multiline={true}
											numberOfLines={3}
											maxLength={LENGTH_NOTE}
										/>
									) : (
										<TextInputAnimation
											label={I18nTran.t('note_option')}
											value={this.state.note}
											styleProps={styles.fullWidth}
											textInputProps={
												styles.multilineInput
											}
											onChangeText={
												this._handleChangeNote
											}
											multiline={true}
											numberOfLines={3}
											maxLength={LENGTH_NAME}
										/>
									)}
								</View>
								{this.state.activity == ACTIVITY_TYPE.MEETING &&
									isInFuture && (
										<View style={styles.fullWidth}>
											<View style={styles.space} />
											<View style={styles.row}>
												<CompPopupAnim
													title={I18nTran.t(
														'activity_invite_partner',
													)}
													listOption={
														this.state.partners
													}
													value={
														this.state
															.partnerDisplay
													}
													styleProps={{
														width: '40%',
														marginRight: 0,
													}}
													popupMenuStyle={{
														marginTop: 58,
													}}
													onPress={
														this._onChangePartner
													}
													selectedIndex={this._getPartnerIndex(
														this.state.partners,
														this.state.partner,
													)}
													hasSearch={true}
												/>
											</View>
										</View>
									)}
								{this.state.time.getTime() <
									new Date().getTime() && (
									<TouchableOpacity
										onPress={this._onClickCheckBox}>
										<View style={styles.viewCheckBox}>
											<CheckBox
												onClick={this._onClickCheckBox}
												uncheckedCheckBoxColor={themes.getColor(
													'grayBold',
												)}
												checkedCheckBoxColor={themes.getColor(
													'mainColor',
												)}
												isChecked={
													this.state.isShowViewNextJob
												}
											/>
											<AppNormalText
												IStyles={{
													textAlignVertical: 'center',
													marginLeft: 10,
												}}
												text={
													'appointment_for_next_schedule'
												}
											/>
										</View>
									</TouchableOpacity>
								)}

								{this.state.isShowViewNextJob &&
									this._renderViewNextJob()}
								<View style={styles.rowButton}>
									<AppButton
										text={'done'}
										ButtonStyle={styles.buttonDone}
										TextStyle={styles.textButtonBlue}
										ButtonProps={{
											onPress: this._handlePressDone,
										}}
									/>
									<AppButton
										text={'cancel_vi'}
										ButtonStyle={styles.buttonWhite}
										TextStyle={styles.textButtonWhite}
										ButtonProps={{
											onPress: this._onCancel,
										}}
									/>
								</View>
							</View>
						</KeyboardAwareScrollView>
					</View>
				</View>
			</MenuProvider>
		);
	}
}
