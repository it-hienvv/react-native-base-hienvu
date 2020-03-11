import React from 'react';
import {
	TextStyle,
	TextProps,
	StyleSheet,
	TouchableOpacity,
	ViewStyle,
	TouchableOpacityProps,
} from 'react-native';
import {
	textTypeStyle,
	AppNormalText,
	AppTextWithoutTranslate,
} from 'components/text';
import themes from 'assets/themes';

export const AppButton = (props: {
	text: string;
	TextStyle?: TextStyle | TextStyle[];
	TextProps?: TextProps;
	option?: object;
	ButtonStyle?: ViewStyle | ViewStyle[];
	ButtonProps?: TouchableOpacityProps;
	textType?: textTypeStyle;
	withoutTranslate?: boolean;
}) => {
	const {
		text,
		TextStyle,
		TextProps,
		option,
		ButtonStyle,
		ButtonProps,
		textType = 'BUTTON1',
		withoutTranslate,
	} = props;
	return (
		<TouchableOpacity
			style={[
				styles.button,
				ButtonStyle instanceof Array
					? [...ButtonStyle]
					: {...ButtonStyle},
				props.children && {
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				},
			]}
			{...ButtonProps}>
			{withoutTranslate ? (
				<AppTextWithoutTranslate
					text={text}
					IProps={TextProps}
					IStyles={[
						TextStyle instanceof Array
							? [...TextStyle]
							: {...TextStyle},
					]}
					type={textType}
				/>
			) : (
				<AppNormalText
					text={text}
					option={option}
					IProps={TextProps}
					IStyles={TextStyle}
					type={textType}
				/>
			)}
			{props.children}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: themes.getColor('white'),
		borderWidth: 0.5,
		borderColor: themes.getColor('grayLight'),
	},
});
