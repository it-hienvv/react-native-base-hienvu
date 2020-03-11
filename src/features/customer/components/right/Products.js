import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {SHALLOW_STYLE} from 'contants/themes';
import themes from 'assets/themes';
import {AppTextWithoutTranslate, AppNormalText} from 'components/text';
import {AppImages} from 'components/image';

const defaultProps = {
	data: [
		{
			product: 'Sản phẩm',
			plan: 'Kế hoạch',
			sell: 'Đã bán',
			opportunity: 'Cơ hội',
		},
		{
			product: 'Sản phẩm',
			plan: 'Kế hoạch',
			sell: 'Đã bán',
			opportunity: 'Cơ hội',
		},
		{
			product: 'Sản phẩm',
			plan: 'Kế hoạch',
			sell: 'Đã bán',
			opportunity: 'Cơ hội',
		},
		{
			product: 'Sản phẩm',
			plan: 'Kế hoạch',
			sell: 'Đã bán',
			opportunity: 'Cơ hội',
		},
	],
	listHeader: ['#', 'Sản phẩm', 'Dự kiến bán', 'Đã bán', 'Cơ hội'],
	listFlex: [1, 2, 2, 2, 2],
	title: 'Thông tin khách hàng',
	listProps: ['product', 'plan', 'sell', 'opportunity'],
	listType: ['string', 'image', 'image', 'string'],
	initRender: 3,
};
export default class Products extends React.PureComponent {
	static defaultProps = defaultProps;
	state = {
		data: this.props.data.slice(0, this.props.initRender),
	};

	_onPressSeeMore = () => {
		if (this.state.data.length >= this.props.data.length) {
			this.setState({
				data: this.props.data.slice(0, this.props.initRender),
			});
		} else {
			this.setState({
				data: this.props.data,
			});
		}
	};
	_renderHeader = () => {
		return (
			<View
				style={[
					styles.itemView,
					{backgroundColor: themes.getColor('backgroundBlue')},
				]}>
				{this.props.listFlex.map((e, i) => {
					return (
						<View style={[{flex: e}, styles.cellItem]} key={`${i}`}>
							<AppTextWithoutTranslate
								text={`${this.props.listHeader[i]}`}
							/>
						</View>
					);
				})}
			</View>
		);
	};

	_renderItem = ({item, index}) => {
		return (
			<View style={[styles.itemView]}>
				{this.props.listFlex.map((e, i) => {
					return (
						<View
							style={[{flex: e}, styles.cellItem]}
							key={`${index}_${i}`}>
							{this.props.listHeader[0] === '#' && i === 0 ? (
								<AppTextWithoutTranslate
									text={`${index + 1}`}
								/>
							) : (
								// <AppTextWithoutTranslate
								// 	text={`${
								// 		this.props.listHeader[0] === '#'
								// 			? item[this.props.listProps[i - 1]]
								// 			: item[this.props.listProps[i]]
								// 	}`}
								// />
								<AppImages
									ButtonProps={{disabled: true}}
									uri={themes.getImages('checkmark')}
								/>
							)}
						</View>
					);
				})}
			</View>
		);
	};

	_keyExtractor = (item, index) => `${index}`;

	_renderButtonSeeMore() {
		return (
			<TouchableOpacity
				onPress={this._onPressSeeMore}
				style={{
					flexDirection: 'row',
					paddingHorizontal: PADDING_COMMON,
					marginTop: PADDING_COMMON,
				}}>
				<AppNormalText
					IStyles={{color: themes.getColor('mainColor')}}
					text={`${
						this.state.data.length <= this.props.data.length
							? 'see_more'
							: 'collapse'
					}`}
				/>
				<AppImages
					ButtonProps={{disabled: true}}
					ImageStyle={[
						{
							width: 16,
							height: 16,
							tintColor: themes.getColor('mainColor'),
							marginLeft: 10,
						},
						,
						this.state.data.length === this.props.data.length && {
							transform: [{rotate: '180deg'}],
						},
					]}
					uri={themes.getImages('expand')}
				/>
			</TouchableOpacity>
		);
	}

	render() {
		const {title, container} = this.props;
		return (
			<View
				style={[
					styles.container,
					container instanceof Array
						? [...container]
						: {...container},
				]}>
				<AppTextWithoutTranslate
					IStyles={{
						marginLeft: PADDING_COMMON,
						marginBottom: PADDING_COMMON,
					}}
					type={'BLOCK-HEADER'}
					text={title}
				/>
				<View>
					{this._renderHeader()}
					<FlatList
						data={this.state.data}
						renderItem={this._renderItem}
						keyExtractor={this._keyExtractor}
					/>
					{this._renderButtonSeeMore()}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingVertical: PADDING_COMMON,
		...SHALLOW_STYLE,
		borderRadius: 8,
	},
	itemView: {
		flexDirection: 'row',
		// justifyContent: 'space-between',
		// borderBottomWidth: 1,
		borderColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
		width: '100%',
	},
	cellItem: {
		height: 30,
		borderRightWidth: 1,
		borderRightColor: themes.getColor('grayLight'),
		justifyContent: 'center',
		alignItems: 'center',
	},
});
