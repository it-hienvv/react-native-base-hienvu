import {API_CONFIG} from 'contants/contants';
function loadApiWithVersion(url) {
	return `/${API_CONFIG.API_VERSION}/${url}`;
}
function loadApiWithoutVersion(url) {
	return `/${url}`;
}
export const HAND_BOOK_URL = {
	productItem: loadApiWithVersion('sync-handbook-product-item'),
	productLine: loadApiWithVersion('sync-handbook-product-line'),
	productLineItem: loadApiWithVersion('sync-handbook-product-line-item'),
	product: loadApiWithVersion('sync-handbook-products'),
	item: loadApiWithVersion('sync-handbook-item'),
	itemPolicies: loadApiWithVersion('sync-handbook-item-policies'),
	itemNotification: loadApiWithVersion('sync-handbook-notify'),
	notifyLine: loadApiWithVersion('sync-handbook-notify-line'),
	policies: loadApiWithVersion('sync-handbook-policy'),
	policiesItem: loadApiWithVersion('sync-handbook-policy-items'),
	policiesLine: loadApiWithVersion('sync-handbook-policy-line'),
	policiesLineItem: loadApiWithVersion('sync-handbook-policy-line-items'),
};
export const ATTACHMENT_URL = {
	attachment: loadApiWithVersion('sync-attachments'),
};
export const AUTH_URL = {
	authenticate: loadApiWithoutVersion('generate-token'),
};

export const SYS_TIME = {
	maxDateTimeSys: loadApiWithVersion('sync-max-up-date'),
};

export const CUSTOMER_URL = {
	checkExistTaxCode: loadApiWithVersion('lead/exist-by-tax-code'),
	addCustomer: loadApiWithVersion('lead/create'),
	updateCustomer: loadApiWithVersion('lead/update'),
	leads: loadApiWithVersion('sync-leads'),
	accounts: loadApiWithVersion('sync-accounts'),
	leadSmeStatus: loadApiWithVersion('sync-lead-sme-status'),
	leadContacts: loadApiWithVersion('sync-lead-contacts'),
	accountContacts: loadApiWithVersion('sync-account-contacts'),
	contacts: loadApiWithVersion('sync-contacts'),
	leadRevenue: loadApiWithVersion('sync-lead-revenue'),
	campaigns: loadApiWithVersion('sync-campaigns'),
	leadRelationshipCredit: loadApiWithVersion('sync-lead-relationship-credit'),
	cicExtendsInformation: loadApiWithVersion('sync-cic-extent-info'),
	cicOtherInformation: loadApiWithVersion('sync-kh-du-no-khac'),
	leadDetail: loadApiWithoutVersion('leads'),
	changeStatus: loadApiWithVersion('lead/update-status'),
	leadAlert: loadApiWithVersion('sync-lead-alert'),
	leadBusinessInfo: loadApiWithVersion('sync-lead-business-info'),
	organization: loadApiWithVersion('sync-sys-organization'),
	employee: loadApiWithVersion('sync-employee'),
	industry: loadApiWithVersion('sync-industry'),
	industryAccount: loadApiWithVersion('sync-industry-account'),
	province: loadApiWithVersion('sync-province'),
	district: loadApiWithVersion('sync-district'),
	ward: loadApiWithVersion('sync-ward'),
	productAndService: loadApiWithVersion('customer360/syn-product-service'),
	mbRelationShip: loadApiWithVersion('customer360/syn-relationship-mb'),
	riskManagement: loadApiWithVersion('customer360/syn-risk_management'),
	userInfo: loadApiWithoutVersion('user-info'),
	generalInformation: loadApiWithVersion('customer360/syn-general-infor'),
	getAllProductType: loadApiWithVersion('customer360/get-all-product-type'),
	saveActivity: loadApiWithVersion('customer360/save-activity'),
	getActivity: loadApiWithVersion('customer360/get-activity'),
	getLeadCode: loadApiWithVersion('lead/get-lead-code'),
	exchangeRate: loadApiWithVersion('exchangerate'),
	savingInterestRate: loadApiWithVersion('savinginterestrate'),
};

export const SYS_CAT_URL = {
	sysCatType: loadApiWithVersion('sync-sys-cat-type'),
	sysCat: loadApiWithVersion('sync-sys-cat'),
};
