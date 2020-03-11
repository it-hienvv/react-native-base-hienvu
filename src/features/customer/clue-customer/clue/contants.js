import I18nTran from 'assets/language';
export const SEGMENTATION = [
	{key: 0, text: I18nTran.t('all')},
	{key: 1, text: I18nTran.t('fit')},
	{key: 2, text: I18nTran.t('small')},
	{key: 3, text: I18nTran.t('super_small')},
	{key: 4, text: I18nTran.t('not_define')},
];

export const ID_NOT_DEFINE = 4;

export const CUSTOMER_TYPE = [
	{key: 0, text: I18nTran.t('all')},
	{key: 1, text: I18nTran.t('potential')},
	{key: 2, text: I18nTran.t('exist')},
];

export const REVENUE = [
	{key: 0, text: I18nTran.t('all')},
	{
		key: 1,
		min: 0,
		max: 10000000000,
		text: `0 - 10 ${I18nTran.t('billions_dong')}`,
	},
	{
		key: 2,
		min: 10000000001,
		max: 20000000000,
		text: `10 - 20 ${I18nTran.t('billions_dong')}`,
	},
	{
		key: 3,
		min: 20000000001,
		max: 50000000000,
		text: `20 - 50 ${I18nTran.t('billions_dong')}`,
	},
	{
		key: 4,
		min: 50000000001,
		max: 100000000000,
		text: `50 - 100 ${I18nTran.t('billions_dong')}`,
	},
	{
		key: 5,
		min: 100000000001,
		max: 500000000000,
		text: `100 - 500 ${I18nTran.t('billions_dong')}`,
	},
	{
		key: 6,
		min: 500000000001,
		max: 1000000000000,
		text: `500 - 1000 ${I18nTran.t('billions_dong')}`,
	},
];

export const STATUS = [
	{key: 0, text: I18nTran.t('all')},
	{key: 1, text: I18nTran.t('not_research_yet')},
	{key: 2, text: I18nTran.t('researching')},
	{key: 3, text: I18nTran.t('pause')},
	{key: 4, text: I18nTran.t('reject')},
];

export const STATUS_CHANGE_ONE = [
	{key: 1, text: I18nTran.t('not_research_yet')},
	{key: 2, text: I18nTran.t('researching')},
	{key: 3, text: I18nTran.t('pause')},
	{key: 4, text: I18nTran.t('reject')},
];

