import React from 'react';
import {StyleSheet, View} from 'react-native';
import CreditRatings from '../control-risk/creditRatings';
import Cic from '../control-risk/cic';
import ModelWarning from '../control-risk/modelWarning';
import ManagementFlowMoney from '../control-risk/managementFlowMoney';
import realmCollectionName from 'utils/realm/realmCollectionName';
import {APP_CONFIG} from 'contants/contants';
import RealmHelper from 'utils/realm/realmHelper';
import Loading from 'components/loading';
import {CONTROL_RISK} from  '../../contants';

const {
	warningObjLabel,
	managementFlowMoneyObjLabel,
	managementObjSuffix,
	flowMoneyListFind,
	convertValue
} = CONTROL_RISK;

class ControlRisk extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			credit: [],
			cic: [],
			modelWarning: [],
			managementFlowMoney: [],
			modelWarningHeaders: [],
			modelWarningRows: [],
			loading: true,
		};
	}
	componentDidMount() {
		setTimeout(() => {
			this._onLoadData();
		}, 1000);
	}

	async _onLoadData() {
		try {
			const {accountId} = this.props;
			const collection =
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.riskManagement;
			const data = await RealmHelper.queryByKey({
				collection,
				key: accountId,
			});
			if (data?.riskManagementResponse) {
				const credit = [
					{
						label:
							data?.riskManagementResponse?.accountRanking
								?.rank ?? '',
						value:
							data?.riskManagementResponse?.accountRanking
								?.soNamQhMb ?? '0',
					},
				];
				const cicInfoDto =
					data?.riskManagementResponse?.cicInfoDto ?? null;
				const cic = cicInfoDto
					? [
						{
							value1: `Nhóm ${cicInfoDto.nhomNoMax} `,
							value2: convertValue(
								cicInfoDto.tongDunoTraiphieu
									? parseFloat(
										cicInfoDto.tongDunoTraiphieu /
													1000000,
										  )
									: cicInfoDto.tongDunoTraiphieu,
								'tr.đ',
								true,
							),
							value3: convertValue(
								cicInfoDto.camKet
									? parseFloat(
										cicInfoDto.camKet /
													1000000,
										  )
									: cicInfoDto.camKet,
								'tr.đ',
								true,
							),
							value4: cicInfoDto.soLuongTctd,
							value5: cicInfoDto.thoiDiemTraCic,
						},
					  ]
					: [];
				const lstQuanTriRuiRoResponse =
					data?.riskManagementResponse?.lstQuanTriRuiRoResponse ?? [];
				if (lstQuanTriRuiRoResponse.length >= 2) {
					const warning = Object.keys(
						lstQuanTriRuiRoResponse[0].canhBaoDto,
					).map(item => {
						return {
							[lstQuanTriRuiRoResponse[0].year]: convertValue(
								lstQuanTriRuiRoResponse[0].canhBaoDto[item],
							),
							[lstQuanTriRuiRoResponse[1].year]: convertValue(
								lstQuanTriRuiRoResponse[1].canhBaoDto[item],
							),
							label: warningObjLabel[item],
						};
					});
					[warning[0], warning[1]] = [warning[1], warning[0]];
					const modelWarningHeaders = [
						'Tên',
						`Năm ${lstQuanTriRuiRoResponse[1].year}`,
						`Năm ${lstQuanTriRuiRoResponse[0].year}(Tháng ${lstQuanTriRuiRoResponse[0].month})`,
					];
					const modelWarningRows = [
						'label',
						`${lstQuanTriRuiRoResponse[1].year}`,
						`${lstQuanTriRuiRoResponse[0].year}`,
					];
					const modelWarning = [...warning];

					const flowMoney = Object.keys(
						lstQuanTriRuiRoResponse[0].dongTienDto,
					).map(item => {
						return {
							[lstQuanTriRuiRoResponse[0].year]: convertValue(
								lstQuanTriRuiRoResponse[0].dongTienDto[item],
								managementObjSuffix[item],
							),
							[lstQuanTriRuiRoResponse[1].year]: convertValue(
								lstQuanTriRuiRoResponse[1].dongTienDto[item],
								managementObjSuffix[item],
							),
							label: managementFlowMoneyObjLabel[item],
							keys: item,
						};
					});
					flowMoneyListFind.forEach((item, index) => {
						if (index === 0) {
							flowMoney.splice(0, 0, {
								key: true,
								label: item.label,
							});
						} else {
							const _index = flowMoney.findIndex(
								ele => ele.keys === item.key,
							);
							flowMoney.splice(_index, 0, {
								key: true,
								label: item.label,
							});
						}
					});
					const managementFlowMoney = flowMoney.filter(item =>
						Boolean(item.label),
					);
					this.setState({
						credit,
						cic,
						modelWarning,
						managementFlowMoney,
						modelWarningRows,
						modelWarningHeaders,
						loading: false,
					});
				} else {
					this.setState({
						credit,
						cic,
						loading: false,
					});
				}
			} else {
				this.setState({loading: false});
			}
		} catch (error) {
			this.setState({loading: false});
		}
	}
	render() {
		const {
			credit,
			cic,
			modelWarning,
			managementFlowMoney,
			modelWarningHeaders,
			modelWarningRows,
			loading,
		} = this.state;
		return loading ? (
			<Loading />
		) : (
			<View style={styles.container}>
				<CreditRatings
					data={credit}
					rows={['label', 'value']}
					headers={['Xếp hạng tín dụng', 'Số năm quan hệ với MB']}
				/>
				<Cic
					data={cic}
					rows={['value1', 'value2', 'value3', 'value4', 'value5']}
					headers={[
						'Nhóm nợ max theo CIC',
						'Tổng dư nợ và trái phiếu',
						'Cam kết ngoại bảng',
						'Tổng SL TCTD có dư nợ vay',
						'Thời điểm tra CIC',
					]}
					listFlex={[1, 1, 1, 1, 1]}
				/>
				<ModelWarning
					data={modelWarning}
					rows={modelWarningRows}
					headers={modelWarningHeaders}
				/>
				<ManagementFlowMoney
					data={managementFlowMoney}
					rows={modelWarningRows}
					headers={modelWarningHeaders}
				/>
			</View>
		);
	}
}
export default ControlRisk;
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerStyles: {
		paddingHorizontal: 0,
		paddingTop: 0,
	},
});
