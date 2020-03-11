import React from 'react';
import {StyleSheet, TextInput, ViewStyle, TextInputProps} from 'react-native';
import I18nTran from 'assets/language';
import {textTypeStyle} from 'components/text';
import themes from 'assets/themes';

type IProps = {
	TextInputStyles?: ViewStyle | ViewStyle[];
	placeholder?: string;
	TextInputProps?: TextInputProps;
	type?: textTypeStyle;
	text?: string;
};

type IStates = {};
export default class AppTextInput extends React.PureComponent<IProps, IStates> {
	state = {
		value: this.props.text ? this.props.text : '',
	};
	_onChangeText = value => {
		this.setState({value});
	};
	_clear = () => {
		this.setState({value: ''});
	};
	render() {
		const {
			TextInputStyles,
			TextInputProps,
			placeholder = I18nTran.t('typing-something'),
			type = 'BODY1',
		} = this.props;
		const {value} = this.state;
		return (
			<TextInput
				onChangeText={this._onChangeText}
				value={value}
				placeholder={placeholder}
				underlineColorAndroid={'transparent'}
				autoCorrect={false}
				style={[
					styles.textInput,
					{...themes.getFonts(type)},
					TextInputStyles instanceof Array
						? [...TextInputStyles]
						: {...TextInputStyles},
				]}
				{...TextInputProps}
			/>
		);
	}
}

const styles = StyleSheet.create({
	textInput: {
		padding: 0,
		paddingLeft: 10,
		height: 30,
		width: 100,
	},
});
