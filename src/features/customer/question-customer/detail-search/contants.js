export const TABLE = {
	type: {
		index: 'index',
		year: 'year',
		textInput: 'textInput',
		icon: 'icon',
		dropDown: 'dropDown',
		smallDropDown: 'smallDropDown',
		status: 'status',
		relationship: 'relationship',
		position: 'position'
	},
};

export const LIST_POSITION_KEY = {
	manager: 0,
	chairman: 1,
	leader: 2,
	other: 3,
};

export const LIST_POSITION = [
	{
		key: LIST_POSITION_KEY.chairman,
		text: 'Thành viên/ Chủ tịch/ Phó chủ tịch/ HĐQT/HĐTV',
	},
	{
		key: LIST_POSITION_KEY.manager,
		text: 'Ban Tổng giám đốc/ Giám đốc',
	},
	{
		key: LIST_POSITION_KEY.leader,
		text: 'Trưởng/ Phó phòng',
	},
	{
		key: LIST_POSITION_KEY.other,
		text: 'Khác',
	},
];

export const BUSINESS_FIELD = [
	{key: 1, text: '1 - Chăn nuôi và các hoạt động dịch vụ liên quan'},
	{key: 2, text: '2 - Đánh bắt, chế biến, kinh doanh sản phẩm thủy hải sản'},
	{key: 3, text: '3 - Dịch vụ công ích và hoạt động phi chính phủ'},
	{key: 4, text: '4 - Dịch vụ giáo dục'},
	{key: 5, text: '5 - Dịch vụ kho bãi, kho vận'},
	{key: 6, text: '6 - Dịch vụ lưu trú và ăn uống'},
	{
		key: 7,
		text: '7 - Dịch vụ tư vấn, cho thuê, thiết kế, khoa học công nghệ',
	},
	{key: 8, text: '8 - Đóng tàu, kinh doanh dịch vụ vận tải đường thủy'},
	{key: 9, text: '9 - Hoạt động dịch vụ tài chính'},
	{key: 10, text: '10 - Khai thác mỏ, chế biến và kinh doanh khoáng sản'},
	{
		key: 11,
		text:
			'11 - Khai thác, sản xuất sản phẩm dầu khí, hóa dầu (xăng, dầu, gas, khí đốt…)',
	},
	{key: 12, text: '12 - Khai thác, sản xuất và kinh doanh than'},
	{key: 13, text: '13 - Kinh doanh bất động sản'},
	{
		key: 14,
		text:
			'14 - Kinh doanh sản phẩm dầu khí, hóa dầu (xăng, dầu, gas, khí đốt…)',
	},
	{key: 15, text: '15 - Sản xuất kinh doanh giấy và dịch vụ in'},
	{
		key: 16,
		text:
			'16 - Sản xuất phương tiện, thiết bị phụ trợ và kinh doanh vận tải khác (đường sắt và hàng không)',
	},
	{
		key: 17,
		text:
			'17 - Sản xuất và kinh doanh phương tiện, thiết bị phụ trợ (ngoài ô tô) và dịch vụ vận tải bộ',
	},
	{
		key: 18,
		text:
			'18 - Sản xuất và kinh doanh thiết bị phụ trợ và công nghiệp ô tô',
	},
	{key: 19, text: '19 - Sản xuất, chế biến, kinh doanh đồ uống'},
	{key: 20, text: '20 - Sản xuất, chế biến, kinh doanh thực phẩm'},
	{key: 21, text: '21 - Sản xuất, cung cấp nước'},
	{
		key: 22,
		text: '22 - Sản xuất, kinh doanh các mặt hàng da, giả da, da giày',
	},
	{key: 23, text: '23 - Sản xuất, kinh doanh các mặt hàng sợi, dệt may'},
	{key: 24, text: '24 - Sản xuất, kinh doanh gang, sắt, thép, inox'},
	{
		key: 25,
		text:
			'25 - Sản xuất, kinh doanh hàng tiêu dùng, đồ gia dụng, thiết bị văn phòng',
	},
	{key: 26, text: '26 - Sản xuất, kinh doanh hóa chất và phân bón'},
	{
		key: 27,
		text:
			'27 - Sản xuất, kinh doanh sản phẩm dịch vụ bưu chính, viễn thông',
	},
	{key: 28, text: '28 - Sản xuất, kinh doanh sản phẩm dịch vụ CNTT'},
	{
		key: 29,
		text: '29 - Sản xuất, kinh doanh sản phẩm dịch vụ dược phẩm, y tế',
	},
	{
		key: 30,
		text:
			'30 - Sản xuất, kinh doanh sản phẩm dịch vụ nghệ thuật, vui chơi, giải trí, thể thao',
	},
	{
		key: 31,
		text: '31 - Sản xuất, kinh doanh thiết bị điện, điện tử, điện lạnh',
	},
	{key: 32, text: '32 - Sản xuất, kinh doanh thức ăn chăn nuôi'},
	{key: 33, text: '33 - Sản xuất, kinh doanh vật liệu xây dựng'},
	{key: 34, text: '34 - Sản xuất, kinh doanh xi măng'},
	{key: 35, text: '35 - Sản xuất, kinh doanh, dịch vụ công nghiệp cơ khí'},
	{key: 36, text: '36 - Sản xuất, truyền tải và phân phối điện'},
	{key: 37, text: '37 - Trồng trọt kinh doanh lúa, gạo'},
	{key: 38, text: '38 - Trồng trọt, chế biến, kinh doanh cà phê'},
	{key: 39, text: '39 - Trồng trọt, khai thác, sản xuất, kinh doanh gỗ'},
	{
		key: 40,
		text:
			'40 - Trồng trọt, khai thác, sản xuất, kinh doanh sản phẩm cây trồng, lâm nghiệp khác',
	},
	{key: 41, text: '41 - Trồng trọt,chế biến, kinh doanh cao su'},
	{key: 42, text: '42 - Xây dựng cơ sở hạ tầng'},
	{key: 43, text: '43 - Xây dựng nhà ở và lắp đặt các công trình liên quan'},
	{key: 44, text: '44 - Kinh doanh chứng khoán'},
	{key: 45, text: '45 - KHCN - Tiêu dùng'},
];

export const TYPE_FIELD_KEY = [
	{
		key: 0,
		text: 'Cùng ngành',
	},
	{
		key: 1,
		text: 'Khác ngành',
	},
];

export const STATUS_ACTIVE = [
	{
		key: 1,
		text: 'Hoạt động',
	},
	{
		key: 0,
		text: 'Ngưng hoạt động',
		warning: true,
	},
];

export function getListYearRelationship(ranger) {
	const list = [];
	const defaults = 100;
	if (ranger) {
		for (let i = 0; i < ranger; i++) {
			list.push({key: i, text: i});
		}
	} else {
		for (let i = 0; i < defaults; i++) {
			list.push({key: i, text: `${i}`});
		}
	}
	return list;
}
export const OPTION_KEY = {
	have: 0,
	not: 1,
};
export const OPTION = [
	{name: 'Đã có kinh nghiệm', key: OPTION_KEY.have, selected: true},
	{name: 'Không có', key: OPTION_KEY.not, selected: false},
];
