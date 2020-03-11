import React from 'react';
import {StyleSheet, View} from 'react-native';
import BusinessSituation from '../mb-relationship/businessSituation';
import {APP_CONFIG} from 'contants/contants';
import realmCollectionName from 'utils/realm/realmCollectionName';
import RealmHelper from 'utils/realm/realmHelper';
import CustomerExploitationSituation from '../mb-relationship/customerExploitationSituation';
import SalaryFee from '../mb-relationship/salaryFee';
import Loading from 'components/loading';
import {MB_RELATIONSHIP} from  '../../contants';

const {
	objLabel,
	objSuffix,
	objLabelSalaryFee,
	objSalaryFeeSuffix,
	businessListFind,
	currentListFind,
	convertList,
	convertValue
} = MB_RELATIONSHIP;

class MbRelationShip extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			business: [],
			currentCustomer: [],
			headers: [],
			rows: [],
			salaryFee: [],
			loading: true,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this._loadData();
		}, 1000);
	}

	async _loadData() {
		try {
			const collection =
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.mbRelationShip;
			const {accountId} = this.props;
			const response = await RealmHelper.queryByKey({
				collection,
				key: accountId,
			});
			if (response) {
				const data = Object.keys(objLabel).map(item => {
					return {
						[response.infoRelationshipMb[0].year]: convertValue(
							response.infoRelationshipMb[0].kdoanhResponse[item],
							objSuffix[item],
						),
						[response.infoRelationshipMb[1].year]: convertValue(
							response.infoRelationshipMb[1].kdoanhResponse[item],
							objSuffix[item],
						),
						label: objLabel[item],
						keys: item,
					};
				});
				const thuNhapChiPhiResponse = {
					...response.infoRelationshipMb[0].thuNhapChiPhiResponse,
				};
				const thuNhapChiPhiResponse1 = {
					...response.infoRelationshipMb[1].thuNhapChiPhiResponse,
				};
				const resultThuNhapChiPhiResponse = convertList(
					thuNhapChiPhiResponse,
				);

				const resultThuNhapChiPhiResponse1 = convertList(
					thuNhapChiPhiResponse1,
				);

				const customList = {
					rowDiv: true,
					list: [],
					label: 'Thu dịch vụ',
					key: true,
				};
				const salaryFee = Object.keys(resultThuNhapChiPhiResponse).map(
					item => {
						if (
							item === 'dvBaolanhE1' ||
							item === 'dvTtqtE2' ||
							item === 'doanhThuKhac'
						) {
							customList.list.push({
								[response.infoRelationshipMb[0]
									.year]: convertValue(
									resultThuNhapChiPhiResponse[item],
									objSalaryFeeSuffix[item],
								),
								[response.infoRelationshipMb[1]
									.year]: convertValue(
									resultThuNhapChiPhiResponse1[item],
									objSalaryFeeSuffix[item],
								),
								label: objLabelSalaryFee[item],
								keys: item,
							});
							return {};
						}
						return {
							[response.infoRelationshipMb[0].year]: convertValue(
								resultThuNhapChiPhiResponse[item],
								objSalaryFeeSuffix[item],
							),
							[response.infoRelationshipMb[1].year]: convertValue(
								resultThuNhapChiPhiResponse1[item],
								objSalaryFeeSuffix[item],
							),
							label: objLabelSalaryFee[item],
							keys: item,
						};
					},
				);
				const headers = [
					'Tên',
					`Năm ${response.infoRelationshipMb[1].year}`,
					`Năm ${response.infoRelationshipMb[0].year} (Tháng ${response.infoRelationshipMb[0].month})`,
				];
				const rows = [
					'label',
					`${response.infoRelationshipMb[1].year}`,
					`${response.infoRelationshipMb[0].year}`,
				];

				const business = data.filter(
					item => !currentListFind.find(ele => ele.key === item.keys),
				);
				const currentCustomer = data.filter(item =>
					currentListFind.find(ele => ele.key === item.keys),
				);

				businessListFind.forEach(item => {
					const index = business.findIndex(
						ele => ele.keys === item.key,
					);
					business.splice(index <= 1 ? index : index + 1, 0, {
						key: true,
						label: item.label,
					});
				});
				const _salaryFee = salaryFee.filter(item =>
					Boolean(item.label),
				);
				_salaryFee.splice(-2, 0, customList);
				this.setState({
					business: business.filter(item => Boolean(item.label)),
					currentCustomer,
					headers,
					rows,
					salaryFee: _salaryFee,
					loading: false,
				});
			} else {
				this.setState({loading: false});
			}
		} catch (error) {
			this.setState({loading: false});
		}
	}

	render() {
		const {
			business,
			currentCustomer,
			headers,
			rows,
			salaryFee,
			loading,
		} = this.state;
		return loading ? (
			<Loading />
		) : (
			<View style={styles.container}>
				<BusinessSituation
					data={business}
					headers={headers}
					rows={rows}
				/>
				<CustomerExploitationSituation
					data={currentCustomer}
					headers={headers}
					rows={rows}
				/>

				<SalaryFee data={salaryFee} headers={headers} rows={rows} />
			</View>
		);
	}
}
export default MbRelationShip;
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerStyles: {
		paddingHorizontal: 0,
		paddingTop: 0,
	},
});
