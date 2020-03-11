import React, {Component} from 'react';
import {Text, View, StyleSheet, Animated, Dimensions} from 'react-native';
import themes from 'assets/themes';
import {AppImages} from 'components/image';

class SnackBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			type: 'success',
			posAnim: new Animated.Value(0),
		};
	}

	show = (text, type) => {
		this.setState(
			{
				text,
				type,
			},
			() => {
				Animated.timing(this.state.posAnim, {
					toValue: 1,
					useNativeDriver: true,
				}).start(() => {
					this.timeHide = setTimeout(() => {
						this.hide();
					}, 3000);
				});
			},
		);
	};

	hide = () => {
		Animated.timing(this.state.posAnim, {
			toValue: 0,
			useNativeDriver: true,
		}).start(() => {
			clearTimeout(this.timeHide);
		});
	};

	render() {
		const {text, posAnim, type} = this.state;
		const animPosY = posAnim.interpolate({
			inputRange: [0, 1],
			outputRange: [0, -100],
		});
		return (
			<Animated.View
				style={[
					styles.container,
					{
						transform: [{translateY: animPosY}],
						backgroundColor:
							type === 'success'
								? themes.getColor('blackBold')
								: themes.getColor('red'),
					},
				]}>
				<Text style={styles.message} numberOfLines={2}>
					{text}
				</Text>
				<View>
					<AppImages
						uri={themes.getImages('cancel')}
						ButtonProps={{onPress: this.hide}}
						ImageStyle={{
							tintColor: themes.getColor('white'),
							marginLeft: 40,
							width: 10,
							height: 10,
						}}
					/>
				</View>
			</Animated.View>
		);
	}
}

export default SnackBar;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		alignSelf: 'center',
		position: 'absolute',
		justifyContent: 'space-between',
		flexDirection: 'row',
		borderRadius: 5,
		bottom: -75,
	},

	message: {
		color: themes.getColor('white'),
		maxWidth: 500,
	},
});
