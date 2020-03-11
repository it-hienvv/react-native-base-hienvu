import React from 'react';
import {
	View,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
} from 'react-native';
import _ from 'lodash';
import {AppTextWithoutTranslate, AppNormalText} from 'components/text';
import {AppImages} from 'components/image';
import I18nTran from 'assets/language';
import themes from 'assets/themes';
import realmHelper from 'utils/realm/realmHelper';
import realmCollectionName from 'utils/realm/realmCollectionName';
import {AppAlertOnlyOkay, isIos} from 'utils/util';
import {
	SEGMENTATION,
	CUSTOMER_OBJECT,
	CUSTOMER_ACTIVE_TYPE_LIST,
	CUSTOMER_ACTIVE_TYPE,
} from '../../contants';
import {APP_CONFIG} from 'contants/contants';
import styles from './styles';
import AccordionList from 'components/accordion-list';
import ConfirmViewAfterCall from 'components/confirm-after-call';
import {removeAccent} from 'utils/util';
import WarningCustomerListItem from '../warning-customer-list-item/index';
import Header from '../header';
const defaultProps = {
	listFlex: [3, 1, 1, 1, 1, 1],
	listHeader: [
		{id: '0', title: I18nTran.t('customer')},
		{id: '1', title: I18nTran.t('type')},
		{id: '2', title: I18nTran.t('content')},
		{id: '3', title: I18nTran.t('expiration_date')},
		{id: '4', title: I18nTran.t('sla')},
		{id: '5', title: I18nTran.t('branch')},
	],
};

