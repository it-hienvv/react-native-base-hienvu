import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import themes from 'assets/themes';
import {AppNormalText, AppTextWithoutTranslate} from 'components/text';
import {customerApi} from 'networks/apis/extension';
import {AppAlertOnlyOkayWithOutTranslate} from 'utils/util';
import AppFlatList from 'components/flatlist/flatlist';
import I18nTran from 'assets/language';

const defaultProps = {
	listFlex: [1, 1, 1, 1],
	listHeader: [
		{id: '0', title: I18nTran.t('foreign_currency').toUpperCase()},
		{id: '1', title: I18nTran.t('buy_cash').toUpperCase()},
		{id: '2', title: I18nTran.t('buy_transfer').toUpperCase()},
		{id: '3', title: I18nTran.t('sell').toUpperCase()},
	],
};

export default class ListRate extends React.PureComponent {
	static defaultProps = defaultProps;
	constructor(props) {
		super(props);
		this.state = {
			listRate: [
				{
					id: '22365',
					soldOut: '',
					transferSale: '15.0000',
					buyInto: '31.0000',
					date: '2020-03-06 12:00:00',
					currency: 'USD',
					title: 'USD',
					transferPurchase: '99.0000',
				},
				{
					id: '22366',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'USD_20',
					title: 'USD_20',
					transferPurchase: '',
				},
				{
					id: '22367',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'USD_5',
					title: 'USD_5',
					transferPurchase: '',
				},
				{
					id: '22368',
					soldOut: '',
					transferSale: '3.0000',
					buyInto: '1.0000',
					date: '2020-03-06 12:00:00',
					currency: 'EUR',
					title: 'EUR',
					transferPurchase: '2.0000',
				},
				{
					id: '22369',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'GBP',
					title: 'GBP',
					transferPurchase: '',
				},
				{
					id: '22370',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'JPY',
					title: 'JPY',
					transferPurchase: '',
				},
				{
					id: '22371',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'HKD',
					title: 'HKD',
					transferPurchase: '',
				},
				{
					id: '22372',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'CNY',
					title: 'CNY',
					transferPurchase: '',
				},
				{
					id: '22373',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'AUD',
					title: 'AUD',
					transferPurchase: '',
				},
				{
					id: '22374',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'NZD',
					title: 'NZD',
					transferPurchase: '',
				},
				{
					id: '22375',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'CAD',
					title: 'CAD',
					transferPurchase: '',
				},
				{
					id: '22376',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'SGD',
					title: 'SGD',
					transferPurchase: '',
				},
				{
					id: '22377',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'THB',
					title: 'THB',
					transferPurchase: '',
				},
				{
					id: '22378',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'CHF',
					title: 'CHF',
					transferPurchase: '',
				},
				{
					id: '22379',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'RUB',
					title: 'RUB',
					transferPurchase: '',
				},
				{
					id: '22380',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'KRW',
					title: 'KRW',
					transferPurchase: '',
				},
				{
					id: '22381',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'LAK',
					title: 'LAK',
					transferPurchase: '',
				},
				{
					id: '22382',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'KHR',
					title: 'KHR',
					transferPurchase: '',
				},
				{
					id: '22383',
					soldOut: '',
					transferSale: '',
					buyInto: '',
					date: '2020-03-06 12:00:00',
					currency: 'SEK',
					title: 'SEK',
					transferPurchase: '',
				},
			],
			date: new Date(),
			load: true,
		};
	}

	async componentDidMount() {
		// await this._getListRate();
		this.setState({load: false});
	}

	async _getListRate() {
		let objectChange = {
			requestData: {},
			serviceHeader: {},
		};
		const response = await customerApi.exchangeRate(objectChange);
		console.log('response', response);
		if (response.code === 0) {
			if (response.data.length) {
				this.setState({
					listRate: response.data,
					date: response.timestamp,
				});
				// 	// Update realm
				// 	if (itemSuccess.leadId) {
				// 		realmHelper
				// 			.update({
				// 				collection:
				// 					realmCollectionName[APP_CONFIG.VERSION]
				// 						.CUSTOMER_SCHEMA_NAME.leads,
				// 				data: {
				// 					leadId: itemSuccess.leadId,
				// 					smeStatusId: ID_RESEARCHING,
				// 				},
				// 			})
				// 			.then(response => {})
				// 			.catch(err => {});
				// 	} else {
				// 		realmHelper
				// 			.update({
				// 				collection:
				// 					realmCollectionName[APP_CONFIG.VERSION]
				// 						.CUSTOMER_SCHEMA_NAME.accounts,
				// 				data: {
				// 					accountId: itemSuccess.accountId,
				// 					smeStatusId: ID_RESEARCHING,
				// 				},
				// 			})
				// 			.then(response => {})
				// 			.catch(err => {});
				// 	}
				// } else {
				// 	AppAlertOnlyOkay({
				// 		title: 'change_status_failed',
				// 		onPressOK: () => {},
				// 	});
			}
		} else {
			AppAlertOnlyOkayWithOutTranslate({
				title: response.message,
				onPressOK: () => {},
			});
		}
	}

