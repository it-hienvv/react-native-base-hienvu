import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import {AppImages} from 'components/image';
import themes from 'assets/themes';

const height = 20;
const defaultProps = {
	bagger: false,
	numberNotification: 1,
	IStyles: {width: 18, height: 18, borderRadius: 9},
	uri: themes.getImages('search'),
	onPress: () => {},
	disable: false,
};

interface IProps {
	IStyles?: ViewStyle;
	bagger?: boolean;
	numberNotification?: number;
	uri: string | number;
	disable?: boolean;
	onPress: () => void;
	ImageStyles?: ViewStyle
}
interface IStates {}

class IconWithBagger extends React.PureComponent<IProps, IStates> {
	static defaultProps = defaultProps;
	state = {};
	render() {
		const {
			uri,
			IStyles,
			numberNotification,
			bagger,
			onPress,
			disable,
		} = this.props;
		return (
			<TouchableOpacity
				disabled={disable}
				onPress={onPress}
				style={[styles.container, {...IStyles}]}>
				<AppImages
					ButtonProps={{disabled: true}}
					ImageStyle={[styles.image, {...this.props.ImageStyles}]}
					uri={uri}
				/>
				{bagger && numberNotification > 0 && (
					<View style={[styles.bagger]}>
						<Text style={styles.text}>
							{numberNotification <= 99
								? numberNotification
								: '+99'}
						</Text>
					</View>
				)}
			</TouchableOpacity>
		);
	}
}
export default IconWithBagger;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	bagger: {
		position: 'absolute',
		right: 0,
		top: -height / 4,
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 2,
	},
	image: {
		width: height,
		height: height,
	},
	text: {
		color: '#FFFFFF',
		fontSize: 10,
	},
});
