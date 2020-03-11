import React from 'react';
import {
	StyleSheet,
	FlatList,
	ListRenderItem,
	ViewStyle,
	View,
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
import AppFlatList from 'components/flatlist/flatlist';
import I18nTran from 'assets/language';
import {AppCheckBox} from 'components/check-box';
import {
	ID_NOT_RESEARCH_YET,
	ID_RESEARCHING,
	ID_PAUSE,
	ID_REJECT,
} from 'features/customer/clue-customer/clue/contants';

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
	isDisableAllItem: false,
	isMultiChoose: false,
	isShowCount: false,
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
	isDisableAllItem?: boolean;
	isMultiChoose?: boolean;
	isShowCount?: boolean;
	listLength?: any;
	onClickCheckBox?: Function;
	isOnReach?: boolean;
	isOnReaching?: boolean;
	isOnPause?: boolean;
	isOnDeny?: boolean;
}
interface IStates {}

class AppPopupMenuWithCheck extends React.PureComponent<IProps, IStates> {
	static defaultProps = defaultProps;
	state: IStates = {};

	_onPress = item => () => {
		if (this.props.onPress) {
			this.props.onPress(item);
		} else {
			alert('Truyền onPress props di');
		}
	};

	_onClickCheckBox = item => () => {
		if (this.props.onClickCheckBox) {
			this.props.onClickCheckBox(item);
		}
	};

	_renderItem: ListRenderItem<PopupData> = ({item, index}) => {
		let isSelected =
			item.key.toString() === this.props.selectedIndex?.toString();
		let textColor = null;
		switch (item.text) {
			case I18nTran.t('reject'):
				textColor = themes.getColor('red');
				break;
			case I18nTran.t('pause'):
				textColor = themes.getColor('orange');
				break;
			default:
				break;
		}

		let isChecked = true;
		switch (parseInt(item.key)) {
			case ID_NOT_RESEARCH_YET:
				isChecked = this.props.isOnReach;
				break;
			case ID_RESEARCHING:
				isChecked = this.props.isOnReaching;
				break;
			case ID_PAUSE:
				isChecked = this.props.isOnPause;
				break;
			case ID_REJECT:
				isChecked = this.props.isOnDeny;
				break;
			default:
				break;
		}
		// console.log('_renderItem', item);
		return (
			<MenuOption
				disabled={this.props.isDisableAllItem ? true : item.disable}
				key={item.key.toString()}
				onSelect={this._onPress(item)}
				style={{padding: 0}}>
				<View style={styles.wrapAll}>
					<View
						style={[
							styles.viewItem,
							{
								backgroundColor: isSelected
									? themes.getColor('backgroundBlue')
									: themes.getColor('white'),
							},
						]}>
						{this.props.isMultiChoose ? (
							<AppCheckBox
								onClickitem={this._onClickCheckBox(item)}
								CheckBoxStyle={styles.checkBox}
								isChecked={isChecked}
							/>
						) : (
							<AppImages
								ButtonProps={{disabled: true}}
								ImageStyle={[
									styles.checkmark,
									!isSelected
										? {tintColor: 'transparent'}
										: {},
								]}
								uri={themes.getImages('checkmark')}
							/>
						)}
						<AppTextWithoutTranslate
							text={item.text}
							type={'BODY'}
							IStyles={[
								item.disable && {
									color: themes.getColor('grayBold'),
								},
								textColor && {color: textColor},
							]}
						/>
					</View>
					{this.props.isShowCount ? (
						<View style={styles.count}>
							<AppTextWithoutTranslate
								text={this.props.listLength[index] || 0}
								type={'BODY2'}
							/>
						</View>
					) : null}
				</View>
			</MenuOption>
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
						styles.optionsContainerDefault,
						optionsContainerStyle instanceof Array
							? [...optionsContainerStyle]
							: {...optionsContainerStyle},
					]}>
					<AppFlatList
						style={[
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
	wrapAll: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	count: {
		height: 22,
		width: 35,
		borderRadius: 5,
		borderColor: themes.getColor('grayBold'),
		borderWidth: 1,
		marginRight: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	optionsContainerDefault: {
		borderRadius: 5,
		width: 220,
		paddingVertical: 10,
	},
	checkmark: {
		height: 17,
		width: 17,
		marginHorizontal: 10,
	},
	checkBox: {
		marginHorizontal: 10,
	},
	viewItem: {height: 40, flexDirection: 'row', alignItems: 'center', flex: 1},
});

export default AppPopupMenuWithCheck;