	_renderHeader() {
		const {listFlex, listHeader} = this.props;
		const sum = listFlex.reduce((init, item) => (init += item), 0);
		const flexItem = listFlex.map((item, index) => {
			return {
				flex: item / sum,
			};
		});
		return (
			<View style={styles.headerFlatlist}>
				{flexItem.map((item, index) => {
					return (
						<View
							key={`${index}`}
							style={[styles.viewItemHeader, {...item}]}>
							<AppTextWithoutTranslate
								type={'BODY1'}
								IStyles={{
									color: themes.getColor('blackLight'),
									textAlign: 'center',
								}}
								text={listHeader[index].title}
							/>
						</View>
					);
				})}
			</View>
		);
	}

	_keyExtractor = (item, index) => {
		return `${item.id}`;
	};

	_textItem = () => {};

	_renderItem = ({item, index}) => {
		let {listFlex} = this.props;
		const sum = listFlex.reduce((init, item) => (init += item), 0);
		const flexItem = listFlex.map((item, index) => {
			return {
				flex: item / sum,
			};
		});
		return (
			<View style={styles.table}>
				{flexItem.map((_item, _index) => {
					return (
						<View
							key={`${index}_${_index}`}
							style={[
								{
									borderColor: themes.getColor('grayLight'),
									justifyContent: 'center',
								},
								{..._item},
							]}>
							{_index === 0 ? (
								<AppTextWithoutTranslate
									IProps={{
										numberOfLines: 1,
										ellipsizeMode: 'tail',
									}}
									IStyles={{textAlign: 'center'}}
									type={'BODY1'}
									text={item.currency || '-'}
								/>
							) : null}
							{_index === 1 ? (
								<AppTextWithoutTranslate
									IProps={{
										numberOfLines: 1,
										ellipsizeMode: 'tail',
									}}
									IStyles={{textAlign: 'center'}}
									type={'BODY1'}
									text={item.buyInto || '-'}
								/>
							) : null}
							{_index === 2 ? (
								<AppTextWithoutTranslate
									IProps={{
										numberOfLines: 1,
										ellipsizeMode: 'tail',
									}}
									IStyles={{textAlign: 'center'}}
									type={'BODY1'}
									text={item.transferPurchase || '-'}
								/>
							) : null}
							{_index === 3 ? (
								<AppTextWithoutTranslate
									IProps={{
										numberOfLines: 1,
										ellipsizeMode: 'tail',
									}}
									IStyles={{textAlign: 'center'}}
									type={'BODY1'}
									text={item.transferSale || '-'}
								/>
							) : null}
						</View>
					);
				})}
			</View>
		);
	};

	render() {
		return (
			<View style={styles.viewAll}>
				<View style={styles.header}>
					<AppNormalText
						text={'list_rate'}
						type={'H2'}
						IStyles={styles.textHeader}
					/>
				</View>
				{this.state.load ? (
					<View style={{marginTop: 30}}>
						<ActivityIndicator
							size="small"
							color={themes.getColor('blackLight')}
						/>
					</View>
				) : (
					<View style={{flex: 1, padding: 30}}>
						{this._renderHeader()}
						<AppFlatList
							data={this.state.listRate}
							keyExtractor={this._keyExtractor}
							renderItem={this._renderItem}
							initialNumToRender={10}
							removeClippedSubviews={true}
							maxToRenderPerBatch={20}
							ListFooterComponent={
								<View style={styles.paddingBottomFlatlist} />
							}
						/>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	paddingBottomFlatlist: {height: 40},
	table: {
		flexDirection: 'row',
		borderTopWidth: 0.5,
		borderBottomWidth: 0.5,
		borderColor: themes.getColor('grayLight'),
		minHeight: 50,
	},
	textHeader: {
		color: themes.getColor('mainColor'),
		paddingVertical: 20,
		paddingHorizontal: 30,
	},
	header: {
		borderBottomColor: themes.getColor('grayLight'),
		borderBottomWidth: 0.5,
	},
	viewAll: {
		height: '100%',
		width: 700,
		backgroundColor: themes.getColor('white'),
		borderTopColor: themes.getColor('blackLight'),
		borderTopWidth: 1,
		borderLeftColor: themes.getColor('grayLight'),
		borderLeftWidth: 1,
	},
	headerFlatlist: {
		flexDirection: 'row',
		backgroundColor: themes.getColor('grayLight'),
		paddingVertical: 10,
	},
});
