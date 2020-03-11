import React from 'react';
import {StyleSheet, View, TextInput, Image} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {AppTextWithoutTranslate} from 'components/text';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {
	TABLE,
	BUSINESS_FIELD,
	TYPE_FIELD_KEY,
	STATUS_ACTIVE,
	getListYearRelationship,
	LIST_POSITION_KEY,
	LIST_POSITION,
} from '../../contants';
import AppPopupMenu from 'components/popup-menu';
import {getRangeYears} from 'utils/date-times';
import I18nTran from 'assets/language';

class Input extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	_onChangeText = value => {
		const {propsKey} = this.props;
		if (this.props.other) {
			const item = {
				...this.props.item,
				[propsKey]: {key: '', text: value, other: true},
			};
			this.props.onChangeValueData && this.props.onChangeValueData(item);
		} else {
			const item = {
				...this.props.item,
				[propsKey]: {key: '', text: value},
			};
			this.props.onChangeValueData && this.props.onChangeValueData(item);
		}
	};

	render() {
		const {propsKey} = this.props;
		const value = this.props.item[propsKey].text;
		return (
			<TextInput
				placeholder={I18nTran.t(`input.${propsKey}`)}
				onChangeText={this._onChangeText}
				value={value}
				style={[
					styles.input,
					!value && {color: themes.getColor('grayBold')},
				]}
			/>
		);
	}
}

class Year extends React.PureComponent {
	constructor(props) {
		super(props);
		const list = getRangeYears().reverse();
		this.state = {
			list,
		};
	}

	onPressFrom = item => {
		const {propsKey} = this.props;
		this.props.onChangeValueData &&
			this.props.onChangeValueData({
				...this.props.item,
				[propsKey]: {to: this.props.item[propsKey].to, from: item.text},
			});
	};

	onPressTo = item => {
		const {propsKey} = this.props;
		this.props.onChangeValueData &&
			this.props.onChangeValueData({
				...this.props.item,
				[propsKey]: {
					from: this.props.item[propsKey].from,
					to: item.text,
				},
			});
	};

	_renderLeftItem() {
		const {propsKey} = this.props;
		const from = this.props.item[propsKey].from;
		return (
			<View
				style={{
					marginHorizontal: PADDING_COMMON / 2,
					borderRadius: 5,
					borderColor: themes.getColor('grayLight'),
					borderWidth: 1,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					height: 40,
					paddingHorizontal: 2,
					minWidth: '45%',
					// flex: 1
				}}>
				<AppTextWithoutTranslate
					IStyles={!from && {color: themes.getColor('grayBold')}}
					text={from || I18nTran.t(`${propsKey}-from`)}
					type={'H2'}
				/>
				<Image
					source={themes.getImages('dropDown')}
					style={{
						width: 16,
						height: 16,
						resizeMode: 'contain',
					}}
				/>
			</View>
		);
	}

	_renderRightItem() {
		const {propsKey} = this.props;
		const to = this.props.item[propsKey].to;
		return (
			<View
				style={{
					marginHorizontal: PADDING_COMMON / 2,
					borderRadius: 5,
					borderColor: themes.getColor('grayLight'),
					borderWidth: 1,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					height: 40,
					paddingHorizontal: 2,
					minWidth: '45%',
				}}>
				<AppTextWithoutTranslate
					IStyles={!to && {color: themes.getColor('grayBold')}}
					text={to || I18nTran.t(`${propsKey}-to`)}
					type={'H2'}
				/>
				<Image
					source={themes.getImages('dropDown')}
					style={{
						width: 16,
						height: 16,
						resizeMode: 'contain',
					}}
				/>
			</View>
		);
	}
	render() {
		return (
			<View
				style={{
					flexDirection: 'row',
					height: 40,
				}}>
				<AppPopupMenu
					optionsContainerStyle={{maxHeight: 300}}
					onPress={this.onPressFrom}
					data={this.state.list}
					triggerElement={this._renderLeftItem()}
				/>

				<AppPopupMenu
					optionsContainerStyle={{maxHeight: 300}}
					onPress={this.onPressTo}
					data={this.state.list}
					triggerElement={this._renderRightItem()}
				/>
			</View>
		);
	}
}

class DropDown extends React.PureComponent {
	constructor(props) {
		super(props);
		const {propsKey} = this.props;
		const item = this.props.list.find(
			ii =>
				this.props.item[propsKey] &&
				ii.key === this.props.item[propsKey].key,
		);
		if (!item) {
			this.props.onChangeValueData &&
				this.props.onChangeValueData({
					...this.props.item,
					[propsKey]: {key: '', text: ''},
				});
		}
		this.state = {
			list: this.props.list || [],
			value: item ? item : {key: '', text: ''},
		};
	}

