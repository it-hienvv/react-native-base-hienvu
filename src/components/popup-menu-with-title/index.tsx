import React from 'react';
import {StyleSheet, ListRenderItem, ViewStyle} from 'react-native';
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from 'react-native-popup-menu';
import AppFlatList from 'components/flatlist/flatlist';
import themes from 'assets/themes';

const data = [
	{key: 0, text: 'save', type: 'title'},
	{key: 1, text: 'update'},
	{key: 2, text: 'delete'},
	{key: 3, text: 'remove'},
];
const defaultProps = {
	triggerElement: undefined,
	data: data,
	disable: false,
};
interface PopupData {
	key: string;
	text: string;
	disable?: boolean;
	type?: string;
}
interface IProps {
	triggerElement: React.ReactNode | undefined; // button for show
	data: Array<PopupData>;
	onPress?: (item: PopupData) => void;
	disable?: boolean;
	optionsContainerStyle?: ViewStyle | ViewStyle[];
	flatListStyle?: ViewStyle | ViewStyle[];
	open?: boolean;
	callBackClose?: () => void;
}
interface IStates {}

// optionsContainerStyle={[
// 	{
// 		width: 370,
// 		marginLeft: -18,
// 		marginTop: 35,
// 	},
// ]}
class AppPopupMenuWithTitle extends React.PureComponent<IProps, IStates> {
	static defaultProps = defaultProps;

	_onPress = item => () => {
		if (item.type === 'title') {
			return;
		} else {
			this._onBackdropPress();
			if (this.props.onPress) {
				this.props.onPress(item);
			}
		}
	};
	_onBackdropPress = () => {
		if (this.props.callBackClose) {
			this.props.callBackClose();
		}
	};
	_renderItem: ListRenderItem<PopupData> = ({item, index}) => {
		if (item.type === 'title') {
			return (
				<MenuOption
					key={item.key.toString()}
					onSelect={this._onPress(item)}
					text={item.text}
					style={{
						borderBottomWidth: 1,
						borderBottomColor: themes.getColor('grayLight'),
					}}
				/>
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
			open,
		} = this.props;
		return (
			<Menu onBackdropPress={this._onBackdropPress} opened={open}>
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

export default AppPopupMenuWithTitle;
