import React, {Component} from 'react';
import {
	View,
	FlatList,
	Image,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import CalendarStrip from 'react-native-calendar-strip';
import GestureRecognizer from 'react-native-swipe-gestures';
import moment from 'moment';
import 'moment/locale/vi';
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from 'react-native-popup-menu';
// ----------------------------------------------------------
import {BOTTOM_WIDTH_SIZE, PADDING_COMMON} from 'contants/themes/size';
import {WIDTH_SCREEN, getLeftColor, AppAlertOnlyOkay} from 'utils/util';
import CheckBox from 'react-native-check-box';
import ModalUpdateToDoDetail from 'features/home/components/ModalUpdateToDoDetail';
import {AppNormalText, AppTextWithoutTranslate} from 'components/text';
import realmHelper from 'utils/realm/realmHelper';
import realmCollectionName from 'utils/realm/realmCollectionName';
import {LIST_TIME} from 'features/dashboard/contants';
import styles from './styles';
import themes from 'assets/themes';
import {AppImages} from 'components/image';
import {APP_CONFIG} from 'contants/contants';
import AppFlatList from 'components/flatlist/flatlist';
import {AppModalManager} from 'components/app-modal/Manager';
const HEIGHT = 500;
const HEIGHT_ROW = 80;
const WIDTH_CALENDAR =
	((WIDTH_SCREEN - BOTTOM_WIDTH_SIZE - PADDING_COMMON * 3) * 2) / 3;
const MILLISECONDS = 604800000;

class Calendar extends Component {
	static propTypes = {
		width: PropTypes.number,
		height: PropTypes.number,
	};
	static defaultProps = {
		width: WIDTH_CALENDAR,
		height: HEIGHT,
	};
	constructor(props) {
		super(props);
		this.state = {
			dataWorkCalendar: [],
			isCheckedCustomerCalendar: true,
			isCheckedControlAfter: true,
			isCheckedSLA: true,
			isCheckedRevaluation: false,
			startWeekTimestamp: moment()
				.startOf('week')
				.valueOf(),
			endWeekTimestamp: moment()
				.endOf('week')
				.valueOf(),
		};
	}

	componentDidMount() {
		this._onLoadData();
	}

	_onSwipeLeft = async () => {
		this.myCalendarStrip && this.myCalendarStrip.getNextWeek();
		await this.setState({
			startWeekTimestamp: this.state.startWeekTimestamp + MILLISECONDS,
			endWeekTimestamp: this.state.endWeekTimestamp + MILLISECONDS,
		});
		this._onLoadData();
	};

	_onSwipeRight = async () => {
		this.myCalendarStrip && this.myCalendarStrip.getPreviousWeek();
		await this.setState({
			startWeekTimestamp: this.state.startWeekTimestamp - MILLISECONDS,
			endWeekTimestamp: this.state.endWeekTimestamp - MILLISECONDS,
		});
		this._onLoadData();
	};

	_onPressPlusCalendar = () => {
		const data = <ModalUpdateToDoDetail _onLoadData={this._onLoadData} />;
		AppModalManager.showModalWithJSX({data, backDrop: false});
	};

	_onLoadData = () => {
		realmHelper
			.queryAllByFiltering({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].DashboardSchemaName
						.workCalendar,
				condition: `timestamp > ${this.state.startWeekTimestamp} AND timestamp < ${this.state.endWeekTimestamp} SORT(timestamp ASC)`,
			})
			.then(response => {
				this.setState({dataWorkCalendar: response});
			})
			.catch(err => {
				AppAlertOnlyOkay({title: 'load_data_error'});
			});
	};

	_onPressItem = item => () => {
		const data = (
			<ModalUpdateToDoDetail
				isEdit={true}
				item={item}
				_onLoadData={this._onLoadData}
			/>
		);
		AppModalManager.showModalWithJSX({data, backDrop: false});
	};

	_keyExtractor = (item, index) => `${index}`;

	_renderDayComponent = day => {
		const dateNameStyle =
			moment(day.date).isoWeekday() <= 5
				? styles.weekDay
				: styles.weekEnd;
		if (moment(day.date._d).isSame(day.date._i, 'day')) {
			return (
				<View style={styles.viewDayComponent}>
					<AppTextWithoutTranslate
						type={'BODY1'}
						text={moment.weekdaysShort(
							moment(day.date).isoWeekday(),
						)}
						IStyles={styles.textWeekDay}
					/>
					<View style={styles.viewMonthDay}>
						<AppTextWithoutTranslate
							type={'H2'}
							text={moment(day.date).format('DD')}
							IStyles={styles.textMonthDayToday}
						/>
					</View>
				</View>
			);
		} else {
			return (
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<AppTextWithoutTranslate
						type={'BODY1'}
						text={moment.weekdaysShort(
							moment(day.date).isoWeekday(),
						)}
						IStyles={dateNameStyle}
					/>
					<AppTextWithoutTranslate
						type={'H2'}
						text={moment(day.date).format('DD')}
						IStyles={styles.textMonthDay}
					/>
				</View>
			);
		}
	};

	_renderIconModalFilter = () => {
		return (
			<Menu>
				<MenuTrigger>
					<Image
						source={themes.getImages('filter')}
						style={styles.iconFilter}
					/>
				</MenuTrigger>
				<MenuOptions>
					<View style={styles.viewAllOptions}>
						<MenuOption disabled={true}>
							<AppNormalText
								type={'BODY'}
								text={'show_on_calendar'}
							/>
						</MenuOption>
						<MenuOption disabled={true}>
							<View style={styles.viewOptionBig}>
								<View style={styles.viewOptionSmall}>
									<Image
										style={styles.iconOption}
										source={themes.getImages(
											'calendar',
										)}></Image>
									<AppNormalText
										type={'BODY'}
										text={'customer_calendar'}
										IStyles={styles.textOption}
									/>
								</View>
								<CheckBox
									onClick={() => {
										this.setState({
											isCheckedCustomerCalendar: !this
												.state
												.isCheckedCustomerCalendar,
										});
									}}
									isChecked={
										this.state.isCheckedCustomerCalendar
									}
									checkedCheckBoxColor={themes.getColor(
										'mainColor',
									)}
								/>
							</View>
						</MenuOption>
						<MenuOption disabled={true}>
							<View style={styles.viewOptionBig}>
								<View style={styles.viewOptionSmall}>
									<Image
										style={styles.iconOption}
										source={themes.getImages(
											'camera',
										)}></Image>
									<AppNormalText
										type={'BODY'}
										text={'control_after'}
										IStyles={styles.textOption}
									/>
								</View>
								<CheckBox
									onClick={() => {
										this.setState({
											isCheckedControlAfter: !this.state
												.isCheckedControlAfter,
										});
									}}
									isChecked={this.state.isCheckedControlAfter}
									checkedCheckBoxColor={themes.getColor(
										'mainColor',
									)}
								/>
							</View>
						</MenuOption>
						<MenuOption disabled={true}>
							<View style={styles.viewOptionBig}>
								<View style={styles.viewOptionSmall}>
									<Image
										style={styles.iconOption}
										source={themes.getImages(
											'like',
										)}></Image>
									<AppNormalText
										type={'BODY'}
										text={'sla'}
										IStyles={styles.textOption}
									/>
								</View>
								<CheckBox
									onClick={() => {
										this.setState({
											isCheckedSLA: !this.state
												.isCheckedSLA,
										});
									}}
									isChecked={this.state.isCheckedSLA}
									checkedCheckBoxColor={themes.getColor(
										'mainColor',
									)}
								/>
							</View>
						</MenuOption>
						<MenuOption disabled={true}>
							<View style={styles.viewOptionBig}>
								<View style={styles.viewOptionSmall}>
									<Image
										style={styles.iconOption}
										source={themes.getImages(
											'twoHands',
										)}></Image>
									<AppNormalText
										type={'BODY'}
										text={'revaluation'}
										IStyles={styles.textOption}
									/>
								</View>
								<CheckBox
									onClick={() => {
										this.setState({
											isCheckedRevaluation: !this.state
												.isCheckedRevaluation,
										});
									}}
									isChecked={this.state.isCheckedRevaluation}
									checkedCheckBoxColor={themes.getColor(
										'mainColor',
									)}
								/>
							</View>
						</MenuOption>
						<MenuOption>
							<View style={styles.viewButton}>
								<AppNormalText
									type={'BUTTON1'}
									text={'update_vi'}
									IStyles={styles.textButton}
								/>
							</View>
						</MenuOption>
					</View>
				</MenuOptions>
			</Menu>
		);
	};

	_renderHeader = () => {
		return (
			<View style={styles.wrapHeader}>
				<AppNormalText type={'BLOCK-HEADER'} text={'calendar'} />
				<View style={styles.viewWrapNote}>
					<View style={styles.viewNoteRed} />
					<AppNormalText
						type={'BODY1'}
						text={'high'}
						IStyles={styles.textNote}
					/>
					<View style={styles.viewNoteBlue} />
					<AppNormalText
						type={'BODY1'}
						text={'medium'}
						IStyles={styles.textNote}
					/>
					<View style={styles.viewNoteYellow} />
					<AppNormalText
						type={'BODY1'}
						text={'low'}
						IStyles={styles.textNote}
					/>
				</View>
				<View style={styles.viewWrapIcon}>
					{this._renderIconModalFilter()}
					<AppImages
						uri={themes.getImages('plus')}
						ButtonProps={{onPress: this._onPressPlusCalendar}}
						// style={styles.iconPlus}
					/>
				</View>
			</View>
		);
	};

	_renderListDay = () => {
		const config = {
			velocityThreshold: 0.3,
			directionalOffsetThreshold: 80,
		};
		return (
			<View style={styles.flexOne}>
				<GestureRecognizer
					onSwipeLeft={this._onSwipeLeft}
					onSwipeRight={this._onSwipeRight}
					config={config}
					style={styles.gesture}>
					<CalendarStrip
						style={styles.flexOne}
						showMonth={false}
						leftSelector={[]}
						rightSelector={[]}
						ref={calendarStrip => {
							this.myCalendarStrip = calendarStrip;
						}}
						locale={{
							name: 'vi',
							config: {
								weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split(
									'_',
								),
							},
						}}
						dayComponent={this._renderDayComponent}
					/>
				</GestureRecognizer>
			</View>
		);
	};

	_renderComponentBelowHeader = () => {
		const {width} = this.props;
		return (
			<View style={styles.flexRow}>
				<View style={[styles.cellLeftCalendar, {width: width / 8}]} />
				{this._renderListDay()}
			</View>
		);
	};

	_renderDataItem = () => {
		const {width} = this.props;
		const {dataWorkCalendar} = this.state;
		let items = [];
		dataWorkCalendar.forEach((element, index) => {
			let level = 1;
			let leftColor = getLeftColor(
				level,
				themes.getColor('red'),
				themes.getColor('mainColor'),
				themes.getColor('yellow'),
			);
			let backgroundColorItem = getLeftColor(
				level,
				themes.getColor('backgroundRed'),
				themes.getColor('backgroundBlue'),
				themes.getColor('backgroundYellow'),
			);
			let marginTop =
				HEIGHT_ROW / 2 +
				HEIGHT_ROW * element.startHour +
				(HEIGHT_ROW * element.startMinute) / 60;
			let marginLeft = (element.weekDay * width) / 8;
			let height = (element.minutes * HEIGHT_ROW) / 60;
			let lines = Math.floor((element.minutes / 60) * 4) - 1; // 4 is number of lines in one hour
			items.push(
				<TouchableOpacity
					key={index}
					onPress={this._onPressItem(element)}
					style={[
						styles.wrapDataItem,
						{
							marginLeft,
							width: width / 8,
							marginTop,
							height,
							backgroundColor: leftColor,
						},
					]}>
					<View style={styles.viewItemBig}>
						<View
							style={[
								styles.viewItemSmall,
								{backgroundColor: backgroundColorItem},
							]}>
							<AppTextWithoutTranslate
								type={'BODY2'}
								text={element.title}
								IStyles={styles.itemDescription}
								IProps={{
									numberOfLines: lines,
								}}
							/>
						</View>
					</View>
				</TouchableOpacity>,
			);
		});
		return items;
	};

	_renderListTimeAndCell = () => {
		const {width} = this.props;
		return (
			<AppFlatList
				data={LIST_TIME}
				renderItem={({item, index}) => {
					let items = [];
					let height = index === 0 ? HEIGHT_ROW / 2 : HEIGHT_ROW;
					let marginBottom =
						index === 0 ? HEIGHT_ROW / 2 : HEIGHT_ROW;
					for (let i = 0; i < 7; i++) {
						items.push(
							<View
								key={i}
								style={[
									styles.cellLine,
									{
										width: width / 8,
										height,
										marginBottom,
									},
								]}
							/>,
						);
					}
					return (
						<View style={styles.viewLineHour}>
							<AppTextWithoutTranslate
								type={'BODY1'}
								text={item}
								IStyles={[
									styles.textHour,
									{
										width: width / 8,
									},
								]}
							/>
							{items}
						</View>
					);
				}}
				keyExtractor={this._keyExtractor}
			/>
		);
	};

	_renderTableData = () => {
		return (
			<ScrollView style={styles.flexOne} nestedScrollEnabled={true}>
				{this._renderListTimeAndCell()}
				{this._renderDataItem()}
			</ScrollView>
		);
	};

	render() {
		const {width, height} = this.props;
		return (
			<View style={[styles.calendar, {width, height}]}>
				{this._renderHeader()}
				{this._renderComponentBelowHeader()}
				{this._renderTableData()}
			</View>
		);
	}
}

export default Calendar;
