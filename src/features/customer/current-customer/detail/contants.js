import {appFormatMoney} from 'utils/util';
import themes from 'assets/themes';

const defaultText = '--';

const CONTROL_RISK = {
	warningObjLabel: {
		capdoCn: 'Cấp độ mô hình cảnh báo sớm chi nhánh',
		nhomno2: 'Nhóm nợ XHTD theo MB',
		sl: 'Tần suất QH max 12 tháng',
		snqh: 'Ngày QH max 12 tháng',
	},

	managementFlowMoneyObjLabel: {
		qtdmDstvCk: 'Doanh số tiền về chuyển khoản',
		qtdmDstvTm: 'Doanh số tiền về tiền mặt',
		tyLeDsoChuyenTien:
			'Tỷ lệ doanh số chuyển tiền tại MB/ tổng doanh thu khách hàng',
		qtdmDsgnNh: 'DSGN ngắn hạn',
		qtdmDsgnTdh: 'DSGN trung dài hạn',
		tyLeTienVe: 'Tỷ lệ Tổng doanh số tiền về / DSGN ngắn hạn',
	},

	managementObjSuffix: {
		qtdmDstvCk: 'tr.đ',
		qtdmDstvTm: 'tr.đ',
		tyLeDsoChuyenTien: '%',
		qtdmDsgnNh: 'tr.đ',
		qtdmDsgnTdh: 'tr.đ',
		tyLeTienVe: '%',
	},

	flowMoneyListFind: [
		{key: 'tyLeDsoChuyenTien', label: '1. Doanh số về tiền'},
		{key: 'qtdmDsgnNh', label: '2. Doanh số dải ngân'},
	],

	convertValue: (value, label, decimal) => {
		let string = '';
		if (value !== null && value !== undefined) {
			if (label) {
				string += `${appFormatMoney(value, decimal)} ${label}`;
			} else {
				string += `${value}`;
			}
		}
		return string;
	},
};

