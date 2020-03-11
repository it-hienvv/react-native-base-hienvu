import {
	HAND_BOOK_URL,
	ATTACHMENT_URL,
	CUSTOMER_URL,
	SYS_CAT_URL,
} from 'networks/apis/url';
import realmCollectionName from 'utils/realm/realmCollectionName';
import {APP_CONFIG} from 'contants/contants';

export const OPTION = {
	pageSize: 1000,
	firstResult: 0,
	maxUpdateTime: true,
	count: true,
};
export const LIST_SYS = [
	{
		url: HAND_BOOK_URL.productItem,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.productItem,
		params: {active: true},
		sys: true, // bật tắt đồng bộ,
	},
	{
		url: HAND_BOOK_URL.productLine,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.productLine,
		params: {active: true},
		sys: true,
	},
	{
		url: HAND_BOOK_URL.product,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.product,
		params: {active: true},
		sys: true,
	},
	{
		url: HAND_BOOK_URL.productLineItem,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.productLineItem,
		params: {active: true},
		sys: true,
	},
	{
		url: HAND_BOOK_URL.item,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME.item,
		params: {active: true},
		sys: true,
	},
	{
		url: HAND_BOOK_URL.itemPolicies,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.itemPolicies,
		params: {active: true},
		sys: true,
	},
	{
		url: HAND_BOOK_URL.itemNotification,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME.notify,
		params: {active: true},
		sys: true,
	},
	{
		url: HAND_BOOK_URL.notifyLine,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.notifyLine,
		params: {active: true},
		sys: true,
	},
	{
		url: HAND_BOOK_URL.policies,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.policies,
		params: {active: true},
		sys: true,
	},
	{
		url: HAND_BOOK_URL.policiesItem,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.policiesItem,
		params: {active: true},
		sys: true,
	},
	{
		url: HAND_BOOK_URL.policiesLine,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.policiesLine,
		params: {active: true},
		sys: true,
	},
	{
		url: HAND_BOOK_URL.policiesLineItem,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.policiesLineItem,
		params: {active: true},
		sys: true,
	},
	{
		url: ATTACHMENT_URL.attachment,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].ATTACHMENT_SCHEMA_NAME
				.attachment,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.leads,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME.leads,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.accounts,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.accounts,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.leadSmeStatus,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.leadSmeStatus,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.leadContacts,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.leadContacts,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.accountContacts,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.accountContacts,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.contacts,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.contacts,
		params: {active: true},
		sys: true,
		timeout: 120000,
	},
	{
		url: CUSTOMER_URL.leadRevenue,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.revenueLead,
		params: {active: true},
		sys: true,
	},
	{
		url: SYS_CAT_URL.sysCatType,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].SYS_CAT_SCHEMA_NAME
				.sysCatType,
		params: {active: true},
		sys: true,
	},
	{
		url: SYS_CAT_URL.sysCat,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].SYS_CAT_SCHEMA_NAME.sysCat,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.campaigns,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.campaigns,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.leadAlert,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.leadAlert,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.leadBusinessInfo,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.leadBusinessInfo,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.leadRelationshipCredit,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.leadRelationshipCredit,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.cicExtendsInformation,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.cicExtendsInformation,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.cicOtherInformation,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.cicOtherInformation,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.employee,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.employee,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.industry,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.industry,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.industryAccount,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.industryAccount,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.organization,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.organization,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.province,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.provinces,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.district,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.districts,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.ward,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME.wards,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.mbRelationShip,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.mbRelationShip,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.userInfo,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.currentUserInfo,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.riskManagement,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.riskManagement,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.productAndService,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.productService,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.generalInformation,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.finance,
		params: {active: true},
		sys: true,
	},
	{
		url: CUSTOMER_URL.getAllProductType,
		collection:
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.productType,
		params: {active: true},
		sys: true,
	},
];
