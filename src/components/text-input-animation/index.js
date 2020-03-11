import React, {Fragment} from 'react';
import {View, TextInput, Animated, Text} from 'react-native';
import styles from './styles/index.css';
import colors from 'assets/colors';
import {AppNormalText} from 'components/text';
import I18nTran from 'assets/language';
import themes from 'assets/themes';

class TextInputAnimation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFocused: false,
		};
		this._animatedIsFocused = !props.value
			? new Animated.Value(0)
			: new Animated.Value(1);
	}

	componentDidUpdate() {
		const {value} = this.props;
		const {isFocused} = this.state;
		Animated.timing(this._animatedIsFocused, {
			toValue: isFocused || value !== '' ? 1 : 0,
			duration: 200,
		}).start();
	}

	handleFocus = () => {
		const {onFocus} = this.props;
		this.setState({isFocused: true});
		onFocus && onFocus();
	};

	handleBlur = () => {
		const {onBlur} = this.props;
		this.setState({isFocused: false});
		onBlur && onBlur();
	};

	render() {
		const {isFocused} = this.state;
		const {
			label,
			styleProps,
			hasError,
			textError,
			labelStyleProps,
			textInputProps,
			...otherProps
		} = this.props;
		const labelWrapperStyle = {
			position: 'absolute',
			paddingHorizontal: 5,
			paddingVertical: 14,
			marginLeft: 12,
			backgroundColor:
				isFocused || otherProps.value !== ''
					? themes.getColor('white')
					: themes.getColor('transparent'),
			borderRadius: 10,
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
					hasError
						? themes.getColor('red')
						: themes.getColor('blackBold'),
				],
			}),
			fontSize: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [16, 14],
			}),
		};

		return (
			<View style={[styleProps]}>
				<View
					style={[
						styles.container,
						{
							borderColor: hasError
								? themes.getColor('red')
								: otherProps.value !== ''
									? themes.getColor('blueBold1')
									: themes.getColor('grayNormal'),
						},
					]}>
					<Animated.View style={labelWrapperStyle}>
						<Animated.Text style={[labelStyle, labelStyleProps]}>
							{label}
						</Animated.Text>
					</Animated.View>
					<TextInput
						onChangeText={this.onChangeText}
						{...otherProps}
						style={[styles.textInput, textInputProps]}
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
					/>
				</View>
				{hasError && !!textError && (
					<AppNormalText
						text={textError}
						IStyles={[styles.textError]}
					/>
				)}
			</View>
		);
	}
}

export default TextInputAnimation;