export const CAREER = [
	{key: 0, text: I18nTran.t('all')},
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

export const CHANELS = [
	{key: 0, text: I18nTran.t('all')},
	{key: 1, text: 'RM thao tác'},
	{key: 2, text: 'Hội sở phân giao'},
	// {key: 3, text: 'Chiến dịch – HO'},
	// {key: 4, text: 'Chiến dịch – Chi nhánh'},
	// {key: 5, text: 'MB247'},
	// {key: 6, text: 'Website MB'},
	// {key: 7, text: 'MB app'},
];

export const MANAGE_EXPERIENCE = [
	{key: 0, text: I18nTran.t('same_business')},
	{key: 1, text: I18nTran.t('relation_business')},
	{key: 2, text: I18nTran.t('not_same_business')},
];

export const REASON_DENY = [
	{key: 5, text: I18nTran.t('bad_debt')},
	{key: 6, text: I18nTran.t('stopped')},
	{key: 7, text: I18nTran.t('subject_to_state_warning')},
	{key: 8, text: I18nTran.t('subject_does_not_sponsor')},
	{key: 9, text: I18nTran.t('other')},
];

export const STATUS_CHANGE_MULTIPLE = [
	{key: 3, text: I18nTran.t('pause')},
	{key: 4, text: I18nTran.t('reject')},
];

export const ID_NOT_RESEARCH_YET = 1;
export const ID_RESEARCHING = 2;
export const ID_PAUSE = 3;
export const ID_REJECT = 4;

export const REASON_PAUSE = [
	{key: 1, text: I18nTran.t('do_not_need')},
	{
		key: 2,
		text: I18nTran.t('relations_of_other_credit_institutions'),
	},
	{key: 3, text: I18nTran.t('interest_rates_fees_not_competitive')},
	{key: 4, text: I18nTran.t('not_friendly_with_MB')},
];

export const HEADER_OPPORTUNITY_TAB_ACTIVE_ID = {
	clue: 1,
	opportunity: 2,
};

export const RELATION_BANK = [
	{key: 16, text: 'MB'},
	{key: 1, text: 'AgriBank'},
	{key: 2, text: 'VietcomBank'},
	{key: 3, text: 'VietinBank'},
	{key: 4, text: 'BIDV'},
	{key: 5, text: 'TechcomBank'},
	{key: 6, text: 'MSB'},
	{key: 7, text: 'SHB'},
	{key: 8, text: 'Sacombank'},
	{key: 9, text: 'Exim Bank'},
	{key: 10, text: 'ACB'},
	{key: 11, text: 'VPBank'},
	{key: 12, text: 'LienViet Post bank'},
	{key: 13, text: 'PG bank'},
	{key: 14, text: 'TP Bank'},
	{key: 15, text: 'VIB'},
	{key: 14, text: 'ABBank'},
	{key: 15, text: 'TCTD khác'},
];

export const listPolicyType = [
	{key: 6, text: 'Tên TCTD'},
	{key: 1, text: 'Lãi suất (%)'},
	{key: 2, text: 'Phí bảo lãnh (%)'},
	{key: 3, text: 'Phí LC (%)'},
	{key: 4, text: 'Phí bảo hiểm (Vnđ)'},
	{key: 5, text: 'Phí chuyển tiền (Vnđ)'},
];
export const ACTION_TYPE = {
	call: 1,
	message: 2,
	email: 3,
};

export const BUSINESS_TYPE = [
	{key: 0, text: 'Công ty cổ phần có vốn Nhà nước <=50%'},
	{key: 1, text: 'Công ty cổ phần không có vốn Nhà nước'},
	{key: 2, text: 'Công ty cổ phần, Công ty TNHH có vốn Nhà nước >50%'},
	{key: 3, text: 'Công ty Nhà nước'},
	{key: 4, text: 'Công ty TNHH 1 thành viên 100% vốn NNĐF'},
	{key: 5, text: 'Công ty TNHH 1 thành viên vốn NNTW'},
	{key: 6, text: 'Công ty hợp danh'},
	{key: 7, text: 'Công ty TNHH tư nhân, Công ty TNHH có vốn nhà nước <= 50%'},
	{key: 8, text: 'Doanh nghiệp 100% vốn nước ngoài'},
	{key: 9, text: 'Doanh nghiệp khác liên hoanh với nước ngoài'},
	{key: 10, text: 'Doanh nghiệp nhà nước liên danh với nước ngoài'},
	{key: 11, text: 'Doanh nghiệp tư nhân'},
	{key: 12, text: 'Hợp tác xã'},
];

export const ID_SATISFIED = 1;
export const ID_NOT_SATISFIED = 2;
export const ID_SCREENING_REJECT = 3;

export const listActivitiesType = [
	{key: 0, text: 'Công trình'},
	{key: 1, text: 'Dự án'},
	{key: 2, text: 'Đối tác đầu ra'},
	{key: 3, text: 'Đối tác đầu vào'},
];

export const ACTION = [
	{
		key: 0,
		text: I18nTran.t('action'),
	},
];

export const CBQL = {
	listFlex: [3, 1, 0.5, 1, 1, 1, 1, 1.2, 1, 0.3],
	listHeader: [
		{id: '0', title: 'Khách hàng'},
		{id: '1', title: 'MST'},
		{id: '2', title: 'Loại'},
		{id: '3', title: 'Ngành nghề'},
		{id: '4', title: 'Kênh TN'},
		{id: '5', title: 'Sàng lọc'},
		{id: '6', title: 'Trạng thái'},
		{id: '7', title: 'SLA'},
		{id: '8', title: 'RM'},
		{id: '9', title: ''},
	],
};

export const RM = {
	listFlex: [3, 1, 0.5, 1, 1, 1, 1, 1.2, 0.3],
	listHeader: [
		{id: '0', title: 'Khách hàng'},
		{id: '1', title: 'MST'},
		{id: '2', title: 'Loại'},
		{id: '3', title: 'Ngành nghề'},
		{id: '4', title: 'Kênh TN'},
		{id: '5', title: 'Sàng lọc'},
		{id: '6', title: 'Trạng thái'},
		{id: '7', title: 'SLA'},
		{id: '9', title: ''},
	],
};
