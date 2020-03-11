import OpenFileViewer from 'react-native-file-viewer';
import {STORAGE} from 'contants/contants';

const openFile = path => {
	return new Promise((resolve, reject) => {
		try {
			OpenFileViewer.open(STORAGE.LOCATION_PATH + '/' + path).then(() => {
				resolve(true);
			});
		} catch (error) {
			reject(error);
		}
	});
};

export default fileViewerHelper = {
	openFile,
};
