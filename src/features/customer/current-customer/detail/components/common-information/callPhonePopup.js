import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {AppTextWithoutTranslate} from 'components/text';
import themes from 'assets/themes';
import AppPopupMenu from 'components/popup-menu';
import {makePhoneCall, makePhoneEmail} from 'utils/util';

const defaultProps = {
	data: [
		{phone: '0941729593', key: 0},
		{phone: '0941729594', key: 1},
		{phone: '0941729595', key: 2},
		{phone: '0941729596', key: 3},
	],
};
class CallPhonePopup extends React.PureComponent {
	static defaultProps = defaultProps;

	onPress = item => {
		const {type} = this.props;
		if (type === email) {
			if (item && item.email) {
				makePhoneEmail({to: item.email});
			}
		} else {
			if (item && item.phone) {
				makePhoneCall(item.phone);
			}
		}
	};

	renderItem = item => {
		const {type} = this.props;
		if (type === 'email') {
			return (
				<View style={styles.container}>
					<AppTextWithoutTranslate text={item.email} />
					<Image
						style={styles.image}
						source={themes.getImages('actionEmail')}
					/>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<AppTextWithoutTranslate text={item.phone} />
				<Image
					style={styles.image}
					source={themes.getImages('telephone')}
				/>
			</View>
		);
	};

	render() {
		let {triggerElement, data, type} = this.props;
		if (type === 'email') {
			data = data
				.map((item, index) => {
					return {
						...item,
						key: index,
					};
				})
				.filter(item => item.email);
		} else {
			data = data
				.map((item, index) => {
					return {
						...item,
						key: index,
					};
				})
				.filter(item => item.phone);
		}

		return (
			<AppPopupMenu
				onPress={this.onPress}
				data={data}
				triggerElement={triggerElement}
				customElementMenu={this.renderItem}
			/>
		);
	}
}

export default CallPhonePopup;

const styles = StyleSheet.create({
	container: {
		padding: PADDING_COMMON,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
	},
	image: {
		width: 20,
		height: 20,
		resizeMode: 'contain',
	},
});
