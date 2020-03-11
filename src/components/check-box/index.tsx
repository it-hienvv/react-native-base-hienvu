import React, {useState} from 'react';
import CheckBox from 'react-native-check-box';
import {ViewStyle, View, StyleSheet} from 'react-native';
import themes from 'assets/themes';

export const AppCheckBox = (props: {
	CheckBoxProps?: object;
	CheckBoxStyle?: ViewStyle | ViewStyle[];
	onClickitem: Function;
	isChecked?: boolean;
	isDisabled?: boolean;
	unCheckedImage?: React.ReactNode;
}) => {
	const {
		CheckBoxProps,
		CheckBoxStyle,
		onClickitem,
		isChecked,
		isDisabled,
		unCheckedImage,
	} = props;
	const [checked, setChecked] = useState(isChecked ? isChecked : false);
	const _onClick = () => {
		setChecked(!checked);
		onClickitem && onClickitem();
	};

	return (
		<CheckBox
			unCheckedImage={unCheckedImage ? unCheckedImage : null}
			isChecked={checked}
			onClick={_onClick}
			disabled={isDisabled}
			uncheckedCheckBoxColor={themes.getColor('grayBold')}
			checkedCheckBoxColor={themes.getColor('mainColor')}
			style={CheckBoxStyle}
			{...CheckBoxProps}
		/>
	);
};
