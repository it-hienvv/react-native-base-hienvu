import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {AppNormalText, AppTextWithoutTranslate} from 'components/text';
import {BOTTOM_WIDTH_SIZE, PADDING_COMMON} from 'contants/themes/size';
import ChartStyle from './styles/TempStyle';
import EmptyComp from 'components/empty-comp';
import ChartLegend from './ChartLegend';
import AppPopupMenu from 'components/popup-menu';
import {AppImages} from 'components/image';
import {menuList} from 'features/dashboard/contants';

let data = [
	{id: 1, title: 'Ajdsfahkj', value: '90%'},
	{id: 2, title: 'B', value: '76.2%'},
	{id: 3, title: 'Csdkjlafh', value: '69%'},
	{id: 4, title: 'D', value: '50%'},
	{id: 5, title: 'Esadfjas', value: '49%'},
];

let listColor = ['#07B841', '#FFA713', '#BDBDBD', '#FF2C4B', '#D88282'];

class FunnelChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			optionFilter: menuList[0].text,
		};
	}

	_renderDataNotice = () => {
		const {values} = this.props;
		return (
			<View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
				{data.map((value, index) => {
					const data = {...value, title: value.title};
					return (
						<View
							key={index}
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: 10,
								marginBottom: 10,
							}}>
							<View
								style={{
									height: 16,
									width: 30,
									backgroundColor: listColor[index],
									marginRight: 5,
									borderRadius: 4,
								}}
							/>
							<Text>{data.title}</Text>
						</View>
					);
				})}
			</View>
		);
	};

	_onPressFilter = item => {
		this.setState({
			optionFilter: item.text,
		});
	};

	render() {
		const {values, chartTitle, chartHeight, chartWidth} = this.props;
		const {optionFilter} = this.state;

		return (
			<View
				style={[
					styles.chartViewStyle,
					{
						width:
							chartWidth || ChartStyle.PieChart.defaultSize.width,
					},
				]}>
				<View
					style={{
						width: '100%',
						borderBottomWidth: 1,
						borderBottomColor: '#ccc',
						paddingBottom: 16,
						marginBottom: 16,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					<Text style={ChartStyle.commonStyle.titleStyle}>
						{chartTitle}
					</Text>
					<AppPopupMenu
						onPress={this._onPressFilter}
						key={'3'}
						data={menuList}
						triggerElement={
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'center',
								}}>
								<AppTextWithoutTranslate
									text={optionFilter}
									type={'BODY'}
									IStyles={{marginRight: 5}}
								/>
								<AppImages
									ButtonProps={{
										disabled: true,
									}}
									// ImageStyle={styles.image}
									uri={require('assets/images/icon/drop_down_arrow.png')}
								/>
							</View>
						}
					/>
				</View>
				<View
					style={{
						height: 300 || ChartStyle.PieChart.defaultSize.height,
						width: '100%',
					}}>
					{data && data.length !== 0 ? (
						data.map((item, index) => (
							<View
								key={index}
								style={{
									width: '70%',
									height: '17%',
									backgroundColor: listColor[index],
									alignSelf: 'center',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<AppTextWithoutTranslate
									text={item.value}
									type={'BODY1'}
									IStyles={{
										alignSelf: 'center',
										paddingVertical: 10,
										color: '#fff',
									}}
								/>
							</View>
						))
					) : (
						<EmptyComp />
					)}
				</View>
				{this._renderDataNotice()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	chartViewStyle: {
		flex: 1,
		padding: PADDING_COMMON,
		marginHorizontal: PADDING_COMMON,
		borderRadius: 10,
		backgroundColor: '#FFFFFF',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	chart: {
		flex: 1,
	},
});

export default FunnelChart;
