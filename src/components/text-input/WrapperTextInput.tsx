import React from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import {AppTextWithoutTranslate} from 'components/text';
import AppTextInput from './index';
import themes from 'assets/themes';

const PADDING_COMMON = 10;
const height = 50;
const titleLeftPosition = 20;
const defaultProps = {
	title: 'title',
	width: '100%',
	height: height,
};

type IProps = {
	title?: string;
	width?: number | string;
	height?: number | string;
};

type IStates = {};
export default class AppWrapperTextInput extends React.PureComponent<
	IProps,
	IStates
> {
	static defaultProps = defaultProps;

	_renderViewAbsolute({text}) {
		return (
			<View style={[styles.absolute]}>
				<AppTextWithoutTranslate text={text} type={'CAPTION'} />
			</View>
		);
	}
	render() {
		const {title, width, height} = this.props;
		return (
			<View style={[styles.container, {width}, {height}]}>
				<AppTextInput
					TextInputStyles={[styles.textInputStyle]}
					TextInputProps={{multiline: true}}
					type={'H1'}
				/>
				{this._renderViewAbsolute({text: title})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: height,
		borderRadius: 0.5,
		borderWidth: 0.5,
		borderColor: themes.getColor('grayLight'),
		width: '100%',
	},
	textInputStyle: {
		justifyContent: 'flex-start',
		width: '100%',
		marginTop: PADDING_COMMON,
		borderWidth: 0,
		height: '100%',
	},
	absolute: {
		backgroundColor: themes.getColor('white'),
		position: 'absolute',
		top: -PADDING_COMMON,
		left: titleLeftPosition,
		height: PADDING_COMMON * 2,
		paddingRight: titleLeftPosition * 2,
		justifyContent: 'center',
	},
});
