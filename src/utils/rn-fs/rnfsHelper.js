import RNFS from 'react-native-fs';
import {STORAGE} from 'contants/contants';

export const RNFS_PATH_DOCUMENT = {
	ATTACHMENT: 'CRM/DOCUMENT/ATTACHMENT',
};

const {LOCATION_PATH} = STORAGE;

const MkdirOptions = {
	NSURLIsExcludedFromBackupKey: true, // iOS only
};

const checkFileExists = fileName => {
	return new Promise((resolve, reject) => {
		try {
			RNFS.exists(LOCATION_PATH + '/' + fileName).then(exists => {
				resolve(exists);
			});
		} catch (error) {
			reject(error);
		}
	});
};

const deleteFiles = fileName => {
	return new Promise((resolve, reject) => {
		try {
			RNFS.unlink(LOCATION_PATH + '/' + fileName).then(() => {
				resolve(true); //is delete
			});
		} catch (error) {
			reject(error);
		}
	});
};

const copyFiles = fileName => {
	return new Promise((resolve, reject) => {
		try {
			RNFS.copyFileAssets(fileName, LOCATION_PATH + '/' + fileName).then(
				() => {
					resolve(true); //copy done
				},
			);
		} catch (error) {
			reject(error);
		}
	});
};

const createFolder = pathFolder => {
	return new Promise((resolve, reject) => {
		try {
			RNFS.mkdir(`${LOCATION_PATH}/${pathFolder}`, MkdirOptions).then(
				() => {
					resolve(true); //makedone
				},
			);
		} catch (error) {
			reject(error);
		}
	});
};

const checkFolderExists = pathFolder => {
	return new Promise((resolve, reject) => {
		try {
			RNFS.exists(`${LOCATION_PATH}/${pathFolder}`).then(exists => {
				resolve(exists);
			});
		} catch (error) {
			reject(error);
		}
	});
};

const downloadFile = ({from, to, begin, progress}) => {
	return new Promise((resolve, reject) => {
		try {
			RNFS.downloadFile({
				fromUrl: from,
				toFile: `${LOCATION_PATH}/${to}`,
				// headers: {
				// 	'Accept-Encoding': 'gzip',
				// 	Authorization: 'Basic Y3JtX3RhYmxldDpUYWJsZXQyMDE3',
				// },
				begin,
				progress,
			}).promise.then(files => {
				resolve(files); //sucess
			});
		} catch (error) {
			reject(error);
		}
	});
};

export default {
	checkFileExists,
	deleteFiles,
	copyFiles,
	createFolder,
	checkFolderExists,
	downloadFile,
	LOCATION_PATH,
};
