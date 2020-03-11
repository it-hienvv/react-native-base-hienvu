import Realm from 'realm';
import SchemaVersion from './schema';
import CollectionNameVersion from './realmCollectionName';
import {REALM_CONFIG, SECRET_KEY, APP_CONFIG} from 'contants/contants';
import {isIos} from 'utils/util';
import hashHelper from 'utils/hash/hashHelper';

const Schema = SchemaVersion[APP_CONFIG.VERSION];
const CollectionName = CollectionNameVersion[APP_CONFIG.VERSION];
const schema = Object.values(Schema).reduce((target, current) => {
	target = [...target, ...Object.values(current)];
	return target;
}, []);

const version = REALM_CONFIG.VERSION;
const realmDbName = REALM_CONFIG.REALM_DB_NAME;
const pathIos = `${Realm.defaultPath.substring(
	0,
	Realm.defaultPath.lastIndexOf('Documents/'),
)}Library/Realm/${realmDbName}`;
const pathAndroid = `${realmDbName}`;

const encryptionKey = hashHelper.encryptionKeyRealmDb({
	message: SECRET_KEY.REALM_DB_SECRET_KEY.MESSAGE,
});

const _realmConfig = {
	path: isIos ? pathIos : pathAndroid,
	schema,
	schemaVersion: version,
	encryptionKey,
	migration: (oldRealm, newRealm) => {
		RealmC.migrationRealm(oldRealm, newRealm);
	},
};

class RealmC {
	listCollectionName = [];
	realmConfig = {};
	constructor(_realmConfig, _listCollectionName) {
		this.listCollectionName = _listCollectionName;
		this.realmConfig = _realmConfig;
	}

	queryAllRealm = ({collection}) =>
		new Promise((resolve, reject) => {
			try {
				Realm.open(this.realmConfig).then(realm => {
					const result = realm.objects(collection);
					resolve(result);
				});
			} catch (error) {
				reject(error);
			}
		});

	queryAllByFiltering = ({collection, condition}) =>
		new Promise((resolve, reject) => {
			try {
				Realm.open(this.realmConfig).then(realm => {
					const result = realm
						.objects(collection)
						.filtered(condition);
					resolve(result);
				});
			} catch (error) {
				reject(error);
			}
		});

	queryByKey = ({collection, key}) =>
		new Promise((resolve, reject) => {
			try {
				Realm.open(this.realmConfig).then(realm => {
					const result = realm.objectForPrimaryKey(collection, key);
					resolve(result);
				});
			} catch (error) {
				reject(error);
			}
		});

	insertRealm = ({collection, data = {}}) =>
		new Promise((resolve, reject) => {
			try {
				Realm.open(this.realmConfig).then(realm => {
					realm.write(() => {
						try {
							realm.create(collection, data, true);
							resolve(data);
						} catch (error) {
							console.log(error, '111111');
							reject(error);
						}
					});
				});
			} catch (error) {
				console.log(error, '222222');
				reject(error);
			}
		});

	insertBatchRealm = ({collection, data = []}) =>
		new Promise((resolve, reject) => {
			try {
				Realm.open(this.realmConfig).then(realm => {
					realm.write(() => {
						for (let item of data) {
							realm.create(collection, item, true);
						}
					});
					resolve(data);
				});
			} catch (error) {
				console.log(error, '222222');
				reject(error);
			}
		});

	deleteByKey = ({collection, key}) =>
		new Promise((resolve, reject) => {
			try {
				Realm.open(this.realmConfig).then(realm => {
					realm.write(() => {
						const result = realm.objectForPrimaryKey(
							collection,
							key,
						);
						realm.delete(result);
						resolve(result);
					});
				});
			} catch (error) {
				reject(error);
			}
		});

	deleteAllCollection = ({collection}) =>
		new Promise((resolve, reject) => {
			try {
				Realm.open(this.realmConfig).then(realm => {
					realm.write(() => {
						const result = realm.objects(collection);
						realm.deleteAll(collection);
						resolve(result);
					});
				});
			} catch (error) {
				reject(error);
			}
		});

	update = ({collection, data}) =>
		new Promise((resolve, reject) => {
			try {
				Realm.open(this.realmConfig).then(realm => {
					realm.write(() => {
						try {
							realm.create(collection, data, true);
							resolve(data);
						} catch (error) {}
					});
				});
			} catch (error) {
				reject(error);
			}
		});

	deleteAllRealm = () =>
		new Promise((resolve, reject) => {
			try {
				Realm.open(this.realmConfig).then(newRealm => {
					newRealm.write(() => {
						newRealm.deleteAll();
						resolve(true);
					});
				});
			} catch (error) {
				reject(error);
			}
		});

	getCollectionLength = ({collection}) =>
		new Promise((resolve, reject) => {
			try {
				Realm.open(this.realmConfig).then(realm => {
					const result = realm.objects(collection);
					resolve(result.length);
				});
			} catch (error) {
				reject(error);
			}
		});

	static migrationRealm = (oldRealm, newRealm) => {
		const listCollectionName = Object.values(CollectionName).reduce(
			(target, current) => {
				target = [...target, ...Object.values(current)];
				return target;
			},
			[],
		);
		listCollectionName.forEach((item, index) => {
			const oldObjects = oldRealm.objects(item);
			const newObjects = newRealm.objects(item);
			oldObjects.forEach((el, i) => {
				newObjects[i] = {...newObjects, ...el};
			});
		});
	};

	onUpgradeRealm = ({newRealmConfig}) =>
		new Promise((resolve, reject) => {
			try {
				Realm.open(this.realmConfig).then(oldRealm => {
					oldRealm.close();
					if (oldRealm.isClosed) {
						Realm.open(newRealmConfig).then(response => {
							resolve(response);
						});
					}
				});
			} catch (error) {
				reject(error);
			}
		});
}

const listCollectionName = Object.values(CollectionName).reduce(
	(target, current) => {
		target = [...target, ...Object.values(current)];
		return target;
	},
	[],
);

const RealmHelper = new RealmC(_realmConfig, listCollectionName);

// RealmHelper.deleteAllRealm();

export default RealmHelper;
