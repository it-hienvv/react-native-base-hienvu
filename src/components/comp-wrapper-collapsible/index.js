import React from 'react';
import {
	Component,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
	Animated,
} from 'react-native';
import images from 'assets/images';
import {AppImages} from 'components/image';
import {PADDING_COMMON} from 'contants/themes/size';
import {AppTextWithoutTranslate} from 'components/text';
import TextInputAnimation from 'components/text-input-animation';
import themes from 'assets/themes';
import fonts from 'assets/fonts';

class Panel extends React.Component {
	constructor(props) {
		super(props);

		this.icons = {
			up: themes.getImages('collapse'),
			down: themes.getImages('expand'),
		};

		this.state = {
			title: props.title,
			expanded: true,
			animation: new Animated.Value(200),
		};
	}

	toggle = () => {
		this.setState({
			expanded: !this.state.expanded,
		});
	};

	_setMaxHeight = event => {
		this.setState({
			maxHeight: event.nativeEvent.layout.height,
		});
	};

	_setMinHeight = event => {
		this.setState({
			minHeight: event.nativeEvent.layout.height,
		});
	};

	render() {
		const {
			widthComp,
			children,
			title,
			hasSubTitle,
			style,
			line,
		} = this.props;
		let icon = this.icons['down'];

		if (this.state.expanded) {
			icon = this.icons['up'];
		}

		return (
			<View style={[styles.container, {width: widthComp}, style]}>
				<View
					style={[
						styles.header,
						this.state.expanded &&
							line && {
								borderBottomWidth: 1,
								borderBottomColor: themes.getColor('grayLight'),
							},
					]}
					onLayout={this._setMinHeight}>
					<AppTextWithoutTranslate
						text={title}
						type={'BLOCK-HEADER'}
						IStyles={[
							fonts['TITLE-DETAIL'],
							styles.textTitle,
							{
								marginBottom: hasSubTitle
									? PADDING_COMMON / 2
									: null,
							},
						]}
					/>
					<AppImages
						ButtonProps={{onPress: this.toggle}}
						uri={icon}
					/>
				</View>
				{/* {this.state.expanded && ( */}
				<View
					onLayout={this._setMaxHeight}
					style={{height: this.state.expanded ? null : 0}}>
					{children}
				</View>
				{/* )} */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: '#fff',
		// margin: 10,
		overflow: 'hidden',
		paddingHorizontal: PADDING_COMMON,
		paddingBottom: PADDING_COMMON,
		borderRadius: 10,
		backgroundColor: '#fff',
		borderRightWidth: 1,
		borderLeftWidth: 1,
		borderBottomWidth: 1,
		borderColor: themes.getColor('grayLight'),
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},

	header: {
		padding: PADDING_COMMON,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	textTitle: {
		// paddingHorizontal: PADDING_COMMON,
		color: themes.getColor('blueBold1'),
	},
});

export default Panel;
