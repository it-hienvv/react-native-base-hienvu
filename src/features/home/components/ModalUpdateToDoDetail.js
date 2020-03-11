import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
	WIDTH_SCREEN,
	HEIGHT_SCREEN,
	AppAlertOnlyOkay,
	AppAlert,
} from 'utils/util';
import {PADDING_COMMON} from 'contants/themes/size';
import {AppImages} from 'components/image';
import {AppTextWithoutTranslate, AppNormalText} from 'components/text';
import AppTextInput from 'components/text-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import I18nTran from 'assets/language';
import realmHelper from 'utils/realm/realmHelper';
import realmCollectionName from 'utils/realm/realmCollectionName';
import {formatTime} from 'utils/date-times';
import {AppButton} from 'components/button';
import themes from 'assets/themes';
import {AppModalManager} from 'components/app-modal/Manager';
import {APP_CONFIG} from 'contants/contants';

const viewImage = 30;
const bodyMarginLeft = PADDING_COMMON * 2 + viewImage / 2;
const textInputMaxHeight = 100;
const textInputLocationMaxHeight = 40;
const textInputTitleMaxHeight = 80;
const textInputBorderRadius = 8;
const leftAbsolute = 20;
class ModalUpdateToDoDetail extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isDateTimePickerStartShow: false,
			isDateTimePickerEndShow: false,
			isEdit: this.props.isEdit,
			item: this.props.item,
			title: '',
			startTime: this.props.isEdit
				? JSON.parse(this.props.item.startTime)
				: '',
			endTime: this.props.isEdit
				? JSON.parse(this.props.item.endTime)
				: '',
			description: '',
			location: '',
		};
	}

	showDateTimePickerStart = () => {
		this.setState({isDateTimePickerStartShow: true});
	};

	showDateTimePickerEnd = () => {
		if (this.state.startTime) {
			this.setState({isDateTimePickerEndShow: true});
		} else {
			AppAlertOnlyOkay({title: 'start_time_empty'});
		}
	};

	_hideDateTimePickerStart = () => {
		this.setState({isDateTimePickerStartShow: false});
	};

	_hideDateTimePickerEnd = () => {
		this.setState({isDateTimePickerEndShow: false});
	};

	_handleStartTimeDatePicked = date => {
		this._hideDateTimePickerStart();
		this.setState({
			startTime: date,
			endTime: '',
		});
	};

	_handleEndTimeDatePicked = date => {
		this._hideDateTimePickerEnd();
		this.setState({
			endTime: date,
		});
	};

	_onSaveDone = (isSuccess = true) => {
		let title = '';
		if (isSuccess) {
			title = this.state.isEdit
				? 'edit_work_calendar_success'
				: 'add_work_calendar_success';
		} else {
			title = this.state.isEdit
				? 'edit_work_calendar_error'
				: 'add_work_calendar_error';
		}
		AppModalManager.hiddenModalWithJSX();
		this.setState({startTime: '', endTime: ''});
		this.titleTextInput._clear();
		this.descriptionTextInput._clear();
		this.locationTextInput._clear();
		setTimeout(() => {
			AppAlertOnlyOkay({
				title,
				onPressOK: this.props._onLoadData,
			});
		}, 500);
	};

	_onCancel = () => {
		AppModalManager.hiddenModalWithJSX();
	};

	_onDeleteWorkCalendar = () => {
		realmHelper
			.deleteByKey({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].DashboardSchemaName
						.workCalendar,
				key: this.state.item.id,
			})
			.then(response => {
				this._onDeleteDone();
			})
			.catch(err => {
				this._onDeleteDone(false);
			});
	};

	_onDeleteDone = (isSuccess = true) => {
		AppModalManager.hiddenModalWithJSX();
		setTimeout(() => {
			AppAlertOnlyOkay({
				title: isSuccess
					? 'delete_work_calendar_success'
					: 'delete_work_calendar_error',
				onPressOK: this.props._onLoadData,
			});
		}, 500);
	};

	_onDelete = () => {
		AppAlert({
			title: 'do_you_want_to_delete_this_item',
			onPressOK: this._onDeleteWorkCalendar,
			onPressCancel: () => {},
		});
	};

	_onPressSave = () => {
		if (
			this.titleTextInput &&
			this.titleTextInput.state.value.trim() === ''
		) {
			AppAlertOnlyOkay({
				title: 'title_empty',
			});
		} else if (!this.state.startTime) {
			AppAlertOnlyOkay({
				title: 'start_time_empty',
			});
		} else if (!this.state.endTime) {
			AppAlertOnlyOkay({
				title: 'end_time_empty',
			});
		} else {
			let collection =
				realmCollectionName[APP_CONFIG.VERSION].DashboardSchemaName
					.workCalendar;
			let dataGeneral = {
				minutes: moment(this.state.endTime).diff(
					moment(this.state.startTime),
					'minutes',
				),
				startMinute: moment(this.state.startTime).get('minute'),
				startHour: moment(this.state.startTime).get('hour'),
				weekDay: moment(this.state.startTime).isoWeekday(),
				title: this.titleTextInput && this.titleTextInput.state.value,
				startTime: JSON.stringify(this.state.startTime),
				endTime: JSON.stringify(this.state.endTime),
				timestamp: moment(this.state.startTime).valueOf(),
				address:
					this.locationTextInput &&
					this.locationTextInput.state.value,
				description:
					this.descriptionTextInput &&
					this.descriptionTextInput.state.value,
			};
			if (this.state.isEdit) {
				realmHelper
					.update({
						collection,
						data: {
							id: this.state.item.id,
							...dataGeneral,
						},
					})
					.then(response => {
						this._onSaveDone();
					})
					.catch(err => {
						this._onSaveDone(false);
					});
			} else {
				realmHelper
					.insertRealm({
						collection,
						data: {
							id: moment()
								.unix()
								.toString(),
							...dataGeneral,
						},
					})
					.then(response => {
						this._onSaveDone();
					})
					.catch(err => {
						this._onSaveDone(false);
					});
			}
		}
	};
	_renderViewAbsolute({text}) {
		return (
			<View style={styles.absolute}>
				<AppNormalText text={text} type={'BODY2'} />
			</View>
		);
	}

	_renderTitle() {
		return (
			<View style={styles.viewTitle}>
				<AppNormalText text={'change_info'} type={'H1'} />
				<View style={styles.wrapIconDeleteCancel}>
					{this.state.isEdit ? (
						<AppImages
							ButtonProps={{onPress: this._onDelete}}
							uri={themes.getImages('delete')}
							ImageStyle={styles.folderImage}
						/>
					) : (
						<View />
					)}
					<AppImages
						ButtonProps={{onPress: this._onCancel}}
						uri={themes.getImages('cancel')}
						ImageStyle={styles.folderImage}
					/>
				</View>
			</View>
		);
	}
	_renderBlockManager() {
		const {isEdit, item} = this.state;
		return (
			<View style={styles.flexRow}>
				<View style={styles.left}>
					<View style={styles.itemNote} />
				</View>
				<View
					style={[
						styles.inputBlockManager,
						{height: textInputTitleMaxHeight + PADDING_COMMON},
					]}>
					<AppTextInput
						TextInputStyles={[
							styles.textInputStyle,
							{height: textInputTitleMaxHeight},
						]}
						TextInputProps={{
							multiline: true,
							textAlignVertical: 'top',
						}}
						type={'H1'}
						text={isEdit ? item.title : ''}
						placeholder={I18nTran.t('title')}
						ref={refs => (this.titleTextInput = refs)}
					/>
				</View>
			</View>
		);
	}

	_renderBlockTimes() {
		return (
			<View style={styles.viewWrapBlockTime}>
				<TouchableOpacity
					onPress={this.showDateTimePickerStart}
					style={styles.viewTime}>
					<AppTextWithoutTranslate
						type={'BODY'}
						text={
							this.state.startTime
								? formatTime(this.state.startTime)
								: I18nTran.t('choose_start_time')
						}
					/>
					<AppImages
						ButtonProps={{disabled: true}}
						ButtonStyles={{marginLeft: PADDING_COMMON}}
						uri={themes.getImages('calendar')}
						ImageStyle={{borderRadius: 0}}
					/>
					{this._renderViewAbsolute({text: 'start_time'})}
				</TouchableOpacity>
				<TouchableOpacity
					onPress={this.showDateTimePickerEnd}
					style={[styles.viewTime, {marginLeft: 0}]}>
					<AppTextWithoutTranslate
						type={'BODY'}
						text={
							this.state.endTime
								? formatTime(this.state.endTime)
								: I18nTran.t('choose_end_time')
						}
					/>
					<AppImages
						ButtonProps={{disabled: true}}
						ButtonStyles={{marginLeft: PADDING_COMMON}}
						uri={themes.getImages('calendar')}
						ImageStyle={{borderRadius: 0}}
					/>
					{this._renderViewAbsolute({text: 'end_time'})}
				</TouchableOpacity>
			</View>
		);
	}

	_renderDescription() {
		const {isEdit, item} = this.state;
		return (
			<View style={styles.viewManagerInput}>
				<AppTextInput
					TextInputStyles={styles.textInputStyle}
					TextInputProps={{multiline: true, textAlignVertical: 'top'}}
					type={'BODY'}
					text={isEdit ? item.description : ''}
					placeholder={I18nTran.t('description')}
					ref={refs => (this.descriptionTextInput = refs)}
				/>
			</View>
		);
	}

	_renderBlockAddress() {
		const {isEdit, item} = this.state;
		return (
			<View style={styles.blockAddress}>
				<View style={styles.left}>
					<AppImages
						ButtonProps={{disabled: true}}
						uri={themes.getImages('locationFill')}
						ImageStyle={[
							styles.folderImage,
							{tintColor: themes.getColor('mainColor')},
						]}
					/>
				</View>
				<View
					style={[
						styles.inputBlockManager,
						{
							height: textInputLocationMaxHeight + PADDING_COMMON,
						},
					]}>
					<AppTextInput
						TextInputStyles={[
							styles.textInputStyle,
							{height: textInputLocationMaxHeight},
						]}
						TextInputProps={{multiline: true}}
						type={'BODY'}
						text={isEdit ? item.address : ''}
						placeholder={''}
						ref={refs => (this.locationTextInput = refs)}
					/>
					{this._renderViewAbsolute({text: 'location'})}
				</View>
			</View>
		);
	}

	_renderSaveButton = () => (
		<AppButton
			text={'save_vi'}
			textType={'BUTTON1'}
			TextStyle={{color: themes.getColor('white')}}
			ButtonStyle={styles.buttonStyleSave}
			ButtonProps={{
				onPress: this._onPressSave,
			}}
		/>
	);

	_renderDateTimePickerStart = () => (
		<DateTimePicker
			isVisible={this.state.isDateTimePickerStartShow}
			onConfirm={this._handleStartTimeDatePicked}
			onCancel={this._hideDateTimePickerStart}
			mode={'datetime'}
			minimumDate={new Date()}
		/>
	);

	_renderDateTimePickerEnd = () => (
		<DateTimePicker
			isVisible={this.state.isDateTimePickerEndShow}
			onConfirm={this._handleEndTimeDatePicked}
			onCancel={this._hideDateTimePickerEnd}
			mode={'datetime'}
			minimumDate={new Date(this.state.startTime)}
			maximumDate={new Date(moment(this.state.startTime).endOf('day'))}
		/>
	);

	render() {
		return (
			<View style={styles.absoluteFill}>
				<View style={styles.container}>
					<KeyboardAwareScrollView
						enableOnAndroid={true}
						extraHeight={180}>
						{this._renderTitle()}
						{this._renderBlockManager()}
						{this._renderBlockTimes()}
						{this._renderDescription()}
						{this._renderBlockAddress()}
						{this._renderSaveButton()}
						{this._renderDateTimePickerStart()}
						{this._renderDateTimePickerEnd()}
					</KeyboardAwareScrollView>
				</View>
			</View>
		);
	}
}

