import React from 'react';
import {
	StyleSheet,
	FlatList,
	ListRenderItem,
	ViewStyle,
	View,
	TextInput,
} from 'react-native';
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from 'react-native-popup-menu';
import {AppTextWithoutTranslate} from 'components/text';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import _ from 'lodash';
import I18nTran from 'assets/language';
import AppFlatList from 'components/flatlist/flatlist';
import {removeAccent} from 'utils/util';

const data = [
	{key: 0, text: 'save'},
	{key: 1, text: 'update'},
	{key: 2, text: 'delete'},
	{key: 3, text: 'remove'},
];
const defaultProps = {
	triggerElement: undefined,
	data: data,
	customElementMenu: undefined,
	disable: false,
};
interface PopupData {
	key: string;
	text: string;
	disable?: boolean;
}
interface IProps {
	triggerElement: React.ReactNode | undefined; // button for show
	data: Array<PopupData>;
	customElementMenu?: React.ReactNode | undefined; // element,
	onPress?: (item: PopupData) => void;
	disable?: boolean;
	optionsContainerStyle?: ViewStyle | ViewStyle[];
	flatListStyle?: ViewStyle | ViewStyle[];
	selectedIndex?: number;
	placeholderSearch?: string;
	onPressMenuTrigger?: () => void;
}
interface IStates {
	data: Array<PopupData>;
}

class AppPopupMenuWithCheckSearch extends React.Component<IProps, IStates> {
	static defaultProps = defaultProps;
	state: IStates = {
		data: this.props.data,
	};

	_onPress = item => () => {
		if (this.props.onPress) {
			this.props.onPress(item);
		} else {
			alert('Truyền onPress props di');
		}
	};

	_onChangeText = text => {
		if (text) {
			this.setState({
				data: _.filter(this.props.data, function(e) {
					return (
						removeAccent(e.text)
							.toUpperCase()
							.indexOf(removeAccent(text).toUpperCase()) >= 0
					);
				}),
			});
		} else {
			this.setState({data: this.props.data});
		}
	};

	_renderItem: ListRenderItem<PopupData> = ({item, index}) => {
		let isSelected = index === this.props.selectedIndex;
		return (
			<MenuOption
				disabled={item.disable}
				key={item.key.toString()}
				onSelect={this._onPress(item)}>
				<View
					style={[
						styles.viewItem,
						{
							backgroundColor: isSelected
								? themes.getColor('backgroundBlue')
								: themes.getColor('white'),
						},
					]}>
					<AppImages
						ButtonProps={{disabled: true}}
						ImageStyle={[
							styles.checkmark,
							!isSelected ? {tintColor: 'transparent'} : {},
						]}
						uri={themes.getImages('checkmark')}
					/>
					<AppTextWithoutTranslate
						text={item.text}
						type={'BODY'}
						IStyles={{flex: 1, lineHeight: 25, marginRight: 25}}
					/>
				</View>
			</MenuOption>
		);
	};

	_keyExtractor = (item, index) => `${index}`;

	handleMenuTrigger = () => {
		this.setState({
			data: this.props.data,
		});
		this.props.onPressMenuTrigger && this.props.onPressMenuTrigger();
	};

	_renderMenu() {
		const {
			triggerElement,
			optionsContainerStyle,
			flatListStyle,
		} = this.props;
		let {data} = this.state;
		return (
			<Menu>
				{triggerElement && (
					<MenuTrigger onPress={this.handleMenuTrigger}>
						{triggerElement}
					</MenuTrigger>
				)}
				<MenuOptions
					optionsContainerStyle={[
						styles.optionsContainerDefault,
						optionsContainerStyle instanceof Array
							? [...optionsContainerStyle]
							: {...optionsContainerStyle},
					]}>
					<MenuOption style={{height: 60}}>
						<View
							style={{
								marginHorizontal: 15,
								marginVertical: 5,
								borderRadius: 5,
								borderColor: themes.getColor('grayBold'),
								borderWidth: 0.5,
								flexDirection: 'row',
							}}>
							<TextInput
								onChangeText={this._onChangeText}
								placeholder={I18nTran.t(
									this.props.placeholderSearch,
								)}
								style={{
									flex: 1,
									borderColor: themes.getColor('grayBold'),
									borderRightWidth: 0.5,
								}}
								underlineColorAndroid={'transparent'}
								autoCorrect={false}
							/>
							<AppImages
								ButtonProps={{disabled: true}}
								ImageStyle={{
									width: 50,
									height: 25,
									tintColor: themes.getColor('grayBold'),
								}}
								uri={themes.getImages('search2')}
							/>
						</View>
					</MenuOption>
					<AppFlatList
						style={[
							styles.flatListStyleDefault,
							flatListStyle instanceof Array
								? [...flatListStyle]
								: {...flatListStyle},
						]}
						data={data}
						keyExtractor={this._keyExtractor}
						renderItem={this._renderItem}
					/>
				</MenuOptions>
			</Menu>
		);
	}
	render() {
		return this._renderMenu();
	}
}

const styles = StyleSheet.create({
	flatListStyleDefault: {maxHeight: 440},
	optionsContainerDefault: {
		borderRadius: 5,
		width: 350,
		maxHeight: 500,
	},
	checkmark: {
		height: 17,
		width: 17,
		marginHorizontal: 10,
	},
	viewItem: {flexDirection: 'row', alignItems: 'center'},
});

export default AppPopupMenuWithCheckSearch;
