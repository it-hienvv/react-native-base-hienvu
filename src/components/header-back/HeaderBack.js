import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {AppImages} from 'components/image';
import {AppButton} from 'components/button';
import {mainNavigationService} from 'routers/managerNavigator';
import {HEADER, PADDING_COMMON} from 'contants/themes/size';
import {AppNormalText, AppTextWithoutTranslate} from 'components/text';
import {SHALLOW_STYLE} from 'contants/themes';
import themes from 'assets/themes';

const imagesSize = HEADER.LOGO.width;

class HeaderCompareProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onPress = () => {
		const {onPressBack} = this.props;
		onPressBack && onPressBack();
		mainNavigationService.pop();
	};

	render() {
		const {image} = this.props;
		return (
			<ImageBackground
				source={image ? image : null}
				style={[
					styles.container,
					this.props.hasRightBtn && {justifyContent: 'space-between'},
					this.props.containerStyle,
				]}>
				<AppImages
					ButtonProps={{onPress: this.onPress}}
					ImageStyle={[styles.leftImage, this.props.styleLeftIcon]}
					ButtonStyles={[this.props.styleLeftBtn]}
					uri={themes.getImages(this.props.iconLeft)}>
					{!!this.props.titleLeft && (
						<Text style={styles.textStyle}>
							{this.props.titleLeft}
							{this.props.compSubLeftTitle &&
								this.props.compSubLeftTitle}
						</Text>
					)}
					{this.props.leftCompTitle && this.props.leftCompTitle}
				</AppImages>
				{!!this.props.title && <Text>{this.props.title}</Text>}
				{this.props.compTitle && this.props.compTitle}
				{this.props.rightComp && this.props.rightComp}
				{this.props.advanceComp && this.props.advanceComp}
			</ImageBackground>
		);
	}
}

export default HeaderCompareProduct;

const styles = StyleSheet.create({
	leftImage: {
		width: imagesSize,
		height: imagesSize,
	},
	container: {
		paddingVertical: PADDING_COMMON,
		// alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		paddingHorizontal: PADDING_COMMON,

		...SHALLOW_STYLE,
	},
	left: {
		// alignItems: 'center',
		// justifyContent: 'flex-start',
		flexDirection: 'row',
		// paddingHorizontal: PADDING_COMMON,
		// ...SHALLOW_STYLE,
	},
	textStyle: {
		marginLeft: PADDING_COMMON,
		fontSize: 20,
		fontFamily: 'Roboto-Bold',
	},
});
