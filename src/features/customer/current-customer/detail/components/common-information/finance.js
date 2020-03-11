import React from 'react';
import {StyleSheet, View} from 'react-native';
import Panel from 'components/comp-wrapper-collapsible';
import {PADDING_COMMON} from 'contants/themes/size';
import TableDetail from '../table/Table';
import I18nTran from 'assets/language';
import {APP_CONFIG} from 'contants/contants';
import RealmHelper from 'utils/realm/realmHelper';
import {getCurrentYear, subTractYear} from 'utils/date-times';
import realmCollectionName from 'utils/realm/realmCollectionName';
import {appFormatMoney} from 'utils/util';

const convertValue = (value, label) => {
	let string = '';
	if (value !== null && value !== undefined) {
		if (label) {
			string += `${appFormatMoney(value)} ${label}`;
		} else {
			string += `${value}`;
		}
	}
	return string;
};

class Finance extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			headers: [],
			rows: [],
		};
	}

	componentDidMount() {
		this._onLoadData();
	}

	async _onLoadData() {
		const {accountId} = this.props;
		const collection =
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.finance;
		const finance = await RealmHelper.queryByKey({
			collection,
			key: accountId,
		});
		if (finance?.thongTinTaiChinh) {
			const thongTinTaiChinh = finance.thongTinTaiChinh ?? [];
			let data = thongTinTaiChinh.map(item => {
				const _item = {};
				if (item && item.idChiTieu === '999') {
					Object.keys(item).forEach((ii, i) => {
						if (ii === 'tenChiTieu') {
							_item[ii] = convertValue(item[ii]);
						} else {
							_item[ii] = convertValue(item[ii], '$');
						}
					});
				} else {
					Object.keys(item).forEach((ii, i) => {
						if (ii === 'tenChiTieu') {
							_item[ii] = convertValue(item[ii]);
						} else {
							_item[ii] = convertValue(item[ii], 'tr.đ');
						}
					});
				}
				return _item;
			});
			const currentYear = getCurrentYear();
			const beforeYear = subTractYear(1);
			const headers = ['Tên', `Năm ${beforeYear}`, `Năm ${currentYear}`];
			const rows = ['tenChiTieu', 'namN1', 'namNow'];
			this.setState({data, headers, rows});
		}
	}
	render() {
		const {data, headers, rows} = this.state;
		return (
			<Panel title={I18nTran.t('finance')} style={styles.container}>
				<TableDetail
					listType={['text', 'text', 'text']}
					listBorderRight={[1, 0, 0]}
					styleProps={{marginHorizontal: 0}}
					data={data}
					headers={headers}
					rows={rows}
					type={0}
				/>
			</Panel>
		);
	}
}

export default Finance;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 0,
		marginHorizontal: PADDING_COMMON,
		flex: 1,
		marginTop: PADDING_COMMON,
		paddingBottom: 0,
	},
});
