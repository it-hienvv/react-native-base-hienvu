import ApiClient from '../base';
import {AUTH_URL, CUSTOMER_URL} from '../url';
import {Buffer} from 'buffer';
import {grantType} from 'contants/contants';

export const authApi = {
	login: async ({username, password}) => {
		try {
			let encryptedCredentials = new Buffer(
				username + ':' + password,
			).toString('base64');
			let res = await ApiClient.fetchHeaderCustom(
				AUTH_URL.authenticate,
				{
					Authorization: `Basic ${encryptedCredentials}`,
				},
				{grantType: grantType.PASSWORD_GRANT},
				true,
				true,
				true,
			);
			return res;
		} catch (error) {
			return error;
		}
	},
};

export const customerApi = {
	checkExistTaxCode: async ({taxCode}) => {
		try {
			let res = await ApiClient.fetch(CUSTOMER_URL.checkExistTaxCode, {
				taxCode: taxCode,
			});
			return res;
		} catch (error) {
			return error;
		}
	},
	addCustomer: async obj => {
		try {
			let res = await ApiClient.post(CUSTOMER_URL.addCustomer, obj);
			return res;
		} catch (error) {
			return error;
		}
	},
	updateCustomer: async obj => {
		try {
			let res = await ApiClient.post(CUSTOMER_URL.updateCustomer, obj);
			return res;
		} catch (error) {
			return error;
		}
	},
	changeStatus: async obj => {
		try {
			let res = await ApiClient.post(
				CUSTOMER_URL.changeStatus,
				obj,
				false,
			);
			return res;
		} catch (error) {
			return error;
		}
	},
	savingInterestRate: async obj => {
		try {
			let res = await ApiClient.post(
				CUSTOMER_URL.savingInterestRate,
				obj,
				false,
			);
			return res;
		} catch (error) {
			return error;
		}
	},
	exchangeRate: async obj => {
		try {
			let res = await ApiClient.post(CUSTOMER_URL.exchangeRate, obj);
			return res;
		} catch (error) {
			return error;
		}
	},
	getLeadDetail: async id => {
		try {
			let res = await ApiClient.fetch(`${CUSTOMER_URL.leadDetail}/${id}`);
			return res;
		} catch (error) {
			return error;
		}
	},
	saveActivity: async obj => {
		try {
			let res = await ApiClient.post(
				CUSTOMER_URL.saveActivity,
				obj,
				true,
			);
			return res;
		} catch (error) {
			return error;
		}
	},

	getActivity: async obj => {
		// {accountId, leadId}
		try {
			let res = await ApiClient.fetch(
				CUSTOMER_URL.getActivity,
				obj,
				true,
			);
			return res;
		} catch (error) {
			return error;
		}
	},

	getLeadCode: async () => {
		try {
			let res = await ApiClient.fetch(CUSTOMER_URL.getLeadCode);
			return res;
		} catch (error) {
			return error;
		}
	},
};