class WarningCustomerList extends React.Component {
	static defaultProps = defaultProps;
	constructor(props) {
		super(props);
		this.searchTimeout = null;
	}
	state = {
		textSearch: '',
		numberColumn: 0,
		data: [],
		segmentation: 0,
		customerType: 0,
		career: 0,
		chanel: 0,
		campaign: 0,
		revenue: 0,
		leads: [],
		accounts: [],
		campaigns: [],
		listSysCatType: [],
		listSysCat: [],
		total: 0,
		employees: [],
		employee: 0,
		isShowButttonApplyAndClear: false,
		listContacts: [],
		listLeadContacts: [],
		accountContacts: [],
		sortAz: true,
		customerObject: 0,
		organization: 0,
		listOrganization: [],
		userInfo: {},
		activeSections: [
			CUSTOMER_ACTIVE_TYPE.ACTIVE,
			CUSTOMER_ACTIVE_TYPE.INACTIVE,
			CUSTOMER_ACTIVE_TYPE.DORMANT,
			CUSTOMER_ACTIVE_TYPE.NOT_READY,
		],
		showAfterCall: false,
		afterCallItem: {},
		afterCallType: 0,
		loading: false,

		isGroupByCustomer: false,
		status: 0,
		typeWarning: 0,
		dateOfMaturity: 0,
	};

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.onDoneSys &&
			prevProps.onDoneSys !== this.props.onDoneSys
		) {
			this._onLoadData();
		}
	}

	componentDidMount = async () => {
		// AppModalManager.showLoading();
		this.setState({loading: true});
		setTimeout(() => {
			this._onLoadData();
		}, 300);
	};

	separateData = bigList => {
		let data = CUSTOMER_ACTIVE_TYPE_LIST.map((item, index) => ({
			title: item.text,
			id: item.key,
			data: [],
		}));
		bigList.forEach((item, index) => {
			const status = item.trangThai ? item.trangThai.toUpperCase() : null;
			if (!status) {
				data[3].data.push(item);
			} else if (status == CUSTOMER_ACTIVE_TYPE.DORMANT) {
				data[2].data.push(item);
			} else if (status == CUSTOMER_ACTIVE_TYPE.ACTIVE) {
				data[0].data.push(item);
			} else if (status == CUSTOMER_ACTIVE_TYPE.INACTIVE) {
				data[1].data.push(item);
			}
		});
		return data;
	};

	_onLoadData = async () => {
		// Promise.all([this._getLeads(),]).then(values => {
		//     let data = this.separateData([...values[0], ...values[1]]);
		//     this.setState({
		//         leads: values[0],
		//         accounts: values[1],
		//         total: values[0].length,
		//         data,
		//     });
		// });
		Promise.all([
			this._getSysCatType(),
			this._getSysCat(),
			this._getCampaigns(),
			this._getEmployee(),
			this._getListContacts(),
			this._getListLeadContacts(),
			this._getListAccountContacts(),
			this._getListOrganization(),
			this._getAccounts(),
			this._getUserInfo(),
		]).then(values => {
			const employeeResult = values[3];
			const organizationResult = values[7];
			const userInfo = values[9] && values[9][0] ? values[9][0] : {};
			console.log('defaultEmployee', defaultEmployee);
			let campaigns = [{key: 0, text: I18nTran.t('all')}];

			let employees =
				userInfo && userInfo.employeeType == 'CBQL'
					? [{key: 0, text: I18nTran.t('all')}]
					: [];
			let listOrganization = [{key: 0, text: I18nTran.t('all')}];
			values[2].forEach(element => {
				campaigns.push({key: element.campaignsId, text: element.name});
			});

			employeeResult.forEach(element => {
				employees.push({
					key: element.employeeId,
					text: `${element.code} - ${element.fullName}`,
					fullName: element.fullName,
					employeeId: element.employeeId,
					code: element.code,
				});
			});
			const defaultEmployee =
				(userInfo && userInfo.employeeType == 'CBQL') || !employees[0]
					? 0
					: employees[0].key;
			organizationResult.forEach(element => {
				listOrganization.push({
					key: element.code,
					text: `${element.code} - ${element.name}`,
					code: element.code,
					name: element.name,
				});
			});

			const listAcccountMapping = values[8].map(item => {
				const accountItem = {...item};
				if (accountItem.branchCode) {
					const branchInfo = listOrganization.find(
						item => item.code === accountItem.branchCode,
					);
					if (branchInfo) {
						accountItem.branchName = branchInfo.name;
					}
				}
				if (accountItem.employeeCode) {
					const employeeInfo = employees.find(
						item => item.code === accountItem.employeeCode,
					);
					if (employeeInfo) {
						accountItem.employeeName = employeeInfo.fullName;
					}
				}
				return accountItem;
			});
			const data = this.separateData(listAcccountMapping);
			this.setState({
				listSysCatType: values[0],
				listSysCat: values[1],
				employees,
				campaigns,
				listContacts: values[4],
				listLeadContacts: values[5],
				accountContacts: values[6],
				listOrganization,
				data,
				accounts: listAcccountMapping,
				loading: false,
				userInfo,
				employee: defaultEmployee,
			});
			// AppModalManager.hideLoading();
		});
	};

	_getUserInfo = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.currentUserInfo,
			});
		} catch (error) {}
	};

	_getEmployee = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.employee,
			});
		} catch (error) {}
	};

	_getLeads = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.leads,
			});
		} catch (error) {
			AppAlertOnlyOkay({title: 'load_data_error'});
		}
	};

	_getCampaigns = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.campaigns,
			});
		} catch (error) {}
	};

	_getAccounts = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.accounts,
			});
		} catch (error) {
			AppAlertOnlyOkay({title: 'load_data_error'});
		}
	};

	_getSysCatType = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].SYS_CAT_SCHEMA_NAME
						.sysCatType,
			});
		} catch (error) {
			AppAlertOnlyOkay({title: 'load_data_error'});
		}
	};

	_getSysCat = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].SYS_CAT_SCHEMA_NAME
						.sysCat,
			});
		} catch (error) {
			AppAlertOnlyOkay({title: 'load_data_error'});
		}
	};

	_getCampaigns = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.campaigns,
			});
		} catch (error) {
			AppAlertOnlyOkay({title: 'load_data_error'});
		}
	};

	_getListLeadContacts = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.leadContacts,
			});
		} catch (error) {}
	};

	_getListAccountContacts = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.accountContacts,
			});
		} catch (error) {}
	};

	_getListContacts = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.contacts,
			});
		} catch (error) {}
	};

	_getListOrganization = async () => {
		try {
			return await realmHelper.queryAllRealm({
				collection:
					realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
						.organization,
			});
		} catch (error) {}
	};

	_onSelectStatus = item => {
		this.setState({status: item.key});
	};

	_onSelectTypeWarning = item => {
		this.setState({typeWarning: item.key});
	};

	_onSelectDateOfMaturity = item => {
		this.setState({dateOfMaturity: item.key});
	};

	_onChangeValueGroupByCustomer = () => {
		this.setState({isGroupByCustomer: !this.state.isGroupByCustomer});
	};

	_renderTitle() {
		return (
			<View style={styles.viewTitle}>
				<View style={{flexDirection: 'row'}}>
					<AppImages
						ButtonProps={{disabled: true}}
						ImageStyle={styles.imageSearch}
						uri={themes.getImages('search2')}
					/>
					<TextInput // Need use text input for management
						style={[
							styles.textSearch,
							{...themes.getFonts('BODY1')},
						]}
						placeholder={I18nTran.t('search')}
						onChangeText={text => {
							this.searchTimeout &&
								clearTimeout(this.searchTimeout);
							this.searchTimeout = setTimeout(() => {
								this.setState(
									{textSearch: text},
									this._onApplyFilter,
								);
							}, 1500);
						}}
					/>
				</View>
				<Header
					status={this.state.status}
					typeWarning={this.state.typeWarning}
					dateOfMaturity={this.state.dateOfMaturity}
					isGroupByCustomer={this.state.isGroupByCustomer}
					onSelectStatus={this._onSelectStatus}
					onSelectTypeWarning={this._onSelectTypeWarning}
					onSelectDateOfMaturity={this._onSelectDateOfMaturity}
					onChangeValueGroupByCustomer={
						this._onChangeValueGroupByCustomer
					}
				/>
			</View>
		);
	}

	_renderHeader() {
		const {listFlex, listHeader} = this.props;
		const sum = listFlex.reduce((init, item) => (init += item), 0);
		const flexItem = listFlex.map((item, index) => {
			return {
				flex: item / sum,
				borderRightWidth: index === 0 ? 0.5 : 0,
			};
		});
		return (
			<View style={styles.header}>
				{flexItem.map((item, index) => {
					return (
						<View
							key={`${index}`}
							style={[styles.viewItemHeader, {...item}]}>
							<AppTextWithoutTranslate
								type={'BODY1'}
								IStyles={{
									color: themes.getColor('blackLight'),
									textAlignVertical: 'center',
									marginTop: isIos ? 10 : 0,
								}}
								text={listHeader[index].title}
							/>
							{index === 0 && (
								<AppImages
									ButtonProps={{onPress: this._onSort}}
									ImageStyle={styles.dropUp}
									uri={themes.getImages('dropUp')}
								/>
							)}
						</View>
					);
				})}
			</View>
		);
	}

	_onAfterCall = (item, type) => {
		console.log('_onAfterCall list', item, type);
		// this.setState({
		// 	showAfterCall: true,
		// 	afterCallItem: item,
		// 	afterCallType: type,
		// });
	};

	_keyExtractor = (item, index) => {
		return `${item.taxCode}_${index}`;
	};

	_renderItem = (item, index, sectionId, sectionIndex) => {
		return (
			<WarningCustomerListItem
				item={item}
				index={index}
				sectionId={sectionId}
				sectionIndex={sectionIndex}
				listFlex={this.props.listFlex}
				listSysCatType={this.state.listSysCatType}
				listSysCat={this.state.listSysCat}
				listContacts={this.state.listContacts}
				accountContacts={this.state.accountContacts}
				onAfterCall={this._onAfterCall}
			/>
		);
	};

	_renderSectionHeader = (section, index, isActive) => {
		return (
			<View style={styles.headerSection}>
				<AppImages
					ButtonProps={{disabled: true}}
					ImageStyle={styles.imageMinus}
					uri={
						!isActive
							? themes.getImages('plus2')
							: themes.getImages('minus')
					}
				/>
				<AppTextWithoutTranslate
					text={`${section.title} (${section.data.length})`}
					type={'BODY1'}
					IStyles={styles.textSectionHeaderStyle}
				/>
			</View>
		);
	};

	_updateSections = activeSections => {
		// console.log('_updateSections', activeSections);
		this.setState({activeSections});
	};

	_keyExtractor = item => (item.accountId || item.id) + '';

	_renderSectionList = () => {
		return (
			<AccordionList
				data={this.state.data}
				renderHeader={this._renderSectionHeader}
				renderItem={this._renderItem}
				activeSections={this.state.activeSections}
				onChange={this._updateSections}
				keyExtractor={this._keyExtractor}
				ListFooterComponent={<View style={{height: 50}} />}
			/>
		);
	};

	_renderButtonFilterAndClear = () => {
		return (
			<View style={styles.viewRowButtonFilterClear}>
				<TouchableOpacity
					onPress={this._onApplyFilter}
					style={styles.buttonFilter}>
					<AppImages
						ButtonProps={{
							disabled: true,
						}}
						ImageStyle={styles.image}
						uri={themes.getImages('checkedWhite')}
					/>
					<AppNormalText
						text={'apply_filter'}
						type={'BODY'}
						IStyles={{
							fontWeight: '700',
							color: themes.getColor('white'),
						}}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={this._onClearFilter}
					style={styles.buttonClearFilter}>
					<AppImages
						ButtonProps={{
							disabled: true,
						}}
						ImageStyle={styles.image}
						uri={themes.getImages('cancelModal')}
					/>
					<AppNormalText
						text={'cancel_filter'}
						type={'BODY'}
						IStyles={{fontWeight: '700'}}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	_onApplyFilter = () => {
		try {
			const {
				segmentation,
				textSearch,
				employee,
				customerObject,
				organization,
			} = this.state;
			const dataFilter = [...this.state.accounts];
			const normalizeTextSearch = removeAccent(
				textSearch.trim(),
			).toLowerCase();
			let accounts = _.filter(dataFilter, function(o) {
				return (
					(normalizeTextSearch
						? _.includes(
								o.name
									? removeAccent(o.name.trim()).toLowerCase()
									: '',
								normalizeTextSearch,
						  ) ||
						  _.includes(o.code, normalizeTextSearch) ||
						  _.includes(
								o.phone
									? o.phone.replace(/\.|\(|\)|\-|\+/g, '')
									: '',
								normalizeTextSearch,
						  ) ||
						  _.includes(
								o.taxCode
									? o.taxCode.replace(/\.|\(|\)|\-|\+/g, '')
									: '',
								normalizeTextSearch,
						  )
						: true) &&
					(segmentation
						? o.phanKhucKh === SEGMENTATION[segmentation].text ||
						  (!o.phanKhucKh && segmentation == 4)
						: true) &&
					(employee ? o.employeeId === employee : true) &&
					(customerObject
						? o.doiTuong === CUSTOMER_OBJECT[customerObject].text
						: true) &&
					(organization ? o.branchCode == organization : true)
				);
			});
			let data = this.separateData(accounts);
			this.setState({data, total: accounts.length});
		} catch (error) {
			console.log(error);
		}
	};

	_onSort = () => {
		let dataTemp = this.state.data;
		if (this.state.sortAz) {
			dataTemp.forEach(element => {
				element.data.sort(function(a, b) {
					return a.code.localeCompare(b.code);
				});
			});
		} else {
			dataTemp.forEach(element => {
				element.data.sort(function(a, b) {
					return b.code.localeCompare(a.code);
				});
			});
		}
		this.setState({
			data: [
				{
					...dataTemp[0],
					data: [...dataTemp[0].data],
				},
				{...dataTemp[1], data: [...dataTemp[1].data]},
				{...dataTemp[2], data: [...dataTemp[2].data]},
			],
			sortAz: !this.state.sortAz,
		});
	};

	_onClearFilter = () => {
		this.setState(
			{
				isShowButttonApplyAndClear: false,
			},
			() => {
				const data = this.separateData([...this.state.accounts]);

				const defaultEmployee =
					(this.state.userInfo &&
						this.state.userInfo.employeeType == 'CBQL') ||
					!this.state.employees[0]
						? 0
						: this.state.employees[0].key;
				this.setState({
					data,
					employee: defaultEmployee,
					segmentation: 0,
					customerType: 0,
					customerObject: 0,
					organization: 0,
				});
			},
		);
	};

	_onCloseView = () => {
		this.setState({showAfterCall: false});
	};

	_onChangeOneItem = () => {
		console.log('_onChangeOneItem');
	};

	_renderViewAfterCall = () => {
		return this.state.showAfterCall ? (
			<ConfirmViewAfterCall
				item={this.state.afterCallItem}
				type={this.state.afterCallType}
				onClose={this._onCloseView}
				onChangeOneItem={this._onChangeOneItem}
			/>
		) : null;
	};

	render() {
		return (
			<View style={styles.container}>
				{!!this.state.loading ? (
					<ActivityIndicator
						size="small"
						color={themes.getColor('blackLight')}
					/>
				) : (
					<View style={{flex: 1}}>
						{this._renderTitle()}
						{this.state.isShowButttonApplyAndClear
							? this._renderButtonFilterAndClear()
							: null}
						{this._renderHeader()}
						{this._renderSectionList()}
						{this._renderViewAfterCall()}
					</View>
				)}
			</View>
		);
	}
}

export default WarningCustomerList;
