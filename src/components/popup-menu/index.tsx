import React from 'react';
import {StyleSheet, FlatList, ListRenderItem, ViewStyle} from 'react-native';
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from 'react-native-popup-menu';
import AppFlatList from 'components/flatlist/flatlist';

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
	customElementMenu?: React.ReactNode | undefined | any; // element,
	onPress?: (item: PopupData) => void;
	disable?: boolean;
	optionsContainerStyle?: ViewStyle | ViewStyle[];
	flatListStyle?: ViewStyle | ViewStyle[];
}
interface IStates {}

class AppPopupMenu extends React.PureComponent<IProps, IStates> {
	static defaultProps = defaultProps;
	state: IStates = {};

	_onPress = item => () => {
		if (this.props.onPress) {
			this.props.onPress(item);
		} else {
			alert('Truyền onPress props di');
		}
	};

	_renderItem: ListRenderItem<PopupData> = ({item, index}) => {
		const {customElementMenu} = this.props;
		if (customElementMenu) {
			return (
				<MenuOption
					disabled={item.disable}
					key={item.key.toString()}
					onSelect={this._onPress(item)}>
					{customElementMenu(item)}
				</MenuOption>
			);
		}

		return (
			<MenuOption
				disabled={item.disable}
				key={item.key.toString()}
				onSelect={this._onPress(item)}
				text={item.text}
			/>
		);
	};

	_keyExtractor = (item, index) => `${index}`;
	_renderMenu() {
		const {
			triggerElement,
			data,
			disable,
			optionsContainerStyle,
			flatListStyle,
		} = this.props;
		return (
			<Menu>
				{triggerElement && (
					<MenuTrigger disabled={disable}>
						{triggerElement}
					</MenuTrigger>
				)}
				<MenuOptions
					optionsContainerStyle={[
						optionsContainerStyle instanceof Array
							? [...optionsContainerStyle]
							: {...optionsContainerStyle},
					]}>
					<AppFlatList
						style={[
							styles.flatListStyles,
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
	flatListStyles: {
		// height: 300,
	},
});

export default AppPopupMenu;
