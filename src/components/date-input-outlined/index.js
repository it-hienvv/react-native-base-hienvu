import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {formatTime} from 'utils/date-times';
import {AppButton} from 'components/button';
import {AppTextWithoutTranslate} from 'components/text';
import themes from 'assets/themes';
import {AppImages} from 'components/image';
import {WIDTH_SCREEN} from 'utils/util';
import {PADDING_COMMON} from 'contants/themes/size';

export default DateInputOutlined = props => {
	const [showDatePicker, setShowDatePicker] = useState(false);
	const {onChange, label = I18nTran.t('date_time'), value} = props;

	const _showDateTimePicker = () => {
		setShowDatePicker(true);
	};

	const _handleConfirmDatePicker = date => {
		setShowDatePicker(false);
		onChange && onChange(date);
	};

	const _handleCancelDatePicker = () => {
		setShowDatePicker(false);
	};

	return (
		<View
			style={[
				styles.rowFilterHideShow,
				{
					width: 250,
					marginTop: PADDING_COMMON,
				},
			]}
			onTouchStart={_showDateTimePicker}>
			<View style={styles.label}>
				<AppTextWithoutTranslate type={'BODY1'} text={label} />
			</View>
			<AppButton
				ButtonProps={{
					onPress: _showDateTimePicker,
				}}
				ButtonStyle={{
					borderWidth: 0,
				}}
				text={' '}>
				<AppTextWithoutTranslate
					type={'BODY'}
					text={value ? formatTime(value) : ''}
					IStyles={{
						flex: 1,
						textAlign: 'left',
					}}
				/>
				<AppImages
					ButtonProps={{
						disabled: true,
					}}
					ButtonStyles={{
						marginLeft: PADDING_COMMON,
					}}
					uri={themes.getImages('calendar2')}
					ImageStyle={{
						borderRadius: 0,
					}}
				/>
			</AppButton>
			<DateTimePicker
				isVisible={showDatePicker}
				onConfirm={_handleConfirmDatePicker}
				onCancel={_handleCancelDatePicker}
				mode={'datetime'}
				minimumDate={new Date()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		position: 'absolute',
		top: -10,
		left: 12,
		backgroundColor: themes.getColor('white'),
		zIndex: 1,
		paddingRight: 30,
		paddingLeft: 5,
	},
	rowFilterHideShow: {
		borderColor: themes.getColor('grayNormal'),
		borderWidth: 1,
		height: 50,
		width: WIDTH_SCREEN / 2 - 50,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
		marginTop: PADDING_COMMON,
		marginLeft: 30,
	},
	row: {
		flexDirection: 'row',
		alignContent: 'center',
	},
});
