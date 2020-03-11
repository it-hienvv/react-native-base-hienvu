import React from 'react';
import {StyleSheet, View} from 'react-native';
import themes from 'assets/themes';
import I18nTran from 'assets/language';
import {AppTextWithoutTranslate} from 'components/text';
import {customerApi} from 'networks/apis/extension';
import AppFlatList from 'components/flatlist/flatlist';

const defaultProps = {
	listFlex: [1, 1, 1],
	listHeader: [
		{id: '0', title: I18nTran.t('period').toUpperCase()},
		{id: '1', title: I18nTran.t('interest_rate').toUpperCase()},
		{id: '2', title: I18nTran.t('note1').toUpperCase()},
	],
};

export default class DepositRate extends React.PureComponent {
	static defaultProps = defaultProps;
	constructor(props) {
		super(props);
		this.state = {
			listSavingInterestRate: [
				{
					id: '753',
					note: '',
					interestRate: '11.00',
					distribute: '01 tháng',
					title: 'Lãi suất tiền gửi USD',
				},
				{
					id: '754',
					note: '',
					interestRate: '0.50',
					distribute: '02 tháng',
					title: 'Lãi suất tiền gửi USD',
				},
				{
					id: '755',
					note: '',
					interestRate: '5.40',
					distribute: '03 tháng',
					title: 'Lãi suất tiền gửi USD',
				},
				{
					id: '756',
					note: '',
					interestRate: '1.50',
					distribute: '06 tháng',
					title: 'Lãi suất tiền gửi USD',
				},
				{
					id: '757',
					note: '',
					interestRate: '1.20',
					distribute: '09 tháng',
					title: 'Lãi suất tiền gửi USD',
				},
				{
					id: '758',
					note: '',
					interestRate: '',
					distribute: '12 tháng',
					title: 'Lãi suất tiền gửi USD',
				},
				{
					id: '759',
					note: '',
					interestRate: '0.00',
					distribute: '24 tháng',
					title: 'Lãi suất tiền gửi USD',
				},
				{
					id: '760',
					note: '',
					interestRate: '0.00',
					distribute: 'Không kỳ hạn',
					title: 'Lãi suất tiền gửi USD',
				},
				{
					id: '761',
					note: '',
					interestRate: '',
					distribute: '001 tuần',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '762',
					note: '',
					interestRate: '1.00',
					distribute: '002 tuần',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '763',
					note: '',
					interestRate: '1.00',
					distribute: '003 tuần',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '764',
					note: '',
					interestRate: '4.90',
					distribute: '01 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '765',
					note: '',
					interestRate: '5.30',
					distribute: '02 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '766',
					note: '',
					interestRate: '5.30',
					distribute: '03 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '767',
					note: '',
					interestRate: '5.30',
					distribute: '04 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '768',
					note: '',
					interestRate: '5.40',
					distribute: '05 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '769',
					note: '',
					interestRate: '6.50',
					distribute: '06 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '770',
					note: '',
					interestRate: '6.50',
					distribute: '07 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '771',
					note: '',
					interestRate: '6.50',
					distribute: '08 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '772',
					note: '',
					interestRate: '6.50',
					distribute: '09 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '773',
					note: '',
					interestRate: '6.60',
					distribute: '10 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '774',
					note: '',
					interestRate: '6.60',
					distribute: '11 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '775',
					note: '',
					interestRate: '7.20',
					distribute: '12 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '776',
					note: '',
					interestRate: '7.20',
					distribute: '13 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '777',
					note: '',
					interestRate: '7.40',
					distribute: '18 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '778',
					note: '',
					interestRate: '7.70',
					distribute: '24 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '779',
					note: '',
					interestRate: '7.50',
					distribute: '36 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '780',
					note: '',
					interestRate: '7.00',
					distribute: '48 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '781',
					note: '',
					interestRate: '7.00',
					distribute: '60 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '782',
					note: '',
					interestRate: '0.30',
					distribute: 'Không kỳ hạn',
					title: 'Lãi suất tiền gửi VND',
				},
				{
					id: '783',
					note: '',
					interestRate: '7.30',
					distribute: '15 tháng',
					title: 'Lãi suất tiền gửi VND',
				},
			],
			date: new Date(),
			load: true,
		};
	}

	async componentDidMount() {
		// await this._getSavingInterestRate();
		this.setState({load: false});
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

	async _getSavingInterestRate() {
		let objectChange = {
			requestData: {},
			serviceHeader: {},
		};
		const response = await customerApi.savingInterestRate(objectChange);
		console.log('response', response);
		if (response.code === 0) {
			if (response.data.length) {
				this.setState({
					listSavingInterestRate: response.data,
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

	_keyExtractor = (item, index) => {
		return `${item.id}`;
	};

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
									IStyles={{
										textAlign: 'center',
									}}
									type={'BODY1'}
									text={item.distribute || '-'}
								/>
							) : null}
							{_index === 1 ? (
								<AppTextWithoutTranslate
									IProps={{
										numberOfLines: 1,
										ellipsizeMode: 'tail',
									}}
									IStyles={{
										textAlign: 'center',
									}}
									type={'BODY1'}
									text={item.interestRate || '-'}
								/>
							) : null}
							{_index === 2 ? (
								<AppTextWithoutTranslate
									IProps={{
										numberOfLines: 1,
										ellipsizeMode: 'tail',
									}}
									IStyles={{
										textAlign: 'center',
									}}
									type={'BODY1'}
									text={item.note || '-'}
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
			<View style={{flex: 1}}>
				{this._renderHeader()}
				<AppFlatList
					data={this.state.listSavingInterestRate}
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
		);
	}
}

const styles = StyleSheet.create({
	headerFlatlist: {
		flexDirection: 'row',
		backgroundColor: themes.getColor('grayLight'),
		paddingVertical: 10,
	},
	table: {
		flexDirection: 'row',
		borderTopWidth: 0.5,
		borderBottomWidth: 0.5,
		borderColor: themes.getColor('grayLight'),
		minHeight: 50,
	},
});
