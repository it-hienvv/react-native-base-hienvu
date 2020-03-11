import CommonStyle from './CommonStyle';
import CardStyle from './CardStyle';
import {processColor} from 'react-native';
import React from 'react';

export default {
	containerMain: {
		flex: 1,
		flexDirection: 'column',
		marginTop: CommonStyle.headerHeight,
		padding: CommonStyle.margin16,
		backgroundColor: CommonStyle.bgColor,
	},
	containerHeaderTongDiemTheoKenh: {
		//   alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		paddingLeft: CommonStyle.margin12,
		paddingRight: CommonStyle.margin12,
	},
	viewLine: CardStyle.viewLine,
	viewLineVertical: CardStyle.viewLineVertical,
	containerBieuDoTongDiem: {
		flex: 1,
		flexDirection: 'row',
	},
	viewBieuDoTongDiem: {
		flex: 1,
	},
	viewKPIProductDetail: {
		flex: 1,
		padding: CommonStyle.margin16,
	},
	containerTool: {
		height: 40,
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexDirection: 'row',
	},
	textHeaderBieuDo: {
		fontSize: CommonStyle.mainTitleButtonSize,
		fontWeight: 'bold',
	},
	imageLuaChonSanPhamCap2: {
		width: 20,
		height: 20,
	},
	textKieuHienThi: {
		fontSize: CommonStyle.textSize,
		color: CommonStyle.defaultTextColor,
		marginRight: CommonStyle.margin4,
	},
	textKieuHienThiDangDuocChon: {
		fontSize: CommonStyle.textSize,
		color: CommonStyle.buttonColor,
		marginRight: CommonStyle.margin4,
	},
	containerRowBangBieuDo: {
		height: 44,
		flexDirection: 'row',
	},
	viewTenTrongBangBieuDo: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		borderRightWidth: CommonStyle.borderWidth,
		borderRightColor: CommonStyle.borderColor,
		borderLeftWidth: CommonStyle.borderWidth,
		borderLeftColor: CommonStyle.borderColor,
	},
	viewHienThiNoiDungTrongBangBieuDo: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRightWidth: CommonStyle.borderWidth,
		borderRightColor: CommonStyle.borderColor,
	},
	divider: {
		backgroundColor: CommonStyle.borderColor,
		height: CommonStyle.borderWidth,
	},
	GRANULARITY: 1,
	TEXT_CHART_VALUE_SIZE: CommonStyle.caption,
	TEXT_SIZE_XAXIS: CommonStyle.caption,
	TEXT_SIZE_LEGEND: CommonStyle.caption,
	TEXT_SIZE_MAKER: CommonStyle.caption,
	MARKER_COLOR: processColor(CommonStyle.bgMarker),
	TEXT_MARKER_COLOR: processColor(CommonStyle.textColorWhite),
	NO_DATA_TEXT: 'Không có dữ liệu biểu đồ',

	HORIZONTAL_COLORS_THEME_1: [
		processColor('#9ECAE1'),
		processColor('#3182BD'),
	],
	HORIZONTAL_COLORS_THEME_2: [
		processColor('#2ca25f'),
		processColor('#99d8c9'),
	],
	TABLEU_10_COLORS: [
		processColor('#1F77B4'),
		processColor('#FF7F0E'),
		processColor('#2CA02C'),
		processColor('#D62728'),
		processColor('#9467BD'),
		processColor('#8C564B'),
		processColor('#CFECF9'),
		processColor('#7F7F7F'),
		processColor('#BCBD22'),
		processColor('#17BECF'),
	],
	KHACH_HANG_COLORS: ['#2CA02C', '#17BECF', '#ffff22', '#D62728'],
	KHACH_HANG_COLORS_MINUS: ['rgba(255, 0, 0, 0.3)'],

	heightTongDiemTheoKenh: 450,
	heightHeaderTongDiemTheoKenh: 72,
	heightChiTietTheoSanPham: 500,
	heightQuyMo: 500,
};
