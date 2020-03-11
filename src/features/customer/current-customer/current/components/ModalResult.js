import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {WIDTH_SCREEN} from 'utils/util';
import {AppTextWithoutTranslate} from 'components/text';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {AppModalManager} from 'components/app-modal/Manager';
import I18nTran from 'assets/language';
import {PADDING_COMMON} from 'contants/themes/size';
import _ from 'lodash';
import {STATUS} from '../contants';
import {MenuProvider} from 'react-native-popup-menu';
import AppFlatList from 'components/flatlist/flatlist';
class ModalResult extends React.PureComponent {
	_onCancel = () => {
		AppModalManager.hiddenModalWithJSX();
	};

	_renderListFailed() {
		return (
			<AppFlatList
				data={this.props.listFailed}
				renderItem={this._renderItem}
				keyExtractor={this._keyExtractor}
			/>
		);
	}

	_renderItem = ({item, index}) => {
		return (
			<View style={styles.viewItem}>
				<AppImages
					ButtonProps={{onPress: this._onCancel}}
					uri={themes.getImages('iconDelete')}
					ImageStyle={styles.cancelImage}
				/>
				<AppTextWithoutTranslate
					type={'BODY1'}
					text={`${item.id} . `}
					IStyles={styles.textItem}
					IProps={{
						numberOfLines: 1,
						ellipsizeMode: 'tail',
					}}>
					<AppTextWithoutTranslate type={'BODY1'} text={item.name} />
				</AppTextWithoutTranslate>
			</View>
		);
	};

	_keyExtractor = (item, index) => `${index}`;

	render() {
		let filteredItem = _.filter(STATUS, ['key', this.props.smeStatusId]);
		let status = filteredItem.length && filteredItem[0].text;
		let numberFailed = this.props.listFailed.length;
		return (
			<View style={styles.wrapper}>
				<MenuProvider style={{flex: 1}}>
					<View style={styles.viewHeader}>
						<AppTextWithoutTranslate
							type={'H2'}
							text={I18nTran.t('result_change_status')}
							IStyles={{
								fontWeight: '600',
							}}
						/>
						<AppImages
							ButtonProps={{onPress: this._onCancel}}
							uri={themes.getImages('cancelModal')}
							ImageStyle={styles.cancelImage}
						/>
					</View>
					<View style={styles.viewBody}>
						<AppTextWithoutTranslate
							type={'BODY'}
							text={I18nTran.t('change_success_for')}>
							<AppTextWithoutTranslate
								type={'BODY'}
								text={this.props.numberSuccess}
							/>
							<AppTextWithoutTranslate
								type={'BODY'}
								text={I18nTran.t('customer_to')}
							/>
							<AppTextWithoutTranslate
								type={'BODY'}
								text={status}
							/>
							<AppTextWithoutTranslate
								type={'BODY'}
								text={I18nTran.t('and')}
							/>
							<AppTextWithoutTranslate
								type={'BODY'}
								text={numberFailed}
							/>
							<AppTextWithoutTranslate
								type={'BODY'}
								text={I18nTran.t('customer_failed')}
							/>
						</AppTextWithoutTranslate>
						<View style={{marginTop: PADDING_COMMON, height: 160}}>
							{this._renderListFailed()}
						</View>
					</View>
				</MenuProvider>
			</View>
		);
	}
}

export default ModalResult;

const styles = StyleSheet.create({
	textItem: {
		color: themes.getColor('mainColor'),
		textAlignVertical: 'center',
		marginLeft: 10,
	},
	viewItem: {marginTop: 15, flexDirection: 'row'},
	wrapper: {
		width: WIDTH_SCREEN / 2,
		minHeight: 320,
		backgroundColor: themes.getColor('white'),
		borderRadius: 10,
	},
	viewHeader: {
		width: '100%',
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
		paddingLeft: 30,
		paddingRight: 15,
	},
	viewBody: {
		paddingHorizontal: 25,
		paddingVertical: PADDING_COMMON,
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	cancelImage: {
		width: 25,
		height: 25,
	},
});
