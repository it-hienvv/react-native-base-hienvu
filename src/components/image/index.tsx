import React from 'react';
import {
	StyleSheet,
	Image,
	TouchableOpacity,
	TouchableOpacityProps,
	ViewStyle,
	ImageStyle,
	ImageProps,
} from 'react-native';
import themes from 'assets/themes';
export const AppImages = (props: {
	ButtonStyles?: ViewStyle | ViewStyle[];
	ButtonProps?: TouchableOpacityProps;
	ImageStyle?: ImageStyle | ImageStyle[];
	ImageProps?: ImageProps;
	uri: string | number;
	children?: React.ReactNode;
}) => {
	const {ButtonProps, ButtonStyles, ImageStyle, ImageProps, uri} = props;
	return (
		<TouchableOpacity
			style={[
				styles.wrap,
				props.children && {
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					// backgroundColor: 'red',
				},
				ButtonStyles instanceof Array
				? [...ButtonStyles]
				: {...ButtonStyles},
			]}
			{...ButtonProps}>
			<Image
				{...ImageProps}
				style={[
					styles.image,
					ImageStyle instanceof Array
						? [...ImageStyle]
						: {...ImageStyle},
				]}
				source={typeof uri === 'string' ? {uri: uri} : uri}
			/>
			{props.children}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	wrap: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 20,
		padding: 3,
		height: 20,
		resizeMode: 'contain',
	},
});