export default ModalUpdateToDoDetail;

const styles = StyleSheet.create({
	absoluteFill: {...StyleSheet.absoluteFill, alignItems: 'center'},
	wrapIconDeleteCancel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 80,
	},
	itemNote: {
		alignSelf: 'flex-end',
		height: 25,
		width: 15,
		borderRadius: 3,
		backgroundColor: themes.getColor('yellow'),
	},
	buttonStyleSave: {
		width: '50%',
		borderRadius: 5,
		backgroundColor: themes.getColor('mainColor'),
		alignSelf: 'center',
		height: 50,
		marginTop: 25,
	},
	viewWrapBlockTime: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	container: {
		width: WIDTH_SCREEN / 2,
		height: (HEIGHT_SCREEN * 2) / 3,
		backgroundColor: themes.getColor('white'),
		paddingVertical: PADDING_COMMON,
		paddingHorizontal: PADDING_COMMON,
		borderRadius: 10,
	},

	flexRow: {
		flexDirection: 'row',
	},

	blockAddress: {flexDirection: 'row', marginTop: 20},

	containerImageFolder: {
		justifyContent: 'flex-start',
	},
	folderImage: {
		width: 25,
		height: 25,
	},
	textInputStyle: {
		justifyContent: 'flex-start',
		height: textInputMaxHeight,
		width: '100%',
		marginTop: PADDING_COMMON,
		borderWidth: 0,
	},
	viewTime: {
		marginLeft: bodyMarginLeft,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderWidth: 0.5,
		borderColor: themes.getColor('blackLight'),
		minWidth: '30%',
		paddingVertical: PADDING_COMMON,
		paddingHorizontal: PADDING_COMMON,
		borderRadius: textInputBorderRadius,
		alignItems: 'center',
	},
	viewTitle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: PADDING_COMMON,
		paddingHorizontal: PADDING_COMMON,
		alignItems: 'center',
	},
	viewManagerInput: {
		height: textInputMaxHeight + PADDING_COMMON,
		borderRadius: textInputBorderRadius,
		borderWidth: 0.5,
		borderColor: themes.getColor('blackLight'),
		marginLeft: bodyMarginLeft,
		marginTop: PADDING_COMMON,
	},
	left: {
		width: viewImage,
		marginRight: PADDING_COMMON,
	},
	inputBlockManager: {
		flex: 1,
		height: textInputMaxHeight + PADDING_COMMON,
		borderRadius: textInputBorderRadius,
		borderWidth: 0.5,
		borderColor: themes.getColor('blackLight'),
	},
	absolute: {
		backgroundColor: themes.getColor('white'),
		position: 'absolute',
		top: -PADDING_COMMON,
		left: leftAbsolute,
		height: PADDING_COMMON * 2,
		paddingRight: leftAbsolute * 2,
		justifyContent: 'center',
	},
});