const MB_RELATIONSHIP = {
	objLabel: {
		dunoHanmucTd: 'Hạn mức tín dụng',
		dunoDunoThBq: 'Dư nợ trung-dài hạn bình quân',
		dunoDunoNhBq: 'Dư nợ ngắn hạn bình quân',
		dunoNimTdhBq: 'Nim cho vay TDH bình quân',
		dunoNimNhBq: 'Nim cho vay Ngắn hạn BQ',
		dunoTytrong: 'Tỷ lệ khai thác Hạn mức TD',
		hdvCkhBq: 'Dư tiền gửi CKH bình quân',
		hdvCasaBq: 'Dư Casa Bình quân',
		blHanmucBaolanh: 'Hạn mức bảo lãnh',
		blTytrongKhaithac: 'Tỷ lệ khai thác hạn mức bảo lãnh',
		blDsBaolanhBq: 'Doanh số bảo lãnh bình quân/tháng',
		tttmDsTtqt: 'Doanh số TTQT',
		kqthThiphanVitien: 'Thị phần ví tiền tại MB',
		kqthSlsp: 'Số lượng sản phẩm bắt buộc bán',
		ttWalletShare: 'Wallet share',
		tyTrong: 'Tỷ trọng DS TTQT MB/DS XNK theo TCHQ',
	},

	objSuffix: {
		dunoHanmucTd: 'tr.đ',
		dunoDunoThBq: 'tr.đ',
		dunoDunoNhBq: 'tr.đ',
		dunoNimTdhBq: '%',
		dunoNimNhBq: '%',
		dunoTytrong: '%',
		hdvCkhBq: 'tr.đ',
		hdvCasaBq: 'tr.đ',
		blHanmucBaolanh: 'tr.đ',
		blTytrongKhaithac: '%',
		blDsBaolanhBq: 'tr.đ',
		tttmDsTtqt: 'tr.đ',
		kqthThiphanVitien: 'tr.đ',
		kqthSlsp: '',
		qtdmDstvTm: 'Doanh số tiền về tiền mặt',
		qtdmDstvCk: 'Doanh số tiền về chuyển khoản',
		ttWalletShare: '%',
		tyTrong: '%',
	},

	objLabelSalaryFee: {
		dtttrrI: 'Doanh thu thuần trước rủi ro',
		dttsrrI: 'Doanh thu thuần sau rủi ro',
		thuTuUngDung: 'Thu từ tín dụng',
		chilaiKhC: 'Thu từ huy động vốn',
		doanhThuKhac: 'Thu khác',
		fxNteE14: 'Thu kinh doanh ngoại tệ',
		thuBatThuong: 'Thu bất thường',
		dvBaolanhE1: 'Thu bảo lãnh',
		dvTtqtE2: 'Thu TTQT',
		toi: 'TOI',
	},
	objSalaryFeeSuffix: {
		dtttrrI: 'tr.đ',
		dttsrrI: 'tr.đ',
		thuTuUngDung: 'tr.đ',
		chilaiKhC: 'tr.đ',
		doanhThuKhac: 'tr.đ',
		fxNteE14: 'tr.đ',
		thuBatThuong: 'tr.đ',
		dvBaolanhE1: 'tr.đ',
		dvTtqtE2: 'tr.đ',
		toi: '%',
	},

	businessListFind: [
		{key: 'dunoHanmucTd', label: '1. Dư nợ'},
		{key: 'dunoTytrong', label: '2. Huy động'},
		{key: 'hdvCasaBq', label: '3. Bảo lãnh'},
		{key: 'blDsBaolanhBq', label: '4. Tài trợ thương mại'},
	],

	currentListFind: [
		{key: 'kqthThiphanVitien', label: ''},
		{key: 'kqthSlsp', label: ''},
		{key: 'ttWalletShare', label: ''},
	],

	convertList: thuNhapChiPhiResponse => {
		const resultThuNhapChiPhiResponse = {
			toi: thuNhapChiPhiResponse.toi,
			dtttrrI: thuNhapChiPhiResponse.dtttrrI,
			dttsrrI: thuNhapChiPhiResponse.dttsrrI,
			thuTuUngDung: thuNhapChiPhiResponse.thuTuUngDung,
			chilaiKhC:
				thuNhapChiPhiResponse.chilaiKhC +
				thuNhapChiPhiResponse.thulaiFtpD,
			dvBaolanhE1: thuNhapChiPhiResponse.dvBaolanhE1,
			dvTtqtE2: thuNhapChiPhiResponse.dvTtqtE2,
			doanhThuKhac:
				thuNhapChiPhiResponse.dvTttnE3 +
				thuNhapChiPhiResponse.dvTheE4 +
				thuNhapChiPhiResponse.dvUtbhckE5 +
				thuNhapChiPhiResponse.dvTuvanE6 +
				thuNhapChiPhiResponse.dvNganquyE7 +
				thuNhapChiPhiResponse.dvGiuhoE8 +
				thuNhapChiPhiResponse.dvKieuhoiE9 +
				thuNhapChiPhiResponse.dvNhdtE10 +
				thuNhapChiPhiResponse.dvCommoE13 +
				thuNhapChiPhiResponse.dvKhacE13,
			fxNteE14: thuNhapChiPhiResponse.fxNteE14,
			thuBatThuong:
				thuNhapChiPhiResponse.btKhacE17 +
				thuNhapChiPhiResponse.btXlnE18,
		};
		return resultThuNhapChiPhiResponse;
	},

	convertValue: (value, label) => {
		let string = '';
		if (value !== null && value !== undefined) {
			if (label) {
				string += `${appFormatMoney(value)} ${label}`;
			} else {
				string += `${value}`;
			}
		}
		return string;
	},
};

const PRODUCT_AND_SERVICE = {
	DIGITAL_ID: -1,
	ICON: {
		1: {label: 'Huy động', icon: themes.getImages('loan')},
		7: {label: 'Thẻ', icon: themes.getImages('creditCard')},
		3: {label: 'Tín dụng', icon: themes.getImages('debt')},
		4: {label: 'Bảo lãnh', icon: themes.getImages('phoneMessage')},
		5: {label: 'Tài trợ thương mại', icon: themes.getImages('investment')},
	},

	objLabel: {
		balance: 'tr.đ',
		balanceQd: 'tr.đ',
	},

	convertValue: (value, label) => {
		let string = '';
		if (value !== null && value !== undefined) {
			if (label) {
				string += `${appFormatMoney(value)} ${label}`;
			} else {
				string += `${value}`;
			}
		}
		return string;
	},
};

export {defaultText, CONTROL_RISK, MB_RELATIONSHIP, PRODUCT_AND_SERVICE};
