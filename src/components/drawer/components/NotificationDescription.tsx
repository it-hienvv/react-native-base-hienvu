import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppTextWithoutTranslate} from 'components/text';
import {PADDING_DRAWER} from 'contants/themes/size';

const fakeTitle =
	'Notification chỉ hiển thị những thông tin liên quan đến chính sách sản phẩm, chính sách bán hàng, biểu phí và các thông tin liên quan đến KH đang phục vụ';
const title = 'Nội dung của tin trên notification';
const paddingLeft = 22;
const paddingRight = 29.5;
const paddingTop = 19;

export interface NotificationDescriptionInterface {
	title: string;
	content: string;
	meta: string;
}
interface IProps {
	// item: NotificationDescriptionInterface;
}
interface IStates {}
class NotificationDescription extends React.PureComponent<IProps, IStates> {
	_renderTitle() {
		return (
			<View style={styles.viewTitle}>
				<AppTextWithoutTranslate
					IStyles={styles.textTitle}
					text={title}
				/>
			</View>
		);
	}

	_renderContent() {
		return (
			<View style={styles.viewContent}>
				<AppTextWithoutTranslate text={fakeTitle} />
			</View>
		);
	}

	_renderMeta() {
		return (
			<View style={styles.viewMeta}>
				<AppTextWithoutTranslate text={fakeTitle} />
			</View>
		);
	}

	_render() {
		return (
			<View style={styles.container}>
				{this._renderTitle()}
				{this._renderContent()}
				{this._renderMeta()}
			</View>
		);
	}
	render() {
		return this._render();
	}
}

export default NotificationDescription;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: paddingLeft,
		paddingRight: paddingRight,
	},
	header: {
		paddingHorizontal: PADDING_DRAWER,
		paddingVertical: PADDING_DRAWER,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	viewTitle: {
		paddingVertical: paddingTop,
	},
	viewContent: {
		paddingBottom: paddingTop,
	},
	viewMeta: {
		paddingVertical: paddingTop,
	},
	textTitle: {
		fontSize: 18,
	},
});
