import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {SHALLOW_STYLE} from 'contants/themes';
import themes from 'assets/themes';
import {AppTextWithoutTranslate} from 'components/text';

const IMAGE_WIDTH = 20;
const LINE_WIDTH = 1;
const IMAGE_HEIGHT = 20;
const defaultProps = {
	name: 'CH 123456',
	type: 'Tín dụng',
	fee: '8%',
	sell: 'Có',
	plan: 'Có',
	time: '2019/11/20',
	money: 'Vay 5000.000.00 đ',
	listStep: [
		{
			open: false,
			done: true,
			type: 'text',
			position: 'Lead',
			text: '2019/11/20',
		},
		{open: false, done: false, type: 'text', position: 'Tiếp cận'},
		{open: false, done: true, type: 'text', position: 'Chốt sale'},
		{
			open: false,
			done: true,
			type: 'view',
			position: 'Thẩm định phê duyệt',
			text: 'Còn 12 ngày',
		},
	],
};

export default class CycleLife extends React.PureComponent {
	static defaultProps = defaultProps;
	state = {
		listStep: this.props.listStep,
	};
	_onPress = ({item, index}) => () => {
		const {listStep} = this.state;
		listStep[index] = {...item, open: !item.open};
		this.setState({listStep: [...listStep]});
	};

	_renderViewItemStepDetail() {
		return (
			<View style={styles.viewStepDetail}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					<AppTextWithoutTranslate
						IStyles={{flex: 1}}
						type={'H1'}
						text={'L094181231'}
					/>
					<View style={{flexDirection: 'row'}}>
						<Image
							style={styles.image}
							source={themes.getImages('calendar')}
						/>
						<View style={styles.viewNumber}>
							<AppTextWithoutTranslate
								type={'BODY'}
								IStyles={{alignSelf: 'center'}}
								text={'1'}
							/>
						</View>
					</View>
				</View>
				<AppTextWithoutTranslate
					IStyles={{marginTop: 15}}
					text={`Bước: ${'Phê duyệt'}. Ngày: ${'2019/20/10'}.Trạng thái: ${'Phê duyệt'}. User đang thực hiện: ${'Tuyền'}`}
				/>
			</View>
		);
	}

	_renderItem({item, index}) {
		return (
			<View key={`${index}`}>
				<View style={styles.viewItemStep}>
					<TouchableOpacity
						onPress={this._onPress({item, index})}
						style={{flexDirection: 'row'}}>
						{item.done ? (
							<Image
								style={styles.image}
								source={themes.getImages('success')}
							/>
						) : (
							<View style={styles.viewNotDone} />
						)}
						<AppTextWithoutTranslate
							IStyles={styles.textStep}
							type={'CAPTION'}
							text={item.position}
						/>
					</TouchableOpacity>
					{!!item.text &&
						(item.type === 'text' ? (
							<AppTextWithoutTranslate
								type={'CAPTION'}
								text={item.text}
							/>
						) : (
							<View style={styles.viewTimeRemain}>
								<AppTextWithoutTranslate
									IStyles={styles.textLeft}
									text={item.text}
								/>
							</View>
						))}
				</View>
				{index < this.state.listStep.length - 1 && (
					<View style={styles.line} />
				)}
				{item.open && this._renderViewItemStepDetail()}
			</View>
		);
	}

	_renderListStep() {
		return (
			<View style={styles.viewStep}>
				{this.state.listStep.map((item, index) =>
					this._renderItem({item, index}),
				)}
			</View>
		);
	}
	_renderTitle() {
		return (
			<View style={styles.viewTitle}>
				<AppTextWithoutTranslate type={'H1'} text={'Cyle Life'} />
				<AppTextWithoutTranslate
					IStyles={styles.textTile}
					type={'H1'}
					text={this.props.name}
				/>
			</View>
		);
	}

	_renderContent() {
		return (
			<View style={styles.viewContent}>
				<AppTextWithoutTranslate type={'H1'} text={this.props.money} />
				<Text numberOfLines={0}>
					<AppTextWithoutTranslate
						text={`Loại: ${this.props.type}| Lãi xuất: ${this.props.fee}| Đã bán: ${this.props.sell}| Dự kiến bán ${this.props.plan}| Thời gian dự kiến: ${this.props.time}`}
					/>
				</Text>
			</View>
		);
	}
	render() {
		const {container} = this.props;
		return (
			<View
				style={[
					styles.container,
					container instanceof Array
						? [...container]
						: {...container},
				]}>
				{this._renderTitle()}
				{this._renderContent()}
				{this._renderListStep()}
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
	viewTitle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: PADDING_COMMON,
		borderBottomColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
		paddingBottom: PADDING_COMMON,
	},
	viewContent: {
		padding: PADDING_COMMON,
		borderBottomWidth: 1,
		borderBottomColor: themes.getColor('grayLight'),
	},
	viewTimeRemain: {
		borderColor: themes.getColor('orangeOption'),
		borderWidth: 1,
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 5,
	},
	viewItemStep: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	viewStep: {
		paddingHorizontal: PADDING_COMMON,
		paddingTop: PADDING_COMMON,
	},
	textStep: {alignSelf: 'center', marginLeft: 15},
	line: {
		width: LINE_WIDTH,
		height: IMAGE_WIDTH,
		backgroundColor: themes.getColor('grayLight'),
		marginLeft: IMAGE_WIDTH / 2 - LINE_WIDTH,
	},
	textLeft: {
		color: themes.getColor('orangeOption'),
	},
	textTile: {color: themes.getColor('mainColor')},
	image: {
		width: IMAGE_WIDTH,
		padding: 3,
		height: IMAGE_HEIGHT,
		resizeMode: 'contain',
	},
	viewStepDetail: {
		borderColor: themes.getColor('grayLight'),
		borderWidth: 1,
		padding: PADDING_COMMON,
		marginHorizontal: IMAGE_WIDTH / 2 - LINE_WIDTH,
		marginVertical: 10,
		borderRadius: 5,
	},
	viewNumber: {
		width: IMAGE_WIDTH,
		height: IMAGE_HEIGHT,
		borderColor: themes.getColor('grayLight'),
		borderWidth: 1,
		borderRadius: 5,
		marginLeft: 20,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 5,
	},
	viewNotDone: {
		width: IMAGE_WIDTH,
		height: IMAGE_HEIGHT,
		backgroundColor: themes.getColor('grayLight'),
		borderRadius: 100,
	},
});
