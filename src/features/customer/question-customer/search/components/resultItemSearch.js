import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {SHALLOW_STYLE} from 'contants/themes';
import {AppTextWithoutTranslate} from 'components/text';
import themes from 'assets/themes';
import {AppButton} from 'components/button';
import {mainNavigationService} from 'routers/managerNavigator';
import {DETAIL_CUSTOMER_SEARCH} from 'routers/screenNames';

class ResultItemSearch extends React.PureComponent {
	_onPress = () => {
		mainNavigationService.navigate(DETAIL_CUSTOMER_SEARCH, {
			key: this.props.item,
		});
	};

	_renderDescription() {
		return (
			<View style={styles.descriptionView}>
				<AppTextWithoutTranslate
					text={'Công ty trách nhiệm hữu hạn tập đoàn VinGroup'}
					type={'H1'}
				/>
				<View
					style={{
						flexDirection: 'row',
						marginVertical: PADDING_COMMON,
					}}>
					<View
						style={{
							paddingVertical: 2,
							paddingHorizontal: 8,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: themes.getColor('yellow'),
							borderRadius: 5,
							marginRight: PADDING_COMMON,
						}}>
						<AppTextWithoutTranslate
							IStyles={{color: 'white'}}
							text={'SIÊU NHỎ'}
						/>
					</View>
					<Text style={{alignSelf: 'center'}}>
						<AppTextWithoutTranslate
							text={
								'MST: 09418233 | Ngành nghề: Ăn uống | Chi nhánh quản lý: Hội sở'
							}
						/>
					</Text>
				</View>
			</View>
		);
	}

	_renderButton() {
		return (
			<View>
				<AppButton
					ButtonProps={{onPress: this._onPress}}
					textType={'H1'}
					TextStyle={styles.detailText}
					ButtonStyle={styles.button}
					text={'show_detail'}
				/>
			</View>
		);
	}
	render() {
		return (
			<View
				style={[
					styles.container,
					this.props.container instanceof Array
						? [...this.props.container]
						: {...this.props.container},
				]}>
				{this._renderDescription()}
				{this._renderButton()}
			</View>
		);
	}
}

export default ResultItemSearch;

const styles = StyleSheet.create({
	container: {
		...SHALLOW_STYLE,
		padding: PADDING_COMMON,
		flexDirection: 'row',
		marginTop: PADDING_COMMON,
		borderRadius: 8,
		// marginBottom: 100
	},
	descriptionView: {
		flex: 1,
		// paddingVertical: PADDING_COMMON,
	},
	button: {
		backgroundColor: themes.getColor('mainColor'),
		borderRadius: 5,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	detailText: {
		color: themes.getColor('white'),
	},
});
