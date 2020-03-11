import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WIDTH_SCREEN, isIos} from 'utils/util';
import {AppImages} from 'components/image';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {
	BOTTOM_WIDTH_SIZE,
	PADDING_COMMON,
	HEADER_SPACING_ELEMENT,
	HEADER,
} from 'contants/themes/size';
import HeaderRightWithIcon from './components/HeaderRightWithIcon';
import {AppNormalText} from 'components/text';
import HeaderSaleKit from 'features/sale-kit/product-and-service/components/HeaderSaleKit';
import HeaderSearchBox from './components/HeaderSearchBox';
import {LEFT_TAB_KEY} from 'contants/contants';
import themes from 'assets/themes';
import HeaderOpportunity from 'features/customer/clue-customer/clue/components/HeaderOpportunity';

const imagesSize = HEADER.LOGO.width;

interface IProps {
	leftTabAppItem: any;
}
interface IStates {
	logo: React.ReactNode;
	left: React.ReactNode;
	right: React.ReactNode;
	title: React.ReactNode;
	leftTabAppItem: any;
}

export default class AppHeader extends React.Component<IProps, IStates> {
	state: IStates = {
		logo: (
			<AppImages ImageStyle={styles.image} uri={themes.getImages('mb')} />
		),
		left: (
			<HeaderSearchBox
				IStyles={{
					marginLeft: HEADER_SPACING_ELEMENT,
				}}
			/>
		),
		right: <HeaderRightWithIcon />,
		title: (
			<AppNormalText
				IStyles={styles.marginLeft}
				type={'TITLE-BAR'}
				text={this.props.leftTabAppItem.name}
			/>
		),
		leftTabAppItem: this.props.leftTabAppItem,
	};

	static getDerivedStateFromProps(nextProps: IProps, prevState: IStates) {
		if (nextProps.leftTabAppItem.key !== prevState.leftTabAppItem.key) {
			if (nextProps.leftTabAppItem.key === LEFT_TAB_KEY.home.key) {
				return {
					leftTabAppItem: nextProps.leftTabAppItem,
					title: (
						<AppNormalText
							IStyles={styles.marginLeft}
							type={'TITLE-BAR'}
							text={nextProps.leftTabAppItem.name}
						/>
					),
					left: (
						<HeaderSearchBox
							IStyles={{
								marginLeft: HEADER_SPACING_ELEMENT,
							}}
						/>
					),
				};
			} else if (
				nextProps.leftTabAppItem.key === LEFT_TAB_KEY.saleKit.key
			) {
				return {
					leftTabAppItem: nextProps.leftTabAppItem,
					title: (
						<AppNormalText
							IStyles={styles.marginLeft}
							type={'TITLE-BAR'}
							text={nextProps.leftTabAppItem.name}
						/>
					),
					left: <HeaderSaleKit />,
				};
			} else if (
				nextProps.leftTabAppItem.key ===
				LEFT_TAB_KEY.currentCustomer.key
			) {
				return {
					leftTabAppItem: nextProps.leftTabAppItem,
					title: (
						<AppNormalText
							IStyles={styles.marginLeft}
							type={'TITLE-BAR'}
							text={nextProps.leftTabAppItem.name}
						/>
					),
					left: null,
				};
			} else if (
				nextProps.leftTabAppItem.key === LEFT_TAB_KEY.clue.key ||
				nextProps.leftTabAppItem.key === LEFT_TAB_KEY.opportunity.key
			) {
				return {
					leftTabAppItem: nextProps.leftTabAppItem,
					title: (
						<AppNormalText
							IStyles={styles.marginLeft}
							type={'TITLE-BAR'}
							text={nextProps.leftTabAppItem.name}
						/>
					),
					left: <HeaderOpportunity />,
				};
			} else if (nextProps.leftTabAppItem.key === LEFT_TAB_KEY.kpi.key) {
				return {
					leftTabAppItem: nextProps.leftTabAppItem,
					title: (
						<AppNormalText
							IStyles={styles.marginLeft}
							type={'TITLE-BAR'}
							text={nextProps.leftTabAppItem.name}
						/>
					),
					left: (
						<HeaderSearchBox
							IStyles={{
								marginLeft: HEADER_SPACING_ELEMENT,
							}}
						/>
					),
				};
			} else if (
				nextProps.leftTabAppItem.key ===
				LEFT_TAB_KEY.questionCustomer.key
			) {
				return {
					leftTabAppItem: nextProps.leftTabAppItem,
					title: (
						<AppNormalText
							IStyles={styles.marginLeft}
							type={'TITLE-BAR'}
							text={nextProps.leftTabAppItem.name}
						/>
					),
					left: (
						<HeaderSearchBox
							IStyles={{
								marginLeft: HEADER_SPACING_ELEMENT,
							}}
						/>
					),
				};
			} else if (
				nextProps.leftTabAppItem.key ===
				LEFT_TAB_KEY.warningCustomer.key
			) {
				return {
					leftTabAppItem: nextProps.leftTabAppItem,
					title: (
						<AppNormalText
							IStyles={styles.marginLeft}
							type={'TITLE-BAR'}
							text={nextProps.leftTabAppItem.name}
						/>
					),
					left: null,
					right: (
						<View style={styles.viewRightWarning}>
							<AppImages
								uri={themes.getImages('actionCalendar')}
								ImageStyle={styles.imageCalendar}
							/>
							<AppNormalText
								text={'my_plan'}
								IStyles={styles.textMyPlan}
								type={'BLOCK-HEADER2'}
							/>
							<AppImages
								uri={themes.getImages('dropDown')}
								ImageStyle={styles.imagedropDown}
							/>
							<HeaderRightWithIcon />
						</View>
					),
				};
			} else {
				return null;
			}
		}
		return null;
	}

	_renderLogo() {
		const {logo} = this.state;
		return logo;
	}

	_renderTitle() {
		const {title} = this.state;
		return title;
	}

	_renderLeft() {
		const {left} = this.state;
		return left;
	}

	_renderRight() {
		const {right} = this.state;
		return right;
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.left}>
					{this._renderLogo()}
					{this._renderTitle()}
					{this._renderLeft()}
				</View>
				<View style={styles.headerLeft}>{this._renderRight()}</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	textMyPlan: {
		textAlignVertical: 'center',
		marginRight: 4,
	},
	imagedropDown: {
		tintColor: themes.getColor('blackLight'),
		width: 16,
		height: 16,
		marginRight: 30,
	},
	viewRightWarning: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	imageCalendar: {
		tintColor: themes.getColor('blackLight'),
		marginRight: 10,
	},
	container: {
		height: 60,
		width: WIDTH_SCREEN,
		marginTop: isIos ? getStatusBarHeight() : 0,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		justifyContent: 'space-between',
		// alignItems: 'flex-start'
	},
	left: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		paddingLeft: BOTTOM_WIDTH_SIZE / 2 - imagesSize / 2,
	},
	headerLeft: {
		justifyContent: 'center',
	},
	image: {
		width: imagesSize,
		height: imagesSize,
	},
	marginLeft: {
		marginLeft: BOTTOM_WIDTH_SIZE / 2 - imagesSize / 2 + PADDING_COMMON,
	},
});
