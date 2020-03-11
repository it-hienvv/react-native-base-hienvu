import ApiClient from 'networks/apis/base';
import realmHelper from 'utils/realm/realmHelper';
import {LIST_SYS, OPTION} from './config';
import {getCurrentTimeMilliseconds} from 'utils/date-times';
import realmCollectionName from 'utils/realm/realmCollectionName';
import {SYS_CONFIG, APP_CONFIG} from 'contants/contants';

class AppSys {
	list = [];
	timeSys = 0;
	userName = '';
	minDate = null;
	constructor(_list, _timeSys) {
		this.list = _list;
		this.timeSys = _timeSys;
	}

	async loadTimeSysStart() {
		const collection =
			realmCollectionName[APP_CONFIG.VERSION].USER_SCHEMA_NAME.account;
		const accountName = this.userName;
		const user = await realmHelper.queryByKey({
			collection,
			key: accountName,
		});
		if (user && user.timeSys) {
			this.timeSys = Number(user.timeSys);
		} else {
			this.timeSys = 0;
		}
		const currentTime = getCurrentTimeMilliseconds();
		return currentTime >= this.timeSys;
	}

	async setTimesSys() {
		const currentTime = getCurrentTimeMilliseconds();
		const time = currentTime + SYS_CONFIG.timeSys;
		this.timeSys = time;
		const collection =
			realmCollectionName[APP_CONFIG.VERSION].USER_SCHEMA_NAME.account;
		const accountName = this.userName;
		const user = await realmHelper.queryByKey({
			collection,
			key: accountName,
		});
		if (user) {
			const result = {
				accountName: user.accountName,
				refreshToken: user.refreshToken,
				timeSys: `${time}`,
			};
			await realmHelper.insertRealm({collection, data: result});
		}
		return this.timeSys;
	}

	setUserName({name}) {
		this.userName = name;
	}

	async appSysListItem({callbackSetState, isManualSys = false}) {
		const isNeedSys = await this.loadTimeSysStart();
		if (isManualSys || isNeedSys) {
			const filterList = this.list.filter(item => item.sys);
			let count = 0;
			const length = filterList.length;
			callbackSetState && callbackSetState({count, total: length});
			for (let i = 0; i < length; i++) {
				const option = {
					...OPTION,
				};
				if (this.timeSys > 0) {
					const logCollectionData = await realmHelper.queryByKey({
						collection:
							realmCollectionName[APP_CONFIG.VERSION]
								.SYS_SCHEMA_NAME.logCollection,
						key: filterList[i].collection,
					});
					if (logCollectionData) {
						this.minDate = logCollectionData.maxTime;
					}
				}
				const data = await this.sysOneItem({
					itemSys: filterList[i],
					option,
				});
				console.log('sysOneItem data', data);
				if (data) {
					count += 1;
					callbackSetState &&
						callbackSetState({count, total: length});
				} else {
					count += 1;
					callbackSetState &&
						callbackSetState({count, total: length});
				}
			}
			await this.setTimesSys();
			return true;
		} else {
			return false;
		}
	}

	async sysOneItem({itemSys, option}) {
		console.log('sysOneItem', itemSys, option);
		try {
			const response = await ApiClient.fetch(
				itemSys.url,
				this.timeSys > 0
					? {
						...itemSys.params,
						...option,
						minDate: this.minDate,
					  }
					: {
						...itemSys.params,
						...option,
					  },
				(handleError = false),
				itemSys.timeout,
			);
			console.log(response, 'response');
			if (
				response &&
				response.list &&
				response.list.length === option.pageSize
			) {
				option = {
					...option,
					firstResult: option.firstResult + option.pageSize,
				};
				if (this.timeSys > 0) {
					this.minDate = response.maxTime;
				}
				await this.sysOneItem({itemSys, option});
			}
			if (response && response.list) {
				realmHelper.update({
					collection:
						realmCollectionName[APP_CONFIG.VERSION].SYS_SCHEMA_NAME
							.logCollection,
					data: {
						collectionName: itemSys.collection,
						maxTime: response.maxTime,
					},
				});
				// const listPromise = response.list.map(item => {
				// 	return realmHelper.insertRealm({
				// 		collection: itemSys.collection,
				// 		data: item,
				// 	});
				// });
				// const values = await Promise.all(listPromise);
				const values = realmHelper.insertBatchRealm({
					collection: itemSys.collection,
					data: response.list,
				});
				return values;
			}
			return false;
		} catch (error) {
			return false;
		}
	}
}

export default new AppSys(LIST_SYS, 0);
