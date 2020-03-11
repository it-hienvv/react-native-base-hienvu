import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Panel from 'components/comp-wrapper-collapsible';
import {AppTextWithoutTranslate} from 'components/text';
import {PADDING_COMMON} from 'contants/themes/size';
import realmCollectionName from 'utils/realm/realmCollectionName';
import {APP_CONFIG} from 'contants/contants';
import RealmHelper from 'utils/realm/realmHelper';
import themes from 'assets/themes';
import {defaultText} from '../../contants';
import CallPhonePopup from './callPhonePopup';

class Basic extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			information: {
				taxCode: '',
				address: '',
				doiTuong: '',
				trangThai: '',
				branchCode: '',
				registrationDate: '',
				employeeCode: '',
				phanKhucKh: '',
				phone: '',
			},
			industry: '',
		};
	}
	componentDidMount() {
		this._onLoadData();
		this._onLoadIndustry();
	}

	async _onLoadData() {
		try {
			const {accountId} = this.props;
			const collection =
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.accounts;
			const information = await RealmHelper.queryByKey({
				collection,
				key: accountId,
			});
			console.log(information, 'information');
			if (information) this.setState({information});
		} catch (error) {}
	}

	async _onLoadIndustry() {
		try {
			const {accountId} = this.props;
			const collection =
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.industryAccount;
			const queryString = `accountId = '${accountId}'`;
			const industryAccount = await RealmHelper.queryAllByFiltering({
				collection,
				condition: queryString,
			});
			const listFilterIndustryId = industryAccount.filter(item =>
				Boolean(item.industryId),
			);
			const industryCollection =
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.industry;
			const listPromise = listFilterIndustryId.map(item =>
				RealmHelper.queryByKey({
					collection: industryCollection,
					key: item.industryId,
				}),
			);

			const result = await Promise.all(listPromise);
			let industry = '';
			result.forEach(item => (industry += `${item.industryName}, `));
			this.setState({industry});
		} catch (error) {}
	}
	_renderItemWithLabel({
		label = 'label',
		value = 'value',
		index = 0,
		popUp = false,
		style = {},
		valueStyles = {},
	}) {
		if (popUp) {
			const list = this.props.list.filter(item =>
				Boolean(item && item.phone),
			);
			return (
				list.length > 0 && (
					<View style={[{flex: 1}, {...style}]} key={`${index}`}>
						<CallPhonePopup
							data={list}
							triggerElement={
								<View
									style={[{flex: 1}, {...style}]}
									key={`${index}`}>
									<AppTextWithoutTranslate text={label} />
									<View style={[{flexDirection: 'row'}]}>
										<AppTextWithoutTranslate
											text={value}
											type={'BODY1'}
											IStyles={[
												{
													alignSelf: 'center',
												},

												{...valueStyles},
											]}
										/>
										{list.length > 0 && (
											<View
												style={{
													height: 14,
													paddingVertical: 3,
													paddingHorizontal: 5,
													borderColor: themes.getColor(
														'grayLight',
													),
													borderWidth: 1,
													borderRadius: 3,
													alignItems: 'center',
													justifyContent: 'center',
													alignSelf: 'center',
													marginHorizontal: 5,
												}}>
												<AppTextWithoutTranslate
													type={'CAPTION'}
													text={list.length}
												/>
											</View>
										)}
										{list.length > 0 && (
											<Image
												style={styles.image}
												source={themes.getImages(
													'dropDown',
												)}
											/>
										)}
									</View>
								</View>
							}
						/>
					</View>
				)
			);
		}
		return (
			<View style={[{flex: 1}, {...style}]} key={`${index}`}>
				<AppTextWithoutTranslate text={label} />
				<AppTextWithoutTranslate
					IStyles={{...valueStyles}}
					text={value}
				/>
			</View>
		);
	}
	_renderRow() {
		return (
			<View style={styles.row}>
				{this._renderLeftRow()}
				{this._renderRightRow()}
			</View>
		);
	}

	_renderLeftRow() {
		return (
			<View style={styles.leftRow}>
				<View
					style={{
						flexDirection: 'row',
					}}>
					{this._renderItemWithLabel({
						label: 'Mã số thuế',
						value: this.state.information.taxCode || defaultText,
						valueStyles: this.state.information.taxCode && {
							color: themes.getColor('mainColor'),
						},
						index: 0,
					})}
					{this._renderItemWithLabel({
						label: 'Mã RM quản lý',
						value:
							this.state.information.employeeCode || defaultText,
						index: 1,
					})}
				</View>
				<View
					style={{
						flexDirection: 'row',
						marginTop: 15,
					}}>
					{this._renderItemWithLabel({
						label: 'Địa chỉ',
						value: this.state.information.address || defaultText,
						valueStyles: this.state.information.address && {
							color: themes.getColor('mainColor'),
						},
					})}
				</View>
			</View>
		);
	}

	_renderRightRow() {
		return (
			<View style={styles.rightRow}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					{this._renderItemWithLabel({
						label: 'Mã chi nhánh quản lý',
						value: this.state.information.branchCode || defaultText,
						index: 0,
					})}
					{this._renderItemWithLabel({
						label: 'Ngày đăng ký TLDN',
						value:
							this.state.information.registrationDate ||
							defaultText,
						index: 1,
					})}
					{this._renderItemWithLabel({
						label: 'Phân khúc',
						value: this.state.information.phanKhucKh || defaultText,
						index: 2,
					})}
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 15,
					}}>
					{this._renderItemWithLabel({
						label: 'Điện thoại công ty',
						value: this.state.information.phone || defaultText,
						index: 0,
						valueStyles: this.state.information.phone && {
							color: themes.getColor('mainColor'),
						},
						popUp: true,
					})}
					{this._renderItemWithLabel({
						label: 'Trạng thái',
						value: this.state.information.trangThai || defaultText,
						index: 1,
					})}
					{this._renderItemWithLabel({
						label: 'Đối tượng',
						value: this.state.information.doiTuong || defaultText,
						index: 2,
					})}
				</View>
			</View>
		);
	}

	render() {
		const {container} = this.props;
		const {industry} = this.state;
		return (
			<Panel line style={[styles.panel, {...container}]} title={'Cơ bản'}>
				{this._renderRow()}
				<View style={styles.label}>
					{this._renderItemWithLabel({
						style: {flex: undefined},
						label: 'Ngành nghề kinh doanh',
						value: industry || defaultText,
					})}
				</View>
			</Panel>
		);
	}
}

export default Basic;

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		width: '100%',
		paddingHorizontal: PADDING_COMMON,
		marginTop: PADDING_COMMON,
	},
	leftRow: {
		width: '50%',
	},
	rightRow: {
		width: '50%',
	},
	label: {
		width: '100%',
		paddingHorizontal: PADDING_COMMON,
		marginTop: PADDING_COMMON,
	},
	panel: {
		paddingHorizontal: 0,
		marginHorizontal: PADDING_COMMON,
		marginTop: PADDING_COMMON,
	},
	image: {
		width: 12,
		height: 12,
		alignSelf: 'center',
	},
});
