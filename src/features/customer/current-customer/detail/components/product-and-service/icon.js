import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {AppTextWithoutTranslate} from 'components/text';
import themes from 'assets/themes';
import {SHALLOW_STYLE} from 'contants/themes';
import {WIDTH_SCREEN} from 'utils/util';

const defaultProps = {
	data: [],
	onScrollViewScroll: () => {},
};
class Icon extends React.PureComponent {
	static defaultProps = defaultProps;
	constructor(props) {
		super(props);
		this.marginItem = 10;
		this.WIDTH_ITEM =
			WIDTH_SCREEN / 6 - this.marginItem * 2 - PADDING_COMMON;
	}

	onPress = item => () => {
		this.props.onScrollViewScroll && this.props.onScrollViewScroll(item.y);
	};

	_keyExtractor = (item, index) => `${index}`;

	_renderItem = ({item, index}) => (
		<TouchableOpacity
			onPress={this.onPress(item)}
			key={`${index}`}
			style={[
				styles.container,
				{width: this.WIDTH_ITEM, marginHorizontal: this.marginItem},
			]}>
			{item.top !== undefined && item.top !== null && (
				<View
					style={{
						position: 'absolute',
						padding: 2,
						right: 5,
						top: 5,
						backgroundColor: themes.getColor('greenOption'),
						borderRadius: 100,
						width: 30,
						height: 30,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<AppTextWithoutTranslate
						IStyles={{
							color: themes.getColor('white'),
							alignSelf: 'center',
						}}
						text={item.top}
					/>
				</View>
			)}
			<View style={styles.item}>
				<View
					style={[
						styles.itemTop,
						item.value !== undefined &&
							item.value !== null && {
							borderBottomWidth: 1,
							borderBottomColor: themes.getColor('grayLight'),
						},
					]}>
					<Image style={styles.image} source={item.icon} />
					<AppTextWithoutTranslate
						IProps={{numberOfLines: 1}}
						type={'BODY'}
						text={item.label}
					/>
				</View>

				{item.value !== undefined && item.value !== null && (
					<Text
						style={{
							marginTop: PADDING_COMMON,
							alignSelf: 'center',
						}}>
						<AppTextWithoutTranslate text={'Tổng: '} />
						<AppTextWithoutTranslate
							IStyles={{color: themes.getColor('mainColor')}}
							text={`${item.value}`}
						/>
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);

	_renderList() {
		const {data} = this.props;
		return (
			<FlatList
				showsHorizontalScrollIndicator={false}
				horizontal
				data={data}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
			/>
		);
	}
	render() {
		return (
			<View
				style={{
					paddingHorizontal: PADDING_COMMON * 3,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				{this._renderList()}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	image: {
		width: 60,
		height: 60,
		resizeMode: 'contain',
		marginBottom: 10,
	},
	container: {
		...SHALLOW_STYLE,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: PADDING_COMMON,
	},
	item: {
		padding: PADDING_COMMON,
	},
	itemTop: {
		paddingBottom: PADDING_COMMON,
		alignItems: 'center',
	},
});
export default Icon;
