import React from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	BackHandler,
	TouchableOpacity,
} from 'react-native';
import I18nTran from 'assets/language';
import {BOTTOM_WIDTH_SIZE, PADDING_COMMON} from 'contants/themes/size';
import {WIDTH_SCREEN, getLeftColor2, AppAlertOnlyOkay, isIos} from 'utils/util';
import CheckBox from 'react-native-check-box';
import Calendar from '../components/Calendar';
import CustomerPieChart from 'components/chart/CustomerPieChart';
import StackedBarChartScreen from 'components/chart/StackedBarChartScreen';
import FunnelChart from 'components/chart/FunnelChart';
import ChartStyle from 'components/chart/styles/TempStyle';
import TableDetail from '../components/TableDetail';
import {AppImages} from 'components/image';
import {AppNormalText, AppTextWithoutTranslate} from 'components/text';
import AppTextInput from 'components/text-input';
import AppPopupMenu from 'components/popup-menu';
import {
	segmentationChart,
	vipChart,
	SPDVChart,
} from 'components/chart/FakeData/chartData';
import {AppButton} from 'components/button';
import realmHelper from 'utils/realm/realmHelper';
import realmCollectionName from 'utils/realm/realmCollectionName';
import moment from 'moment';
import {menuList} from '../contants';
import CompWrapper from 'components/comp-wrapper';
import themes from 'assets/themes';
import {APP_CONFIG} from 'contants/contants';
import {NavigationEvents} from 'react-navigation';
import AppFlatList from 'components/flatlist/flatlist';
import {AppToastManager} from 'components/app-modal/Manager';
import AppContainer from 'components/container';

const {
	greenColor,
	orangeColor,
	grayColor,
	redColor,
	blueColor,
} = ChartStyle.PieChart;

let listColorSegmentation = [greenColor, blueColor, orangeColor, grayColor];

let listColorVip = [greenColor, grayColor, orangeColor];

let listColorSPDV = [grayColor, greenColor, orangeColor, blueColor, redColor];

const WIDTH_1_3 = (WIDTH_SCREEN - BOTTOM_WIDTH_SIZE - PADDING_COMMON * 3) / 3;
let dataTodo = [
	{
		id: 1,
		level: 1,
		isChecked: false,
		description: 'Họp tìm kiếm giải pháp hoạt đồng team UXD',
	},
	{
		id: 2,
		level: 2,
		isChecked: false,
		description: 'Nạp tiền internet',
	},
	{
		id: 3,
		level: 3,
		isChecked: false,
		description: 'Chốt design SmartRM với team UXD',
	},
	{
		id: 4,
		level: 4,
		isChecked: false,
		description:
			'Họp tìm kiếm giải pháp hoạt đồng team UXD và làm việc về graphic design ',
	},
	{
		id: 5,
		level: 1,
		isChecked: false,
		description: 'Dev chức năng tìm kiếm trên giao diện SmartRM',
	},
	{
		id: 6,
		level: 2,
		isChecked: true,
		description: 'Nạp tiền điện thoại 0981911011',
	},
	{
		id: 7,
		level: 3,
		isChecked: true,
		description:
			'Họp tìm kiếm giải pháp hoạt đồng team UXD và làm việc về graphic design ',
	},
];
const LEVEL_TODO = [
	{level: 1, color: themes.getColor('grayLight')},
	{level: 2, color: themes.getColor('yellow')},
	{level: 3, color: themes.getColor('mainColor')},
	{level: 4, color: themes.getColor('red')},
];

let dataTableFake = [
	{
		id: 1,
		funnel_step: 'Số lead KH',
		target: 30,
		target_TLCD: '20%',
		target_1: 20,
	},
	{
		id: 2,
		funnel_step: 'Gọi điện',
		target: 30,
		target_TLCD: '20%',
		target_1: 20,
	},
	{
		id: 3,
		funnel_step: 'Gặp',
		target: 30,
		target_TLCD: '20%',
		target_1: 20,
	},
	{
		id: 4,
		funnel_step: 'Refer',
		target: 30,
		target_TLCD: '20%',
		target_1: 20,
	},
	{
		id: 5,
		funnel_step: 'Deal',
		target: 30,
		target_TLCD: '20%',
		target_1: 20,
	},
	{
		id: 6,
		funnel_step: 'Others',
		target: 30,
		target_TLCD: '20%',
		target_1: 20,
	},
];

