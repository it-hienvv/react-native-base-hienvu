import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {SHALLOW_STYLE} from 'contants/themes';
import themes from 'assets/themes';
import {AppTextWithoutTranslate, AppNormalText} from 'components/text';
import I18nTran from 'assets/language';
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
	MenuProvider,
} from 'react-native-popup-menu';
import {ACTIVITY_TYPE, ACTIVITY_EXPIRE_PERIOD} from 'contants/contants';
import moment from 'moment';
import memoizeOne from 'memoize-one';
import {AppButton} from 'components/button';

export default class ActivityItem extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	_renderTitle = () => {
		const {type} = this.props;
		let text = I18nTran.t('phone-call');
		let icon = 'actionCall';
		let iconStyle = styles.image;
		if (type == ACTIVITY_TYPE.CALL) {
			text = I18nTran.t('phone-call');
			icon = 'actionCall';
		} else if (type == ACTIVITY_TYPE.EMAIL) {
			text = I18nTran.t('activity_send_email');
			icon = 'actionEmail';
			iconStyle = {
				...iconStyle,
				height: 18,
			};
		} else if (type == ACTIVITY_TYPE.SMS) {
			text = I18nTran.t('activity_send_sms');
			icon = 'actionMessage';
		} else if (type == ACTIVITY_TYPE.MEETING) {
			text = I18nTran.t('activity_meeting');
			icon = 'actionCalendar';
		}
		return (
			<View style={styles.leftTitleContainer}>
				<View style={styles.iconContainer}>
					<Image style={iconStyle} source={themes.getImages(icon)} />
				</View>
				<AppTextWithoutTranslate
					type={'BLOCK-HEADER'}
					text={` ${text}`}
					IProps={{numberOfLines: 1}}
					IStyles={{
						fontSize: 18,
					}}
				/>
			</View>
		);
	};

	_handleViewDetail = () => {
		console.log('_handleViewDetail');
	};

	_handleDeleteActivity = () => {
		console.log('_handleDeleteActivity');
		const {onDelete, activityId} = this.props;
		onDelete && onDelete(activityId);
	};

	_handleEdit = () => {
		const {onEdit, onDelete, ...itemData} = this;
		onEdit && onEdit(itemData);
	};

	// now - executionTime
	_timeDiff = memoizeOne(executionTime => {
		const now = moment()
			.endOf('day')
			.unix();
		const executionTimeMs = moment(executionTime, 'YYYY-MM-DD HH:mm:ss')
			.endOf('day')
			.unix();
		return now - executionTimeMs;
	});

	_formatTimeItemActive = memoizeOne(executionTime => {
		return moment(executionTime, 'YYYY-MM-DD HH:mm:ss').format(
			'HH:mm DD/MM/YY',
		);
	});

	_formatTimeItemExpire = memoizeOne(executionTime => {
		return moment(executionTime, 'YYYY-MM-DD HH:mm:ss').format(
			'HH:mm DD/MM/YYYY',
		);
	});

	_renderTimeTag = () => {
		const {executionTime} = this.props;
		const timeDiff = this._timeDiff(executionTime);
		const isOver = timeDiff > 0;
		const numberOfDays =
			timeDiff == 0 ? 1 : Math.ceil(Math.abs(timeDiff) / 86400);
		if (isOver) {
			return (
				<View style={styles.tagOver}>
					<AppNormalText
						type={'body2'}
						IStyles={{
							color: themes.getColor('red'),
						}}
						option={{day: numberOfDays}}
						text={'is_over_day'}
					/>
				</View>
			);
		}
		return (
			<View style={styles.tagOngoing}>
				<AppTextWithoutTranslate
					IStyles={{
						color: themes.getColor('orange'),
					}}
					type={'body2'}
					text={`${numberOfDays} ${I18nTran.t('day')}`}
				/>
			</View>
		);
	};

	_handlePressCallNow = () => {
		console.log('_handlePressCallNow');
	};

	_handlePressUpdateResult = () => {
		const {onUpdate, onDelete, ...itemData} = this.props;
		console.log('onUpdate', onUpdate);
		onUpdate && onUpdate(itemData);
	};

	_renderMenuOption = () => {
		const {result} = this.props;
		return (
			<Menu>
				<MenuTrigger>
					<Image
						style={styles.optionIcon}
						source={themes.getImages('threeDot')}
					/>
				</MenuTrigger>
				<MenuOptions
					style={{
						borderRadius: 5,
					}}>
					<MenuOption
						onSelect={this._handleViewDetail}
						style={styles.menuOption}>
						<AppNormalText text={'show_detail'} type={'BODY'} />
					</MenuOption>
					{!result && (
						<MenuOption
							onSelect={this._handleEdit}
							style={styles.menuOption}>
							<AppNormalText text={'edit_vi'} type={'BODY'} />
						</MenuOption>
					)}
					{!result && (
						<MenuOption
							onSelect={this._handleDeleteActivity}
							style={styles.menuOption}>
							<AppNormalText
								text={'delete_activity'}
								type={'BODY'}
							/>
						</MenuOption>
					)}
				</MenuOptions>
			</Menu>
		);
	};

	_renderItemActive = () => {
		const {type, executionTime, note, result} = this.props;
		const timeDiff = this._timeDiff(executionTime);
		const isOver = timeDiff > 0;
		const mainColor = isOver
			? themes.getColor('red')
			: themes.getColor('orange');
		return (
			<View
				style={[
					styles.itemActiveContainer,
					{
						borderLeftWidth: 3,
						borderLeftColor: mainColor,
					},
				]}>
				<View style={{flex: 1}}>
					<View style={styles.leftTitleContainer}>
						{this._renderTitle()}
						<AppTextWithoutTranslate
							IStyles={{
								color: themes.getColor('mainColor'),
								fontSize: 18,
							}}
							type={'BLOCK-HEADER'}
							text={` ${this._formatTimeItemActive(
								executionTime,
							)}`}
						/>
						{this._renderTimeTag()}
					</View>
					<View style={styles.bodySpacer} />
					{!!result ? (
						<AppTextWithoutTranslate
							text={`${I18nTran.t('result')}: ${result}`}
							IProps={{numberOfLines: 1}}
						/>
					) : !!note ? (
						<AppTextWithoutTranslate
							text={`${I18nTran.t('note1')}: ${note}`}
							IProps={{numberOfLines: 1}}
						/>
					) : (
						<View />
					)}
				</View>
				<View>
					{type == ACTIVITY_TYPE.CALL && (
						<AppButton
							TextStyle={{
								color: themes.getColor('white'),
							}}
							ButtonStyle={[
								{
									marginBottom: 10,
									backgroundColor: mainColor,
								},
								styles.button,
							]}
							textType={'BLOCK-HEADER'}
							text={I18nTran.t('call_now').toUpperCase()}
							ButtonProps={{
								onPress: this._handlePressCallNow,
							}}
							withoutTranslate
						/>
					)}
					<AppButton
						ButtonStyle={[styles.button]}
						textType={'BLOCK-HEADER'}
						text={I18nTran.t('update_result').toUpperCase()}
						ButtonProps={{
							onPress: this._handlePressUpdateResult,
						}}
						withoutTranslate
					/>
				</View>
				{this._renderMenuOption()}
			</View>
		);
	};

	_renderItemExpired = () => {
		const {result, partner, executionTime, note} = this.props;
		return (
			<View>
				<View style={styles.top}>
					{this._renderTitle()}
					<View style={styles.rightTitleContainer}>
						<AppTextWithoutTranslate
							text={`${this._formatTimeItemExpire(
								executionTime,
							)} `}
						/>
						{this._renderMenuOption()}
					</View>
				</View>
				<View style={styles.bottom}>
					<AppTextWithoutTranslate
						text={result}
						IProps={{numberOfLines: 0}}
					/>
					{!!partner && (
						<View>
							<View style={styles.bodySpacer} />
							<Text numberOfLines={0}>
								<AppTextWithoutTranslate
									text={`${I18nTran.t('activity_partner')}: `}
								/>
								<AppTextWithoutTranslate
									IStyles={{
										color: themes.getColor('mainColor'),
									}}
									type={'BODY'}
									text={partner}
								/>
							</Text>
						</View>
					)}
				</View>
			</View>
		);
	};

	render() {
		const {containerStyle, executionTime, result} = this.props;
		const isExpired =
			this._timeDiff(executionTime) > ACTIVITY_EXPIRE_PERIOD;
		return (
			<View
				style={[
					styles.container,
					containerStyle instanceof Array
						? [...containerStyle]
						: {...containerStyle},
				]}>
				{/* {this._renderItemExpired()} */}
				{result ? this._renderItemExpired() : this._renderItemActive()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		justifyContent: 'space-between',
		...SHALLOW_STYLE,
		borderRadius: 8,
	},
	top: {
		padding: PADDING_COMMON,
		borderBottomColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	bottom: {
		padding: PADDING_COMMON,
		width: '100%',
	},
	bodySpacer: {
		height: PADDING_COMMON,
	},
	image: {
		width: 20,
		padding: 3,
		height: 20,
		resizeMode: 'contain',
	},
	optionIcon: {
		width: 20,
		padding: 3,
		height: 20,
		resizeMode: 'contain',
		opacity: 0.5,
	},
	leftTitleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightTitleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconContainer: {
		width: 24,
	},
	menuOption: {
		padding: PADDING_COMMON,
	},
	itemActiveContainer: {
		padding: PADDING_COMMON,
		flexDirection: 'row',
	},
	button: {
		paddingVertical: 8,
		borderRadius: 8,
	},
	tagOver: {
		borderWidth: 1,
		paddingHorizontal: 5,
		paddingVertical: 2,
		borderRadius: 5,
		borderColor: themes.getColor('red'),
		marginLeft: 5,
	},
	tagOngoing: {
		borderWidth: 1,
		paddingHorizontal: 5,
		paddingVertical: 2,
		borderRadius: 5,
		borderColor: themes.getColor('orange'),
		marginLeft: 5,
	},
});