	_onPress = item => {
		const {propsKey} = this.props;
		if (this.props.other) {
			if (item.key === LIST_POSITION_KEY.other) {
				this.props.onChangeValueData &&
					this.props.onChangeValueData({
						...this.props.item,
						[propsKey]: {...item, other: true, text: ''},
					});
			} else {
				this.props.onChangeValueData &&
					this.props.onChangeValueData({
						...this.props.item,
						[propsKey]: item,
					});
			}
		} else {
			this.props.onChangeValueData &&
				this.props.onChangeValueData({
					...this.props.item,
					[propsKey]: item,
				});
		}
		this.setState({value: item});
	};
	_render() {
		return (
			<View
				style={{
					borderRadius: 5,
					borderColor: themes.getColor('grayLight'),
					borderWidth: 1,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingHorizontal: 10,
					width: '100%',
					height: '100%',
				}}>
				<AppTextWithoutTranslate
					IProps={{numberOfLines: 1}}
					IStyles={[
						{maxWidth: '90%'},
						this.state.value.warning && {
							color: themes.getColor('orange'),
						},
						!this.state.value.text && {
							color: themes.getColor('grayBold'),
						},
					]}
					text={
						this.state.value.text || I18nTran.t(this.props.propsKey)
					}
					type={'H2'}
				/>
				<Image
					source={themes.getImages('dropDown')}
					style={{
						width: 16,
						height: 16,
						resizeMode: 'contain',
					}}
				/>
			</View>
		);
	}
	render() {
		const {stylesProps} = this.props;
		return (
			<AppPopupMenu
				optionsContainerStyle={stylesProps}
				onPress={this._onPress}
				data={this.state.list}
				triggerElement={this._render()}
			/>
		);
	}
}

class Position extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		const {propsKey} = this.props;
		const {other} = this.props.item[propsKey];
		return other ? (
			<Input other={true} {...this.props} />
		) : (
			<DropDown other={true} {...this.props} />
		);
	}
}

export default class Row extends React.PureComponent {
	onMinus = () => {
		const {item} = this.props;
		this.props.onMinus && this.props.onMinus(item);
	};

	_selectItem = ({index, ii}) => {
		const {listTypes} = this.props;
		const {item, listRows} = this.props;
		switch (listTypes[index]) {
			case TABLE.type.index:
				return (
					<AppTextWithoutTranslate
						type={'CAPTION'}
						text={`${ii + 1}`}
					/>
				);
			case TABLE.type.icon:
				return (
					<AppImages
						ButtonProps={{onPress: this.onMinus}}
						ImageStyle={{tintColor: themes.getColor('red')}}
						uri={themes.getImages('minus')}
					/>
				);
			case TABLE.type.textInput:
				return (
					<Input
						propsKey={listRows[index]}
						{...this.props}
						value={item[listRows[index]]}
					/>
				);
			case TABLE.type.year: {
				return <Year propsKey={listRows[index]} {...this.props} />;
			}
			case TABLE.type.dropDown: {
				const list = BUSINESS_FIELD;
				return (
					<DropDown
						propsKey={listRows[index]}
						{...this.props}
						stylesProps={{width: 500, height: 500}}
						list={list}
					/>
				);
			}

			case TABLE.type.smallDropDown: {
				const list = TYPE_FIELD_KEY;
				return (
					<DropDown
						propsKey={listRows[index]}
						{...this.props}
						list={list}
					/>
				);
			}

			case TABLE.type.status: {
				const list = STATUS_ACTIVE;
				return (
					<DropDown
						propsKey={listRows[index]}
						{...this.props}
						list={list}
					/>
				);
			}

			case TABLE.type.relationship: {
				const list = getListYearRelationship();
				return (
					<DropDown
						propsKey={listRows[index]}
						{...this.props}
						stylesProps={{height: 500}}
						list={list}
					/>
				);
			}

			case TABLE.type.position: {
				const list = LIST_POSITION;
				return (
					<Position
						propsKey={listRows[index]}
						{...this.props}
						stylesProps={{width: 400}}
						list={list}
					/>
				);
			}

			default:
				return (
					<Input
						propsKey={listRows[index]}
						{...this.props}
						value={item[listRows[index]]}
					/>
				);
		}
	};

	_renderItem = ({flex, index, ii}) => {
		return (
			<View
				key={`${index}`}
				style={{
					flex,
					height: 60,
					paddingLeft: 15,
					paddingVertical: 10,
					borderColor: themes.getColor('grayLight'),
					borderLeftWidth: index === 0 ? 1 : 0,
					borderRightWidth: index === 0 || index === 1 ? 1 : 0,
					paddingRight: 10,
					justifyContent: 'center',
				}}>
				{this._selectItem({index, ii})}
			</View>
		);
	};
	render() {
		const {listFlex, ii} = this.props;
		return (
			<View
				style={{
					flexDirection: 'row',
					borderBottomColor: themes.getColor('grayLight'),
					borderBottomWidth: 1,
				}}>
				{listFlex.map((flex, index) =>
					this._renderItem({flex, index, ii}),
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		width: '100%',
		height: '100%',
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 3,
		borderWidth: 1,
		borderColor: themes.getColor('grayLight'),
	},
});
