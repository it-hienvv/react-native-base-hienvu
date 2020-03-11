import React from 'react';
import {View, Animated, Text} from 'react-native';
import AppPopupMenuWithCheck from 'components/popup-menu-with-check';
import styles from './styles/index.css';
import {AppTextWithoutTranslate} from 'components/text';
import {AppImages} from 'components/image';
import {PADDING_COMMON} from 'contants/themes/size';
import _ from 'lodash';
import themes from 'assets/themes';
import AppPopupMenuWithCheckSearch from 'components/popup-menu-with-check-search';
import AppPopupMenuMultiLevel from 'components/popup-menu-multi-level';

class CompPopupAnim extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPickerShow: false,
		};
		this._animatedIsFocused = !props.value
			? new Animated.Value(0)
			: new Animated.Value(1);
	}

	componentDidUpdate() {
		const {selectedIndex, value} = this.props;
		Animated.timing(this._animatedIsFocused, {
			toValue: selectedIndex !== '' || !!value ? 1 : 0,
			duration: 200,
		}).start();
	}

	_renderMenuOption = () => {
		const {
			title,
			selectedIndex,
			listOption,
			value,
			imageName = 'dropDown',
			styleTriggerElement,
			disabled,
			hasError,
		} = this.props;
		const labelWrapperStyle = {
			position: 'absolute',
			paddingHorizontal: 5,
			paddingVertical: 16,
			marginLeft: 12,
			backgroundColor:
				selectedIndex !== '' || value
					? themes.getColor('white')
					: themes.getColor('transparent'),
			borderRadius: 10,
			left: 0,
			top: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [0, -20],
			}),
		};

		const labelStyle = {
			color: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [
					themes.getColor('grayBold'),
					themes.getColor('blackBold'),
				],
			}),
			fontSize: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [16, 14],
			}),
		};

		let filteredItem = _.filter(listOption, ['key', selectedIndex]);
		let titleMenu = (filteredItem.length && filteredItem[0].text) || '';

		return (
			<View
				style={[
					styles.container,
					styleTriggerElement,
					{
						borderColor:
							selectedIndex !== ''
								? themes.getColor('blueBold1')
								: hasError
								? themes.getColor('red')
								: themes.getColor('grayNormal'),
					},
				]}>
				<AppTextWithoutTranslate
					type={'BODY'}
					IProps={{numberOfLines: 1}}
					IStyles={{
						flex: 1,
						alignSelf: 'center',
						zIndex: 100,
						paddingHorizontal: PADDING_COMMON,
						color: disabled ? themes.getColor('grayBold') : null,
					}}
					text={value || titleMenu}
				/>
				<Animated.View style={labelWrapperStyle}>
					<Animated.Text style={labelStyle}>{title}</Animated.Text>
				</Animated.View>
				<AppImages
					ButtonProps={{disabled: true}}
					ButtonStyles={{
						paddingVertical: 18,
						marginRight: PADDING_COMMON,
					}}
					uri={themes.getImages(imageName)}
					ImageStyle={{
						borderRadius: 0,
						tintColor: themes.getColor('grayBold'),
					}}
				/>
			</View>
		);
	};

	render() {
		const {
			listOption = [],
			styleProps,
			onPress,
			selectedIndex,
			popupMenuStyle,
			hasSearch,
			onPressMenuTrigger,
			hasLevel,
			level,
			onBackdropPress,
			disabled,
		} = this.props;

		return (
			<View style={[styleProps, {marginRight: PADDING_COMMON}]}>
				{!hasSearch ? (
					<AppPopupMenuWithCheck
						triggerElement={this._renderMenuOption()}
						data={listOption}
						optionsContainerStyle={[popupMenuStyle]}
						onPress={onPress}
						disable={disabled}
						selectedIndex={selectedIndex}
					/>
				) : !hasLevel ? (
					<AppPopupMenuWithCheckSearch
						triggerElement={this._renderMenuOption()}
						onPressMenuTrigger={onPressMenuTrigger}
						data={listOption}
						optionsContainerStyle={[
							{
								width: 400,
								maxHeight: 500,
							},
							popupMenuStyle,
						]}
						flatListStyle={{maxHeight: 440}}
						onPress={onPress}
						selectedIndex={selectedIndex}
						placeholderSearch={'search'}
					/>
				) : (
					<AppPopupMenuMultiLevel
						triggerElement={this._renderMenuOption()}
						onPressMenuTrigger={onPressMenuTrigger}
						data={listOption}
						level={level}
						onBackdropPress={onBackdropPress}
						optionsContainerStyle={{
							width: 400,
							maxHeight: 500,
						}}
						flatListStyle={{maxHeight: 200}}
						onPress={onPress}
						selectedIndex={selectedIndex}
						placeholderSearch={'search'}
					/>
				)}
			</View>
		);
	}
}

export default CompPopupAnim;
