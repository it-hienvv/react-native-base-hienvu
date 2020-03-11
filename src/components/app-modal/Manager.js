import Toast from 'react-native-simple-toast';

class ManagerLoading {
	_defaultLoading = null;
	register(_loading) {
		if (!this._defaultLoading) {
			this._defaultLoading = _loading;
		}
	}

	unRegister() {
		this._defaultLoading = null;
	}

	showLoading() {
		if (this._defaultLoading) {
			this._defaultLoading.showLoading();
		}
	}

	hideLoading() {
		if (this._defaultLoading) {
			this._defaultLoading.hideLoading();
		}
	}

	showModalWithJSX({data, backDrop}) {
		if (this._defaultLoading) {
			this._defaultLoading.showModalWithJSX({data: data, backDrop});
		}
	}

	hiddenModalWithJSX() {
		if (this._defaultLoading) {
			this._defaultLoading.hiddenModalWithJSX();
		}
	}
}

class ManagerToast {
	timeOut;
	typeTimer = {
		long: Toast.LONG,
		short: Toast.SHORT,
	};
	typePosition = {
		top: Toast.TOP,
		bottom: Toast.BOTTOM,
		center: Toast.CENTER,
	};
	constructor(_timeOut = 350) {
		this.timeOut = this._timeOut;
	}

	show({message = '', timer, position}) {
		setTimeout(() => {
			Toast.showWithGravity(
				message,
				this.typeTimer[timer] || this.typeTimer.short,
				this.typePosition[position] || this.typePosition.bottom,
			);
		}, this.timeOut);
	}
}

class ManagerSnackBarManager {
	setSnackBarRef = ref => {
		this._snackBar = ref;
	};

	showSnackBar = (text, type) => {
		this._snackBar.show(text, type);
	};
}

const AppModalManager = new ManagerLoading();
const AppToastManager = new ManagerToast();
const AppSnackBarManager = new ManagerSnackBarManager();
export {AppModalManager, AppToastManager, AppSnackBarManager};
