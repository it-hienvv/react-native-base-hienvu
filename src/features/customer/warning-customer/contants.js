import I18nTran from 'assets/language';
export const STATUS = [
	{key: 0, text: I18nTran.t('all')},
	{key: 1, text: I18nTran.t('out_of_date')},
	{key: 2, text: I18nTran.t('due_soon')},
];
export const TYPE_WARNING = [
	{key: 0, text: I18nTran.t('all')},
	{key: 1, text: I18nTran.t('lc')},
	{key: 2, text: I18nTran.t('guarantee')},
	{key: 3, text: I18nTran.t('debt')},
	{key: 4, text: I18nTran.t('saving')},
	{key: 5, text: I18nTran.t('maternity_insurance')},
	{key: 6, text: I18nTran.t('asset_revaluation')},
];
export const DATE_OF_MATURITY = [
	{key: 0, text: I18nTran.t('all')},
	{key: 1, text: I18nTran.t('left_from', {value: 7})},
	{key: 1, text: I18nTran.t('left_from', {value: 10})},
	{key: 1, text: I18nTran.t('left_from', {value: 30})},
];

export const ACTION_TYPE = {
	call: 1,
	message: 2,
	email: 3,
};

export const CUSTOMER_ACTIVE_TYPE = {
	ACTIVE: 'ACTIVE',
	INACTIVE: 'INACTIVE',
	DORMANT: 'DORMANT',
	NOT_READY: 'NOT_READY',
};

export const CUSTOMER_ACTIVE_TYPE_LIST = [
	{
		key: CUSTOMER_ACTIVE_TYPE.ACTIVE,
		text: I18nTran.t('customer_active'),
	},
	{
		key: CUSTOMER_ACTIVE_TYPE.INACTIVE,
		text: I18nTran.t('customer_inactive'),
	},
	{
		key: CUSTOMER_ACTIVE_TYPE.DORMANT,
		text: I18nTran.t('customer_dormant'),
	},
	{
		key: CUSTOMER_ACTIVE_TYPE.NOT_READY,
		text: I18nTran.t('not_ready').toUpperCase(),
	},
];