let dataTableFake1 = [
	{
		id: 1,
		fullname: 'Nguyễn Văn A',
		present_money: 21000000,
		yesterday_money: 21000000,
	},
	{
		id: 2,
		fullname: 'Nguyễn Văn B',
		present_money: 21000000,
		yesterday_money: 20000000,
	},
	{
		id: 3,
		fullname: 'Nguyễn Văn C',
		present_money: 21000000,
		yesterday_money: 25000000,
	},
	{
		id: 4,
		fullname: 'Nguyễn Văn D',
		present_money: 2100000,
		yesterday_money: 2000000,
	},
	{
		id: 5,
		fullname: 'Nguyễn Văn E',
		present_money: 21000000,
		yesterday_money: 30000000,
	},
	{
		id: 6,
		fullname: 'Nguyễn Văn F',
		present_money: 21000000,
		yesterday_money: 2000000,
	},
	{
		id: 7,
		fullname: 'Nguyễn Văn B',
		present_money: 21000000,
		yesterday_money: 20000000,
	},
	{
		id: 8,
		fullname: 'Nguyễn Văn C',
		present_money: 21000000,
		yesterday_money: 25000000,
	},
	{
		id: 9,
		fullname: 'Nguyễn Văn D',
		present_money: 2100000,
		yesterday_money: 2000000,
	},
	{
		id: 10,
		fullname: 'Nguyễn Văn E',
		present_money: 21000000,
		yesterday_money: 30000000,
	},
	{
		id: 11,
		fullname: 'Nguyễn Văn F',
		present_money: 21000000,
		yesterday_money: 2000000,
	},
];

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataTodo,
			optionFilterTable: menuList[0].text,
			segmentationChart: [],
			vipChart: [],
			SPDVChart: [],

			isShowAddTodo: false,
			levelNewItem: 1,
			isEdit: false,
			itemEdit: {},

			dataTableSelling: [],
			dataTableBalance: [],
		};
		this.count = 0;
	}

	componentDidMount() {
		if (!isIos) {
			this.backHandler = BackHandler.addEventListener(
				'hardwareBackPress',
				this.handleBackPress,
			);
		}
		this.setState({
			segmentationChart: [
				...segmentationChart.map(status => ({
					label: status.title,
					value: status.value,
				})),
			],
			vipChart: [
				...vipChart.map(status => ({
					label: status.title,
					value: status.value,
				})),
			],
			SPDVChart: [
				...SPDVChart.map(status => ({
					label: status.title,
					value: status.value,
				})),
			],
			dataTableSelling: dataTableFake,
			dataTableBalance: dataTableFake1,
		});
		this._onLoadData();
	}

	onDidBlur = () => {
		if (!isIos) {
			this.backHandler.remove();
		}
	};

	onDidFocus = () => {
		if (!isIos) {
			this.backHandler = BackHandler.addEventListener(
				'hardwareBackPress',
				this.handleBackPress,
			);
		}
	};

	componentWillUnmount() {
		if (!isIos) {
			this.backHandler.remove();
		}
	}

	handleBackPress = () => {
		if (this.count >= 1) {
			if (this._timeOut) clearTimeout(this._timeOut);
			this.count = 0;
			BackHandler.exitApp();
		} else {
			AppToastManager.show({
				message: 'Bấm back thêm lần nữa để thoát app',
				timer: 1000,
			});
			this.count += 1;
			this._timeOut = setTimeout(() => (this.count = 0), 2000);
			return true;
		}
	};

	_onLoadData = () => {
		realmHelper
			.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].DashboardSchemaName
						.todo,
			})
			.then(response => {
				if (response && !response.length) {
					this.setState({isShowAddTodo: true});
				}
				this.setState({dataTodo: response});
			});
	};

	_onPressSave = () => {
		if (this.appTextInput && this.appTextInput.state.value.trim() === '') {
			AppAlertOnlyOkay({
				title: 'note_empty',
				onPressOK: () => {},
			});
		} else if (this.state.isEdit) {
			realmHelper
				.update({
					collection:
						realmCollectionName[APP_CONFIG.VERSION]
							.DashboardSchemaName.todo,
					data: {
						id: this.state.itemEdit.id,
						level: this.state.levelNewItem,
						description:
							this.appTextInput && this.appTextInput.state.value
								? this.appTextInput.state.value
								: '',
					},
				})
				.then(response => {
					this._onLoadData();
					this.appTextInput._clear();
					this.setState({
						itemEdit: {},
						isShowAddTodo: false,
						isEdit: false,
					});
				});
		} else {
			realmHelper
				.insertRealm({
					collection:
						realmCollectionName[APP_CONFIG.VERSION]
							.DashboardSchemaName.todo,
					data: {
						id: moment()
							.unix()
							.toString(),
						level: this.state.levelNewItem,
						isChecked: false,
						description:
							this.appTextInput && this.appTextInput.state.value
								? this.appTextInput.state.value
								: '',
					},
				})
				.then(response => {
					this._onLoadData();
					this.appTextInput._clear();
				});
		}
	};

	_onPressPlusToDo = () => {
		this.setState({isShowAddTodo: true, levelNewItem: 1});
	};

	_handleCheckTodo = item => () => {
		realmHelper
			.update({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].DashboardSchemaName
						.todo,
				data: {
					id: item.id,
					isChecked: !item.isChecked,
				},
			})
			.then(response => {
				this._onLoadData();
			});
	};

	_onPressGrayBox = () => {
		this.setState({levelNewItem: 1});
	};

	_onPressRedBox = () => {
		this.setState({levelNewItem: 4});
	};

	_onPressBlueBox = () => {
		this.setState({levelNewItem: 3});
	};

	_onPressYellowBox = () => {
		this.setState({levelNewItem: 2});
	};

	_onPressCancel = () => {
		this.setState({
			isShowAddTodo: false,
			levelNewItem: 1,
			itemEdit: {},
			isEdit: false,
		});
		this.appTextInput._clear();
	};

	_onPressItem = item => () => {
		this.setState({
			isEdit: true,
			itemEdit: item,
			levelNewItem: item.level,
		});
		this.appTextInput && this.appTextInput._onChangeText(item.description);
	};

	_keyExtractor = (item, index) => `${index}`;

	_renderCalendar = () => <Calendar />;

	_renderHeaderTodo = () => (
		<View style={styles.wrapHeader}>
			<Text style={styles.textHeader}>{I18nTran.t('to-do')}</Text>
			<AppImages
				uri={themes.getImages('plus')}
				ButtonProps={{onPress: this._onPressPlusToDo}}
			/>
		</View>
	);

	_renderAddTodo = () => {
		let {isEdit, itemEdit} = this.state;
		return (
			<View style={styles.viewAddTodo}>
				<View style={styles.viewTextInputAndSelectLevel}>
					<AppTextInput
						text={isEdit ? itemEdit.description : ''}
						ref={refs => (this.appTextInput = refs)}
						placeholder={I18nTran.t('note')}
						TextInputStyles={styles.textInputNote}
						TextInputProps={{
							multiline: true,
							numberOfLines: 4,
						}}
					/>
					<View style={styles.viewSelectLevel}>
						<View
							style={
								this.state.levelNewItem !== 1
									? styles.styleBaseWrapNote
									: styles.styleWrapNoteGray
							}>
							<AppButton
								ButtonStyle={styles.viewNoteGray}
								text={' '}
								ButtonProps={{
									onPress: this._onPressGrayBox,
								}}
							/>
						</View>
						<View
							style={
								this.state.levelNewItem !== 4
									? styles.styleBaseWrapNote
									: styles.styleWrapNoteRed
							}>
							<AppButton
								ButtonStyle={styles.viewNoteRed}
								text={' '}
								ButtonProps={{
									onPress: this._onPressRedBox,
								}}
							/>
						</View>
						<View
							style={
								this.state.levelNewItem !== 3
									? styles.styleBaseWrapNote
									: styles.styleWrapNoteBlue
							}>
							<AppButton
								ButtonStyle={styles.viewNoteBlue}
								text={' '}
								ButtonProps={{
									onPress: this._onPressBlueBox,
								}}
							/>
						</View>
						<View
							style={
								this.state.levelNewItem !== 2
									? styles.styleBaseWrapNote
									: styles.styleWrapNoteYellow
							}>
							<AppButton
								ButtonStyle={styles.viewNoteYellow}
								text={' '}
								ButtonProps={{
									onPress: this._onPressYellowBox,
								}}
							/>
						</View>
					</View>
				</View>
				<View style={styles.wrapButton}>
					<AppButton
						text={'save_vi'}
						textType={'BUTTON1'}
						TextStyle={{color: themes.getColor('white')}}
						ButtonStyle={styles.buttonStyleSave}
						ButtonProps={{
							onPress: this._onPressSave,
						}}
					/>
					<AppButton
						text={'cancel_vi'}
						textType={'BUTTON1'}
						ButtonStyle={styles.buttonStyleCancel}
						ButtonProps={{
							onPress: this._onPressCancel,
						}}
					/>
				</View>
			</View>
		);
	};

	_renderItemTodo = ({item, index}) => {
		let leftColor = getLeftColor2(
			item.level,
			themes.getColor('grayLight'),
			themes.getColor('yellow'),
			themes.getColor('mainColor'),
			themes.getColor('red'),
		);
		let backgroundColorForLevel = getLeftColor2(
			item.level,
			themes.getColor('background'),
			themes.getColor('backgroundYellow'),
			themes.getColor('backgroundBlue'),
			themes.getColor('backgroundRed'),
		);
		return (
			<TouchableOpacity
				onPress={this._onPressItem(item)}
				style={[styles.viewItemTodoBig, {backgroundColor: leftColor}]}>
				<View
					style={[
						styles.viewItemTodoSmall,
						{
							backgroundColor: backgroundColorForLevel,
						},
					]}>
					<View style={styles.viewCheckBox}>
						<CheckBox
							onClick={this._handleCheckTodo(item)}
							isChecked={item.isChecked}
							uncheckedCheckBoxColor={themes.getColor('grayBold')}
							checkedCheckBoxColor={themes.getColor('grayBold')}
						/>
					</View>
					<View style={styles.viewDescription}>
						<Text
							style={
								item.isChecked
									? styles.checkedText
									: styles.unCheckedText
							}>
							{item.description}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	_renderBodyTodo = () => (
		<AppFlatList
			nestedScrollEnabled={true}
			data={this.state.dataTodo}
			renderItem={this._renderItemTodo}
			keyExtractor={this._keyExtractor}
		/>
	);

	_renderTodo = () => (
		<View style={styles.viewBlockTodo}>
			{this._renderHeaderTodo()}
			{this.state.isShowAddTodo || this.state.isEdit
				? this._renderAddTodo()
				: null}
			{this._renderBodyTodo()}
		</View>
	);

	_onPressFilterTable = item => {
		this.setState({
			optionFilterTable: item.text,
		});
	};

	_renderTableSelling = () => {
		const {optionFilterTable, dataTableSelling} = this.state;
		return (
			<TableDetail
				tableTitle={'selling'}
				numberOfColumns={5}
				data={dataTableSelling}
				headers={[
					'STT',
					I18nTran.t('funnel_step'),
					I18nTran.t('target'),
					I18nTran.t('target_TLCD'),
					I18nTran.t('target_1'),
				]}
				rows={['funnel_step', 'target', 'target_TLCD', 'target_1']}
				type={0}
				styleProps={{height: 450}}
				rightCompHeader={
					<AppPopupMenu
						onPress={this._onPressFilterTable}
						key={'3'}
						data={menuList}
						triggerElement={
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'center',
								}}>
								<AppTextWithoutTranslate
									text={optionFilterTable}
									type={'BODY'}
									IStyles={{marginRight: 5}}
								/>
								<AppImages
									ButtonProps={{
										disabled: true,
									}}
									uri={themes.getImages('dropDown')}
								/>
							</View>
						}
					/>
				}
			/>
		);
	};

	_renderTableBalance = () => {
		const {dataTableBalance} = this.state;
		return (
			<TableDetail
				tableTitle={'fluctuations_balance'}
				numberOfColumns={4}
				data={dataTableBalance}
				type={1}
				styleProps={{height: 450}}
				headers={[
					'ID',
					I18nTran.t('fullname'),
					I18nTran.t('present_money'),
					I18nTran.t('yesterday_money'),
				]}
				rows={['id', 'fullname', 'present_money', 'yesterday_money']}
				indexsNumber={[2, 3]}
				rightCompHeader={
					<View style={styles.searchSection}>
						<AppImages
							ButtonProps={{disabled: true}}
							// ImageStyle={styles.image}
							uri={require('assets/images/icon/magnifying-glass.png')}
						/>
						<AppTextInput
							TextInputStyles={styles.textInput}
							placeholder={I18nTran.t('search')}
						/>
					</View>
				}
			/>
		);
	};

	render() {
		const {segmentationChart, vipChart, SPDVChart} = this.state;
		return (
			<AppContainer marginLeft>
				<ScrollView style={styles.container}>
					<NavigationEvents
						onDidBlur={this.onDidBlur}
						onDidFocus={this.onDidFocus}
					/>
					<View style={styles.viewLineBlockFirst}>
						{this._renderCalendar()}
						{this._renderTodo()}
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							marginTop: PADDING_COMMON,
						}}>
						<View
							style={{
								width: WIDTH_1_3,
								marginRight: PADDING_COMMON,
							}}>
							<FunnelChart
								chartTitle={I18nTran.t('potential_customer')}
								// values={segmentationChart}
								// chartHeight={200}
								// colorList={listColorSegmentation}
							/>
						</View>
						{this._renderTableSelling()}
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							marginTop: PADDING_COMMON,
							marginLeft: PADDING_COMMON,
						}}>
						<CompWrapper widthComp={WIDTH_1_3}>
							<StackedBarChartScreen
								chartTitle={I18nTran.t('kpi_score')}
								values={segmentationChart}
								chartHeight={200}
								colorList={listColorSegmentation}
								hasLine={true}
							/>
						</CompWrapper>
						{this._renderTableBalance()}
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							marginVertical: PADDING_COMMON,
							marginLeft: PADDING_COMMON,
						}}>
						<CompWrapper widthComp={WIDTH_1_3 - PADDING_COMMON}>
							<CustomerPieChart
								chartTitle={I18nTran.t('segmentation')}
								values={segmentationChart}
								chartHeight={200}
								colorList={listColorSegmentation}
								hasLine={true}
								hasValueLegend={true}
								typeLegend={1}
							/>
						</CompWrapper>
						<View style={{width: PADDING_COMMON * 2}} />
						<CompWrapper widthComp={WIDTH_1_3 - PADDING_COMMON}>
							<CustomerPieChart
								chartTitle={'Vip/Supper vip'}
								values={vipChart}
								chartHeight={200}
								colorList={listColorVip}
								hasLine={true}
								hasValueLegend={true}
								typeLegend={1}
							/>
						</CompWrapper>
						<View style={{width: PADDING_COMMON * 2}} />
						<CompWrapper widthComp={WIDTH_1_3 - PADDING_COMMON}>
							<CustomerPieChart
								chartTitle={I18nTran.t('number_of_SPDV_used')}
								values={SPDVChart}
								chartHeight={200}
								colorList={listColorSPDV}
								hasLine={true}
								hasValueLegend={true}
								typeLegend={1}
							/>
						</CompWrapper>
					</View>
				</ScrollView>
			</AppContainer>
		);
	}
}

