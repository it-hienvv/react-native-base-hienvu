import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import AppContainer from 'components/container';
import {PADDING_COMMON} from 'contants/themes/size';
import {SHALLOW_STYLE} from 'contants/themes';
import themes from 'assets/themes';
import {AppTextWithoutTranslate} from 'components/text';

const defaultProps = {
	data: [
		{left: 'Địa chỉ', right: 'Tín chấp, SMS, credit'},
		{left: 'Ngành cha tại MB', right: 'Ăn uống'},
		{left: 'Doanh thu trước rủi ro', right: '1,200,000,000đ'},
		{left: 'Được quản lý bởi', right: '3 chi nhánh'},
	],
	title: 'Thông tin khách hàng',
};
export default class DetailCustomer extends React.PureComponent {
	static defaultProps = defaultProps;

	_renderItem = (item, index) => (
		<View key={`${index}`} style={styles.itemView}>
			<AppTextWithoutTranslate
				IStyles={{color: themes.getColor('mainColor')}}
				text={item.left}
			/>
			<AppTextWithoutTranslate text={item.right} />
		</View>
	);
	render() {
		const {data, title, container} = this.props;
		return (
			<View
				style={[
					styles.container,
					container instanceof Array
						? [...container]
						: {...container},
				]}>
				<AppTextWithoutTranslate type={'BLOCK-HEADER'} text={title} />
				{data.map((item, index) => this._renderItem(item, index))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		padding: PADDING_COMMON,
		...SHALLOW_STYLE,
		borderRadius: 8,
	},
	itemView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: PADDING_COMMON,
		borderBottomWidth: 1,
		borderBottomColor: themes.getColor('grayLight'),
	},
});
