import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {AppNormalText} from 'components/text';
import themes from 'assets/themes';
import AppFlatList from 'components/flatlist/flatlist';
import {AppImages} from 'components/image';
import SavingCalculations from './saving-calculations';
import {connect} from 'react-redux';
import {TOOL_ACTION} from 'features/sale-kit/product-and-service/actions/actions';
import {
	isShowMenu,
	selectedTool,
} from 'features/sale-kit/product-and-service/selector/saleKitSelectors';
import {DATA_TOOL} from './constants';
import InterestRate from './interest-rate';
import ListRate from './list-rate';
const defaultProps = {
	dataTool: DATA_TOOL,
};

class Tool extends React.PureComponent {
	static defaultProps = defaultProps;
	constructor(props) {
		super(props);
	}

	_onHideMenu = () => {
		this.props.onHideMenu && this.props.onHideMenu();
		this.props.onSelectTool && this.props.onSelectTool(null);
	};

	_renderHeader = () => {
		return (
			<View style={styles.viewHeader}>
				<AppNormalText
					text={'tool'}
					type={'H2'}
					IStyles={styles.textHeader}
				/>
				<AppImages
					ButtonProps={{onPress: this._onHideMenu}}
					ButtonStyles={{
						padding: 25,
					}}
					uri={themes.getImages('cancelModal')}
					ImageStyle={styles.iconHeader}
				/>
			</View>
		);
	};

	_onSelectTool = selectedTool => () => {
		this.props.onSelectTool && this.props.onSelectTool(selectedTool);
	};

	_renderItem = ({item, index}) => {
		if (!item.image) return <View style={styles.line} />;
		let background = themes.getColor('white');
		let color = themes.getColor('blackBold');

		if (index === this.props.selectedTool) {
			background = themes.getColor('backgroundViolet');
			color = themes.getColor('mainColor');
		}
		return (
			<TouchableOpacity
				style={[styles.viewItem, {backgroundColor: background}]}
				onPress={this._onSelectTool(index)}>
				<AppImages
					ButtonProps={{}}
					ButtonStyles={styles.imageItem}
					uri={item.image}
					ImageStyle={[styles.imageItemStyle, {tintColor: color}]}
				/>
				<AppNormalText
					text={item.text}
					type={'BODY1'}
					IStyles={[
						styles.textItemStyle,
						{
							fontWeight: index <= 3 ? '700' : '600',
							color: color,
						},
					]}
					IProps={{
						ellipsizeMode: 'tail',
						numberOfLines: 2,
					}}
				/>
			</TouchableOpacity>
		);
	};

	_keyExtractor = ({item, index}) => `${index}`;

	render() {
		let {selectedTool} = this.props;
		if (this.props.isShowMenu) {
			return (
				<View style={styles.viewAll}>
					<View
						style={styles.freeView}
						onTouchStart={this._onHideMenu}></View>
					{selectedTool === 0 ? <SavingCalculations /> : null}
					{selectedTool === 6 ? <InterestRate /> : null}
					{selectedTool === 7 ? <ListRate /> : null}
					<View style={styles.viewFlatlist}>
						<AppFlatList
							ListHeaderComponent={this._renderHeader()}
							data={this.props.dataTool}
							keyExtractor={this._keyExtractor}
							renderItem={this._renderItem}
						/>
					</View>
				</View>
			);
		}
		return null;
	}
}

const mapsStateToProps = state => ({
	isShowMenu: isShowMenu(state),
	selectedTool: selectedTool(state),
});

const mapsDispatchToProps = dispatch => ({
	onHideMenu: () => dispatch(TOOL_ACTION.onHideMenu()),
	onSelectTool: selectedTool =>
		dispatch(TOOL_ACTION.onSelectTool(selectedTool)),
});

export default connect(mapsStateToProps, mapsDispatchToProps)(Tool);

const styles = StyleSheet.create({
	freeView: {
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	line: {
		height: 10,
		width: '100%',
		backgroundColor: themes.getColor('background'),
	},
	viewFlatlist: {
		height: '100%',
		width: 250,
		backgroundColor: themes.getColor('white'),
		borderLeftWidth: 1,
		borderColor: themes.getColor('grayLight'),
	},
	viewAll: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		justifyContent: 'flex-end',
		flexDirection: 'row',
	},
	textItemStyle: {width: 150, alignContent: 'flex-start'},
	imageItemStyle: {
		borderRadius: 0,
		width: 24,
		height: 24,
	},
	imageItem: {
		paddingHorizontal: 20,
		paddingVertical: 20,
	},
	viewHeader: {
		width: '100%',
		backgroundColor: themes.getColor('mainColor'),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textHeader: {
		color: themes.getColor('white'),
		fontWeight: 'bold',
		marginLeft: 25,
		marginRight: 10,
	},
	iconHeader: {
		borderRadius: 0,
		width: 15,
		height: 15,
		tintColor: themes.getColor('white'),
	},
	viewItem: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
});
