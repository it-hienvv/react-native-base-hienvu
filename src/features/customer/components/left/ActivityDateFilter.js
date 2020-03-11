import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {AppTextWithoutTranslate} from 'components/text';
import themes from 'assets/themes';
import I18nTran from 'assets/language';
import moment from 'moment';
import {AppImages} from 'components/image';

export default ActivityDateFilter = props => {
	const [showStartDatePicker, setShowStartDatePicker] = useState(false);
	const [showEndDatePicker, setShowEndDatePicker] = useState(false);

	const {onChangeStartDate, onChangeEndDate, startDate, endDate} = props;

	const _handleConfirmStartDatePicker = date => {
		setShowStartDatePicker(false);
		onChangeStartDate && onChangeStartDate(date);
	};

	const _handleCancelStartDatePicker = () => {
		setShowStartDatePicker(false);
	};

	const _handleConfirmEndDatePicker = date => {
		onChangeEndDate && onChangeEndDate(date);
	};

	const _handleCancelEndDatePicker = () => {};

	const _handlePressStartDate = () => {
		console.log('_handlePressStartDate');
		setShowStartDatePicker(true);
	};

	const _handlePressEndDate = () => {
		console.log('_handlePressEndDate');
		setShowEndDatePicker(true);
	};

	return (
		<View style={styles.container}>
			<AppTextWithoutTranslate
				type={'BODY'}
				text={`${I18nTran.t('show_activity')} ${I18nTran.t(
					'from_date',
				)}`}
			/>
			<TouchableOpacity onPress={_handlePressStartDate}>
				<View style={styles.datePickerTrigger}>
					<AppTextWithoutTranslate
						type={'BODY'}
						text={
							startDate
								? moment(startDate.getTime()).format('DD/MM/YY')
								: I18nTran.t('present_money')
						}
						IStyles={{
							color: themes.getColor('mainColor'),
						}}
					/>
					<AppImages
						ButtonProps={{
							disabled: true,
						}}
						ImageStyle={styles.dropdownIcon}
						uri={require('assets/images/icon/drop_down_arrow.png')}
					/>
				</View>
			</TouchableOpacity>
			<AppTextWithoutTranslate
				type={'BODY'}
				text={I18nTran.t('to_date')}
			/>
			<TouchableOpacity onPress={_handlePressEndDate}>
				<View style={styles.datePickerTrigger}>
					<AppTextWithoutTranslate
						type={'BODY'}
						text={
							endDate
								? moment(endDate.getTime()).format('DD/MM/YY')
								: I18nTran.t('all')
						}
						IStyles={{
							color: themes.getColor('mainColor'),
						}}
					/>
					<AppImages
						ButtonProps={{
							disabled: true,
						}}
						ImageStyle={styles.dropdownIcon}
						uri={require('assets/images/icon/drop_down_arrow.png')}
					/>
				</View>
			</TouchableOpacity>
			<DateTimePicker
				isVisible={showStartDatePicker}
				onConfirm={_handleConfirmStartDatePicker}
				onCancel={_handleCancelStartDatePicker}
				mode={'date'}
			/>
			<DateTimePicker
				isVisible={showEndDatePicker}
				onConfirm={_handleConfirmEndDatePicker}
				onCancel={_handleCancelEndDatePicker}
				mode={'date'}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: themes.getColor('white'),
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	datePickerTrigger: {
		paddingHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	dropdownIcon: {
		marginLeft: 5,
		opacity: 0.5,
		width: 12,
		height: 12,
	},
});
