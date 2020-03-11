import React, {Fragment} from 'react';
import {View, Animated, Text, TouchableOpacity} from 'react-native';
import styles from './styles/index.css';
import {AppTextWithoutTranslate} from 'components/text';
import {AppImages} from 'components/image';
import DateTimePicker from 'react-native-modal-datetime-picker';
import I18nTran from 'assets/language';
import {PADDING_COMMON} from 'contants/themes/size';
import {formatDate, formatTime} from 'utils/date-times';
import themes from 'assets/themes';

class DatePickerAnimation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFocused: false,
			isDatePickerShow: false,
		};
		this._animatedIsFocused = !props.value
			? new Animated.Value(0)
			: new Animated.Value(1);
	}

	componentDidUpdate() {
		const {datePicked} = this.props;
		Animated.timing(this._animatedIsFocused, {
			toValue: datePicked !== '' ? 1 : 0,
			duration: 200,
		}).start();
	}

	_renderDatePicker = () => {
		const {mode = 'date', date = null, maxDate} = this.props;
		return (
			<DateTimePicker
				isVisible={this.state.isDatePickerShow}
				onConfirm={this._handleDatePicked}
				onCancel={this._hideDatePicker}
				// minimumDate={minDate}
				maximumDate={maxDate}
				mode={mode}
				{...(date && {date})}
			/>
		);
	};

	_showDatePicker = () => {
		this.setState({
			isDatePickerShow: true,
		});
	};

	_hideDatePicker = () => {
		this.setState({
			isDatePickerShow: false,
		});
	};

	_handleDatePicked = date => {
		const {handleDatePicked} = this.props;
		this._hideDatePicker();
		handleDatePicked(date);
	};

	render() {
		const {datePicked} = this.props;
		const {
			label,
			styleProps,
			textTitle,
			disabled,
			calendarIcon = 'calendar',
			mode = 'date',
			...otherProps
		} = this.props;
		const labelWrapperStyle = {
			position: 'absolute',
			paddingHorizontal: 5,
			paddingVertical: 14,
			marginLeft: 12,
			backgroundColor: themes.getColor('white'),
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

		return (
			<View style={[styleProps]}>
				<TouchableOpacity
					onPress={this._showDatePicker}
					disabled={disabled && disabled}>
					<View
						style={[
							styles.container,
							{
								borderColor: !!datePicked
									? themes.getColor('blueBold1')
									: themes.getColor('grayNormal'),
								justifyContent: 'flex-end',
							},
						]}>
						{!!datePicked && (
							<AppTextWithoutTranslate
								type={'BODY'}
								IStyles={{
									alignSelf: 'center',
									zIndex: 100,
									marginLeft: PADDING_COMMON,
									position: 'absolute',
									left: 0,
								}}
								text={
									mode == 'datetime'
										? formatTime(datePicked)
										: formatDate(datePicked)
								}
							/>
						)}
						<Animated.View style={labelWrapperStyle}>
							<Animated.Text style={labelStyle}>
								{textTitle}
							</Animated.Text>
						</Animated.View>
						<AppImages
							ButtonProps={{disabled: true}}
							ButtonStyles={{
								paddingVertical: 18,
								marginRight: PADDING_COMMON,
							}}
							uri={themes.getImages(calendarIcon)}
							ImageStyle={{borderRadius: 0}}
						/>
					</View>
					{this._renderDatePicker()}
				</TouchableOpacity>
			</View>
		);
	}
}

export default DatePickerAnimation;
