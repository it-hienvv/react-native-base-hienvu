import React from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {AppImages} from 'components/image';
import {BOTTOM_WIDTH_SIZE} from 'contants/themes/size';
import themes from 'assets/themes';
import {
	SALE_KIT_SCREEN,
	CURRENT_CUSTOMER,
	DASHBOARD_SCREEN,
	KPI_SCREEN,
	CLUE_CUSTOMER,
	OPPORTUNITY_CUSTOMER,
	QUESTION_CUSTOMER,
	WARNING_CUSTOMER,
} from 'routers/screenNames';
import {LEFT_TAB_KEY} from 'contants/contants';
import {HEADER_OPPORTUNITY_TAB_ACTIVE_ID} from 'features/customer/clue-customer/clue/contants';
const {width, height} = Dimensions.get('window');

const imageWidth = 30;
const borderLeftWidth = 5;
const data = [
	{
		uri: themes.getImages('home'),
		screenName: DASHBOARD_SCREEN,
		key: LEFT_TAB_KEY.home.key,
		name: LEFT_TAB_KEY.home.name,
	},
	{
		uri: themes.getImages('saleKit'),
		screenName: SALE_KIT_SCREEN,
		key: LEFT_TAB_KEY.saleKit.key,
		name: LEFT_TAB_KEY.saleKit.name,
	},
	{
		uri: themes.getImages('shop'),
		screenName: CLUE_CUSTOMER,
		key: LEFT_TAB_KEY.clue.key,
		name: LEFT_TAB_KEY.clue.name,
	},
	{
		uri: themes.getImages('contact'),
		screenName: CURRENT_CUSTOMER,
		key: LEFT_TAB_KEY.currentCustomer.key,
		name: LEFT_TAB_KEY.currentCustomer.name,
	},
	{
		uri: themes.getImages('questionTab'),
		screenName: QUESTION_CUSTOMER,
		key: LEFT_TAB_KEY.questionCustomer.key,
		name: LEFT_TAB_KEY.questionCustomer.name,
	},
	{
		uri: themes.getImages('kpi'),
		screenName: KPI_SCREEN,
		key: LEFT_TAB_KEY.kpi.key,
		name: LEFT_TAB_KEY.kpi.name,
	},
	{
		uri: themes.getImages('warning2'),
		screenName: WARNING_CUSTOMER,
		key: LEFT_TAB_KEY.warningCustomer.key,
		name: LEFT_TAB_KEY.warningCustomer.name,
	},
];

const listRouterFilter = [
	{
		uri: themes.getImages('shop'),
		screenName: OPPORTUNITY_CUSTOMER,
		key: LEFT_TAB_KEY.opportunity.key,
		name: LEFT_TAB_KEY.opportunity.name,
	},
];
class LeftAppTab extends React.PureComponent {
	constructor(props) {
		super(props);
		const index = props.navigation.state.index;
		const routes = props.navigation.state.routes;
		this.state = {
			index,
			routes,
			item: data[0],
		};
	}

	componentDidUpdate(prevProps) {
		const index = this.props.navigation.state.index;
		const prvIndex = prevProps.navigation.state.index;
		if (this.state.item.key === LEFT_TAB_KEY.clue.key) {
			if (prevProps.clueTabActiveId !== this.props.clueTabActiveId) {
				if (
					this.props.clueTabActiveId ===
					HEADER_OPPORTUNITY_TAB_ACTIVE_ID.clue
				) {
					this._jumpToClue();
				} else {
					this._jumpToOpportunity();
				}
			}
		}
		if (index !== prvIndex) {
			if (index === 0) {
				this.setState({index, item: data[0]});
				this.props.onTabPress(data[0]);
			}
		}
	}

	_jumpToClue = () => {
		const item = {
			uri: themes.getImages('shop'),
			screenName: CLUE_CUSTOMER,
			key: LEFT_TAB_KEY.clue.key,
			name: LEFT_TAB_KEY.clue.name,
		};
		this.props.onTabPress(item);
		this.props.jumpTo(CLUE_CUSTOMER);
	};

	_jumpToOpportunity = () => {
		const item = {
			uri: themes.getImages('shop'),
			screenName: OPPORTUNITY_CUSTOMER,
			key: LEFT_TAB_KEY.opportunity.key,
			name: LEFT_TAB_KEY.opportunity.name,
		};
		this.props.onTabPress(item);
		this.props.jumpTo(OPPORTUNITY_CUSTOMER);
	};

	onPressChangeScreen = (key, index) => () => {
		const findItem = data.find(item => item.screenName === key);
		if (findItem) {
			this.setState({index, item: findItem});
			if (key === CLUE_CUSTOMER) {
				if (
					this.props.clueTabActiveId ===
					HEADER_OPPORTUNITY_TAB_ACTIVE_ID.clue
				) {
					this._jumpToClue();
				} else {
					this._jumpToOpportunity();
				}
			} else {
				this.props.onTabPress(findItem);
				this.props.jumpTo(key);
			}
		}
	};

	renderTab = (e, index) => {
		const findIndex = data.findIndex(item => item.screenName === e.key);
		return (
			<TouchableOpacity
				onPress={this.onPressChangeScreen(e.key, index)}
				style={[
					styles.button,
					this.state.index === index && styles.subButton,
				]}
				key={e.key}>
				<AppImages
					ButtonProps={{disabled: true}}
					ImageStyle={[
						styles.image,
						this.state.index === index && {
							tintColor: themes.getColor('mainColor'),
						},
					]}
					uri={
						findIndex >= 0
							? data[findIndex].uri
							: themes.getImages('shop')
					}
				/>
			</TouchableOpacity>
		);
	};

	render() {
		const {navigation} = this.props;
		const routers = navigation.state.routes.filter(item =>
			listRouterFilter.find(ii => ii.screenName !== item.key),
		);
		return (
			<View style={styles.container}>{routers.map(this.renderTab)}</View>
		);
	}
}

export default LeftAppTab;
const styles = StyleSheet.create({
	container: {
		width: BOTTOM_WIDTH_SIZE,
		height,
		position: 'absolute',
		top: 0,
		left: 0,
		paddingTop: 34,
		backgroundColor: '#F4F6FA',
	},
	image: {
		width: imageWidth,
		height: imageWidth,
		resizeMode: 'contain',
	},
	button: {
		width: '100%',
		height: 48,
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		paddingLeft: BOTTOM_WIDTH_SIZE / 2 - imageWidth / 2,
		marginBottom: 20,
	},
	subButton: {
		borderLeftWidth: borderLeftWidth,
		borderLeftColor: '#141ED2',
		backgroundColor: '#ECEDFF',
		paddingLeft: BOTTOM_WIDTH_SIZE / 2 - imageWidth / 2 - borderLeftWidth,
	},
});
