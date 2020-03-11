import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RANDOM_COLOR} from 'utils/util';
import {PADDING_DRAWER} from 'contants/themes/size';
import {AppNormalText, AppTextWithoutTranslate} from 'components/text';

const circle = 30;

export interface NotificationItemInterface {
	key: string;
	time: string;
	description: string;
	checked?: boolean;
	opened?: boolean;
}
interface IProps {
	item: NotificationItemInterface;
	onPress?: (item: NotificationItemInterface) => void;
	marginBottom: number;
}
interface IStates {
	colorRandom: string;
}

class NotificationItem extends React.PureComponent<IProps, IStates> {
	state: IStates = {
		colorRandom: RANDOM_COLOR(),
	};
	_onPress = () => {
		const {onPress, item} = this.props;
		if (onPress) {
			onPress(item);
		}
	};
	_renderCircleView() {
		const {colorRandom} = this.state;
		return (
			<View style={styles.paddingTop}>
				<View style={[styles.circle, {backgroundColor: colorRandom}]}>
					<Text>{'T'}</Text>
				</View>
			</View>
		);
	}

	_renderDescription() {
		const {item} = this.props;
		return (
			<View style={styles.description}>
				<AppTextWithoutTranslate
					IStyles={styles.text}
					text={item.description}
					IProps={{
						numberOfLines: 3,
						ellipsizeMode: 'tail',
					}}></AppTextWithoutTranslate>
				<AppNormalText
					type={'CAPTION'}
					IStyles={styles.space}
					option={{value: item.time}}
					text={'before-minutes'}
				/>
			</View>
		);
	}

	render() {
		const {item, marginBottom} = this.props;
		return (
			<TouchableOpacity
				onPress={this._onPress}
				style={[
					styles.container,
					item.checked && {...styles.backgroundColor},
					{marginBottom},
				]}>
				{this._renderCircleView()}
				{this._renderDescription()}
			</TouchableOpacity>
		);
	}
}

export default NotificationItem;

const styles = StyleSheet.create({
	container: {
		padding: PADDING_DRAWER,
		width: '100%',
		borderWidth: 0.5,
		borderColor: '#DBDBDB',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	circle: {
		width: circle,
		height: circle,
		borderRadius: circle / 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	description: {
		paddingHorizontal: PADDING_DRAWER,
	},
	space: {
		marginVertical: PADDING_DRAWER / 4,
	},
	text: {
		fontSize: 18,
		marginVertical: PADDING_DRAWER / 4,
	},
	paddingTop: {
		paddingTop: PADDING_DRAWER / 4,
	},
	backgroundColor: {
		backgroundColor: '#ECEDFF',
	},
});
