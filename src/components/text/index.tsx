import React from 'react';
import {Text, TextStyle, TextProps, StyleSheet} from 'react-native';
import I18nTran from 'assets/language';
import fonts from 'assets/fonts';
import themes from 'assets/themes';

export type textTypeStyle =
	| 'H1'
	| 'H2'
	| 'BODY'
	| 'BODY1'
	| 'BODY2'
	| 'CAPTION'
	| 'BUTTON1'
	| 'BUTTON2'
	| 'BOLD'
	| 'TITLE-BAR'
	| 'BLOCK-HEADER'
	| 'BLOCK-HEADER2'
	| 'TITLE-DETAIL';
export const AppNormalText = (props: {
	text: string;
	IStyles?: TextStyle | TextStyle[];
	IProps?: TextProps;
	option?: object;
	type?: textTypeStyle;
	children?: React.ReactElement;
}) => {
	const {text, IProps, IStyles, option, type = 'BODY1', children} = props;
	return (
		<Text
			style={[
				styles.normal,
				{...themes.getFonts(type)},
				IStyles instanceof Array ? [...IStyles] : {...IStyles},
			]}
			{...IProps}>
			{I18nTran.t(text, option)}
			{children}
		</Text>
	);
};

export const AppTextWithoutTranslate = (props: {
	text: string;
	IStyles?: TextStyle | TextStyle[];
	IProps?: TextProps;
	type?: textTypeStyle;
	children?: React.ReactElement;
}) => {
	const {text, IProps, IStyles, type = 'BODY1', children} = props;
	return (
		<Text
			style={[
				styles.normal,
				{...themes.getFonts(type)},
				IStyles instanceof Array ? [...IStyles] : {...IStyles},
			]}
			{...IProps}>
			{`${text}`}
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	normal: {
		color: themes.getColor('blackBold'),
	},
});
