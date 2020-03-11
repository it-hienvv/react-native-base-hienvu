import React from 'react';
import {StyleSheet, View} from 'react-native';
import themes from 'assets/themes';
import I18nTran from 'assets/language';
import ScrollableTabView, {
	DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import {AppTextWithoutTranslate} from 'components/text';
import DepositRate from './deposit-rate';

const defaultProps = {};
const widthView = 750;
const widthScroll = 700;
const widthUnderline = 300;
const marginRightTextTab = 160;

export default class InterestRate extends React.PureComponent {
	static defaultProps = defaultProps;
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.viewAll}>
				<ScrollableTabView
					style={{width: widthScroll}}
					renderTabBar={() => {
						return (
							<DefaultTabBar
								underlineStyle={styles.underlineStyle}
								inactiveTextColor={themes.getColor('grayBold')}
								activeTextColor={themes.getColor('mainColor')}
								textStyle={styles.tabBarTextStyle}
							/>
						);
					}}>
					<View
						key={'1'}
						tabLabel={I18nTran.t('interest_rates')}
						style={{flex: 1, padding: 30}}>
						<AppTextWithoutTranslate
							text={'Thông tin lấy từ CMS'}
						/>
					</View>
					<DepositRate
						key={'2'}
						tabLabel={I18nTran.t('deposit_rates')}
					/>
				</ScrollableTabView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewAll: {
		height: '100%',
		width: widthView,
		backgroundColor: themes.getColor('white'),
		borderTopColor: themes.getColor('blackLight'),
		borderTopWidth: 1,
		borderLeftColor: themes.getColor('grayLight'),
		borderLeftWidth: 1,
		paddingTop: 10,
	},
	tabBarTextStyle: {
		fontSize: 14,
		fontWeight: 'normal',
		marginTop: 20,
		marginRight: marginRightTextTab,
	},
	underlineStyle: {
		height: 2,
		backgroundColor: themes.getColor('mainColor'),
		width: widthUnderline,
	},
});
