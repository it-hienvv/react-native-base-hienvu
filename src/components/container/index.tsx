import React from 'react';
import {
	StyleSheet,
	View,
	ViewStyle,
	ViewProps,
	SafeAreaView,
} from 'react-native';
import {PADDING_COMMON, BOTTOM_WIDTH_SIZE} from 'contants/themes/size';
import themes from 'assets/themes';

interface IProps {
	ContainerStyles: ViewStyle | ViewStyle[];
	ContainerProps: ViewProps;
	marginLeft?: boolean;
}
interface IStates {}

class AppContainer extends React.PureComponent<IProps, IStates> {
	state: IStates = {};
	render() {
		const {ContainerStyles, ContainerProps} = this.props;
		return (
			<SafeAreaView
				{...ContainerProps}
				style={[
					styles.container,
					ContainerStyles instanceof Array
						? [...ContainerStyles]
						: {...ContainerStyles},
					this.props.marginLeft && {marginLeft: BOTTOM_WIDTH_SIZE},
				]}>
				{this.props.children}
			</SafeAreaView>
		);
	}
}

export default AppContainer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: PADDING_COMMON,
		paddingHorizontal: PADDING_COMMON,
		backgroundColor: themes.getColor('background'),
	},
});