const styleBaseNote = {
	height: 15,
	width: 35,
	borderRadius: 3,
};

const styleBaseWrapNote = {
	marginHorizontal: 5,
	padding: 2,
	borderWidth: 1,
	borderRadius: 3,
};

const styles = StyleSheet.create({
	viewTextInputAndSelectLevel: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: themes.getColor('grayLight'),
		flex: 1,
	},
	viewAddTodo: {
		height: 150,
		margin: 10,
	},
	styleBaseWrapNote: {
		...styleBaseWrapNote,
		borderColor: themes.getColor('white'),
	},
	styleWrapNoteGray: {
		...styleBaseWrapNote,
		borderColor: themes.getColor('grayLight'),
	},
	styleWrapNoteRed: {
		...styleBaseWrapNote,
		borderColor: themes.getColor('red'),
	},
	styleWrapNoteBlue: {
		...styleBaseWrapNote,
		borderColor: themes.getColor('mainColor'),
	},
	styleWrapNoteYellow: {
		...styleBaseWrapNote,
		borderColor: themes.getColor('yellow'),
	},
	viewSelectLevel: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		paddingBottom: 5,
	},
	textInputNote: {
		width: '100%',
		flex: 1,
		borderWidth: 0,
	},
	viewNoteGray: {
		...styleBaseNote,
		backgroundColor: themes.getColor('grayLight'),
	},
	viewNoteRed: {
		...styleBaseNote,
		backgroundColor: themes.getColor('red'),
	},
	viewNoteBlue: {
		...styleBaseNote,
		backgroundColor: themes.getColor('mainColor'),
	},
	viewNoteYellow: {
		...styleBaseNote,
		backgroundColor: themes.getColor('yellow'),
	},
	wrapButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		height: 40,
	},
	buttonStyleCancel: {
		width: '37%',
		borderRadius: 5,
		backgroundColor: themes.getColor('white'),
		borderColor: themes.getColor('grayBold'),
	},
	buttonStyleSave: {
		width: '58%',
		borderRadius: 5,
		backgroundColor: themes.getColor('mainColor'),
	},
	viewDescription: {
		flex: 1,
		marginLeft: 6,
	},
	viewCheckBox: {
		width: 25,
		alignItems: 'center',
	},
	viewBlockTodo: {
		marginHorizontal: PADDING_COMMON,
		width: WIDTH_1_3,
		borderRadius: 10,
		backgroundColor: 'white',
		width: WIDTH_1_3,
		borderRightWidth: 1,
		borderLeftWidth: 1,
		borderBottomWidth: 1,
		borderColor: themes.getColor('grayLight'),
	},
	viewLineBlockFirst: {
		flexDirection: 'row',
		marginTop: PADDING_COMMON,
		marginLeft: PADDING_COMMON,
		height: 500,
	},
	unCheckedText: {
		fontSize: 14,
		lineHeight: 20,
		color: themes.getColor('blackBold'),
	},
	checkedText: {
		fontSize: 14,
		lineHeight: 20,
		color: themes.getColor('blackBold'),
		textDecorationStyle: 'solid',
		textDecorationLine: 'line-through',
		textDecorationColor: themes.getColor('blackBold'),
	},
	viewItemTodoSmall: {
		flex: 1,
		marginLeft: 3,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		flexDirection: 'row',
		padding: 4,
	},
	iconPlus: {
		marginLeft: 10,
		height: 20,
		width: 20,
		resizeMode: 'contain',
		tintColor: themes.getColor('mainColor'),
	},
	textHeader: {
		fontWeight: '600',
		color: themes.getColor('blackBold'),
	},
	wrapHeader: {
		height: 40,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	viewItemTodoBig: {
		marginHorizontal: 10,
		borderRadius: 10,
		marginTop: 10,
	},

	container: {backgroundColor: themes.getColor('background')},

	searchSection: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		width: '40%',
	},
	searchIcon: {
		padding: 10,
	},
	textInput: {
		flex: 1,
		paddingRight: 10,
		paddingLeft: 0,
	},
	line: {
		backgroundColor: themes.getColor('grayLight'),
		height: 1,
		width: '100%',
	},
});
