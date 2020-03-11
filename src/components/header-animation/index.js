import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Animated, Dimensions} from 'react-native';
import HeaderBack from 'components/header-back/HeaderBack';
import AppPopupMenu from 'components/popup-menu';
import {AppImages} from 'components/image';
import {AppTextWithoutTranslate} from 'components/text';
import {AppButton} from 'components/button';
import IconActionComp from 'features/customer/clue-customer/detail-customer/components/icon-action-comp';
import {PADDING_COMMON} from 'contants/themes/size';
import styles from './styles/index.css';
import I18nTran from 'assets/language';
import themes from 'assets/themes';
import fonts from 'assets/fonts';

const HEADER_EXPANDED_HEIGHT = 245;
const HEADER_COLLAPSED_HEIGHT = 60;

const {width: widthScreen} = Dimensions.get('window');

class HeaderAnimation extends Component {
	constructor(props) {
		super(props);
	}

	_handleAction = key => () => {
		this.props.handleAction(key);
	};

	_renderListAction = () => {
		const {scrollY, listAction} = this.props;
		const heroTitleOpacity = scrollY.interpolate({
			inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		});
		return (
			<Fragment>
				{listAction.map((item, index) => (
					<Fragment key={item.key}>
						<IconActionComp
							icon={item.icon}
							imgStyle={{width: 21, height: 21, borderRadius: 0}}
							txtIcon={I18nTran.t(item.text)}
							txtStyle={{
								opacity: heroTitleOpacity,
								maxWidth: 100,
								textAlign: 'center',
							}}
							animation={true}
							onPress={this._handleAction(item.key)}
						/>
						{index !== listAction.length - 1 && (
							<View style={styles.space} />
						)}
					</Fragment>
				))}
			</Fragment>
		);
	};

	onChangeTab = id => () => {
		this.props.onChangeTab(id);
	};

	render() {
		const {scrollY, listPage, title, indexPage, segmentation} = this.props;
		const headerHeight = scrollY.interpolate({
			inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
			outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
			extrapolate: 'clamp',
		});

		const showTitleOpacity = scrollY.interpolate({
			inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		});

		const heroTitleOpacity = scrollY.interpolate({
			inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		});

		const positionYIcon = scrollY.interpolate({
			inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
			outputRange: [0, -(HEADER_COLLAPSED_HEIGHT + PADDING_COMMON - 5)],
			extrapolate: 'clamp',
		});
		return (
			<Animated.View
				style={{
					height: headerHeight,
					position: 'absolute',
					width: '100%',
					top: 0,
					left: 0,
					zIndex: 100,
				}}>
				<HeaderBack
					containerStyle={{flex: 1, paddingTop: PADDING_COMMON}}
					iconLeft={'cancel'}
					styleLeftIcon={{width: 18, height: 18}}
					styleLeftBtn={{
						padding: 10,
						alignItems: 'flex-start',
						zIndex: 1000,
					}}
					leftCompTitle={
						<Animated.Text
							style={[
								fonts['TITLE-DETAIL'],
								styles.nameCompany,
								{
									position: 'absolute',
									opacity: showTitleOpacity,
									left: 40,
									marginTop: 8,
								},
							]}>
							{title}
						</Animated.Text>
					}
					// image={images.cityBackground}
					hasRightBtn={true}
					rightComp={
						<Fragment>
							<Animated.View
								style={{
									flexDirection: 'row',
									marginTop: 8,
									opacity: showTitleOpacity,
									position: 'absolute',
									right: PADDING_COMMON * 2,
									zIndex: 1000,
								}}>
								{this._renderListAction()}
							</Animated.View>
							<AppPopupMenu
								// onPress={this._onPressFilterTable}
								key={'3'}
								// data={menuList}
								triggerElement={
									<AppImages
										ButtonProps={{disabled: true}}
										// ImageStyle={styles.image}
										uri={themes.getImages('threeDot')}
									/>
								}
							/>
						</Fragment>
					}
					compTitle={
						<View style={styles.titleHeader}>
							<Animated.Text
								style={[
									fonts['TITLE-DETAIL'],
									styles.nameCompany,
									{
										transform: [
											{translateY: positionYIcon},
										],
										opacity: heroTitleOpacity,
									},
								]}>
								{title}
							</Animated.Text>
							<Animated.View
								style={[
									styles.wrapperRanked,
									{
										opacity: heroTitleOpacity,
										transform: [
											{translateY: positionYIcon},
										],
									},
								]}>
								<View style={styles.lineRanker} />
								<View style={styles.ranker}>
									<AppTextWithoutTranslate
										type={'BOLD'}
										text={segmentation}
										IStyles={styles.txtRanker}
									/>
								</View>
							</Animated.View>
							<Animated.View
								style={{
									alignItems: 'center',
									flexDirection: 'row',
									marginTop: PADDING_COMMON,
									marginBottom: 75,
									transform: [{translateY: positionYIcon}],
									opacity: heroTitleOpacity,
								}}>
								{this._renderListAction()}
							</Animated.View>
						</View>
					}
					advanceComp={
						<Animated.View
							style={{
								flexDirection: 'row',
								position: 'absolute',
								bottom: 0,
								opacity: heroTitleOpacity,
								width: '100%',
								justifyContent: 'center',
							}}>
							{listPage.map((item, index) => {
								return (
									<AppButton
										key={item.id}
										text={item.title}
										TextStyle={{
											color:
												indexPage === item.id
													? '#fff'
													: themes.getColor(
															'blueBold1',
													  ),
											fontSize: 18,
											lineHeight: 20,
											paddingHorizontal: 15,
											paddingVertical: 5,
										}}
										textType={'BLOCK-HEADER'}
										ButtonStyle={{
											backgroundColor:
												indexPage === item.id
													? themes.getColor(
															'mainColor',
													  )
													: '#fff',
											borderTopLeftRadius:
												item.id === 0 ? 5 : 0,
											borderTopRightRadius:
												item.id === listPage.length - 1
													? 5
													: 0,
											borderWidth: 1,
											borderBottomWidth: 0,
										}}
										ButtonProps={{
											onPress: this.onChangeTab(item.id),
										}}
									/>
								);
							})}
						</Animated.View>
					}
				/>
			</Animated.View>
		);
	}
}

export default HeaderAnimation;

HeaderAnimation.defaultProps = {
	// scrollY,
	title: '',
	segmentation: '',
	listPage: [],
	basicInfo: {code: '', name: ''},
	indexPage: 0,
	listAction: [],
	onChangeTab: () => {},
	handleAction: () => {},
};

HeaderAnimation.propTypes = {
	scrollY: PropTypes.any.isRequired,
	listPage: PropTypes.array,
	basicInfo: PropTypes.object,
	indexPage: PropTypes.number,
	listAction: PropTypes.array,
	onChangeTab: PropTypes.func,
	handleAction: PropTypes.func,
	title: PropTypes.string,
	segmentation: PropTypes.string,
};
