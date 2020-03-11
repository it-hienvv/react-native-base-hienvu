import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {AppImages} from 'components/image';
import {BOTTOM_WIDTH_SIZE} from 'contants/themes/size';
import {LEFT_TAB_KEY} from 'contants/contants';
import themes from 'assets/themes';

const imageWidth = 30;
const borderLeftWidth = 5;
const data = [
	{
		uri: themes.getImages('home'),
		key: LEFT_TAB_KEY.home.key,
		name: LEFT_TAB_KEY.home.name,
	},
	{
		uri: themes.getImages('saleKit'),
		key: LEFT_TAB_KEY.saleKit.key,
		name: LEFT_TAB_KEY.saleKit.name,
	},
	{
		uri: themes.getImages('saleKit'),
		key: LEFT_TAB_KEY.saleKit.key,
		name: LEFT_TAB_KEY.saleKit.name,
	},
	{
		uri: themes.getImages('shop'),
		key: LEFT_TAB_KEY.opportunity.key,
		name: LEFT_TAB_KEY.opportunity.name,
	},
	{
		uri: themes.getImages('contact'),
		key: LEFT_TAB_KEY.currentCustomer.key,
		name: LEFT_TAB_KEY.currentCustomer.name,
	},
	{
		uri: themes.getImages('kpi'),
		key: LEFT_TAB_KEY.kpi.key,
		name: LEFT_TAB_KEY.kpi.name,
	},
	{
		uri: themes.getImages('warning'),
		key: LEFT_TAB_KEY.warningCustomer.key,
		name: LEFT_TAB_KEY.warningCustomer.name,
	},
];
class LeftAppTab extends React.PureComponent {
	state = {
		focusIndex: this.props.leftTabAppItem.key,
		data: data,
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.leftTabAppItem.key !== prevState.focusIndex) {
			return {
				focusIndex: nextProps.leftTabAppItem.key,
			};
		}
		return null;
	}

	_onPress = item => () => {
		if (item.key === this.state.focusIndex) {
			return;
		} else {
			this.setState({focusIndex: item.key});
			this.props.onTabPress(item);
		}
	};

	render() {
		const {data} = this.state;
		return (
			<View style={styles.container}>
				{data.map(item => (
					<TouchableOpacity
						onPress={this._onPress(item)}
						style={[
							styles.button,
							this.state.focusIndex === item.key &&
								styles.subButton,
						]}
						key={item.key.toString()}>
						<AppImages
							ButtonProps={{disabled: true}}
							ImageStyle={[
								styles.image,
								this.state.focusIndex === item.key && {
									tintColor: themes.getColor('mainColor'),
								},
							]}
							uri={item.uri}
						/>
					</TouchableOpacity>
				))}
			</View>
		);
	}
}

export default LeftAppTab;
const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#F4F6FA',
		paddingTop: 34,
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
