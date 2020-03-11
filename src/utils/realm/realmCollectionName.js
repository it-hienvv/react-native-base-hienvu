import {APP_CONFIG} from 'contants/contants';

const DashboardSchemaName = {
	todo: 'Todo',
	workCalendar: 'WorkCalendar',
};
const HANDBOOK_SCHEMA_NAME = {
	productItem: 'HandbookProductItem',
	productLine: 'HandbookProductLine',
	product: 'HandbookProduct',
	productLineItem: 'HandbookProductLineItem',
	item: 'HandbookItem',
	itemPolicies: 'HandbookItemPolicy',
	notify: 'HandbookNotify',
	notifyLine: 'HandbookNotifyLine',
	policies: 'HandbookPolicy',
	policiesItem: 'HandbookPolicyItem',
	policiesLine: 'HandbookPolicyLine',
	policiesLineItem: 'HandbookPolicyLineItem',
};

const USER_SCHEMA_NAME = {
	account: 'Account',
};

const ATTACHMENT_SCHEMA_NAME = {
	attachment: 'Attachment',
};

const SYS_SCHEMA_NAME = {
	logCollection: 'LogCollection',
};

const CUSTOMER_SCHEMA_NAME = {
	leads: 'Leads',
	accounts: 'Accounts',
	leadSmeStatus: 'LeadSmeStatus',
	contacts: 'Contacts',
	leadContacts: 'LeadContacts',
	accountContacts: 'AccountContacts',
	leadRelationshipCredit: 'LeadRelationshipCredit',
	revenueLead: 'RevenueLead',
	campaigns: 'Campaigns',
	leadAlert: 'LeadAlert',
	leadBusinessInfo: 'LeadBusinessInfo',
	cicExtendsInformation: 'cicExtendsInformation',
	cicOtherInformation: 'cicOtherInformation',
	organization: 'Organization',
	employee: 'Employee',
	industry: 'Industry',
	industryAccount: 'IndustryAccount',
	provinces: 'Provinces',
	wards: 'Wards',
	districts: 'Districts',
	productAndService: 'ProductAndService',
	mbRelationShip: 'MbRelationShip',
	riskManagement: 'RiskManagement',
	subInformationRelationShip: 'SubInformationRelationShip',
	kdoanhResponse: 'kdoanhResponse',
	thuNhapChiPhiResponse: 'thuNhapChiPhiResponse',
	currentUserInfo: 'CurrentUserInfo',
	accountRanking: 'AccountRanking',
	cicInformation: 'CicInformation',
	quanLyDongTien: 'QuanLyDongTien',
	listQuanLyDongTien: 'ListQuanLyDongTien',
	canhBao: 'CanhBao',
	listCanhBao: 'ListCanhBao',
	riskManagementResponse: 'RiskManagementResponse',
	productDetail: 'ProductDetail',
	itemProductService: 'ItemProductService',
	productService: 'ProductService',
	financeItem: 'FinanceItem',
	finance: 'Finance',
	productType: 'ProductType',
	digitalBankItem: 'DigitalBankItem',
	exchangeRate: 'ExchangeRate',
	savingInterestRate: 'SavingInterestRate',
};

const SYS_CAT_SCHEMA_NAME = {
	sysCatType: 'SysCatType',
	sysCat: 'SysCat',
};

const VERSION = '0.0.1';
export default RealmCollectionName = {
	[VERSION]: {
		DashboardSchemaName,
		HANDBOOK_SCHEMA_NAME,
		ATTACHMENT_SCHEMA_NAME,
		USER_SCHEMA_NAME,
		SYS_SCHEMA_NAME,
		CUSTOMER_SCHEMA_NAME,
		SYS_CAT_SCHEMA_NAME,
	},
};
