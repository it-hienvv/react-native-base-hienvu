import realmCollectionName from './realmCollectionName';
import {APP_CONFIG} from 'contants/contants';

const DASHBOARD_SCHEMA = {
	todo: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].DashboardSchemaName.todo
		}`,
		primaryKey: 'id',
		properties: {
			id: 'string',
			level: 'int',
			isChecked: 'bool',
			description: 'string',
		},
	},
	workCalendar: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].DashboardSchemaName
				.workCalendar
		}`,
		primaryKey: 'id',
		properties: {
			id: 'string',
			title: 'string',
			startTime: 'string',
			endTime: 'string',
			description: 'string',
			address: 'string',
			minutes: 'int',
			startMinute: 'int',
			startHour: 'int',
			weekDay: 'int',
			timestamp: 'int',
		},
	},
};

const CUSTOMER_SCHEMA = {
	leads: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME.leads
		}`,
		primaryKey: 'leadId',
		properties: {
			leadId: 'int',
			code: 'string',
			name: 'string',
			taxCode: 'string?',
			swiftCode: 'string?',
			registrationNumber: 'string?',
			revenue: 'int?',
			marialStatus: 'string?',
			sex: 'string?',
			identifiedNumber: 'string?',
			assetTotal: 'int?',
			charter: 'int?',
			equityOwner: 'int?',
			profitNonTax: 'int?',
			employeeNumber: 'int?',
			address: 'string?',
			email: 'string?',
			website: 'string?',
			phone: 'string?',
			mobile: 'string?',
			personalJob: 'int?',
			personalPosition: 'int?',
			fax: 'string?',
			status: 'int?',
			leadType: 'int?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			accountId: 'int?',
			areaId: 'int?',
			sourceId: 'int?',
			organizationId: 'int?',
			attribute1: 'string?',
			attribute2: 'string?',
			attribute3: 'string?',
			attribute4: 'string?',
			attribute5: 'string?',
			attribute6: 'int?',
			attribute7: 'int?',
			attribute8: 'int?',
			attribute9: 'string?',
			attribute10: 'string?',
			clientId: 'int?',
			languageId: 'int?',
			leadStatusId: 'int?',
			auditId: 'int?',
			orgType: 'string?',
			sourceDescription: 'string?',
			statusDescription: 'string?',
			campaignId: 'int?',
			shareholderNumber: 'string?',
			disableEmail: 'bool?',
			disablePhone: 'bool?',
			disableSms: 'bool?',
			disableMeeting: 'bool?',
			companyPhone: 'string?',
			monthlyIncome: 'string?',
			organization: 'string?',
			employeeId: 'int?',
			birthday: 'string?',
			mergedLeadId: 'int?',
			pinMilitary: 'string?',
			passport: 'string?',
			sector: 'string?',
			lat: 'string?',
			lon: 'string?',
			leadGroup: 'string?',
			registrationDate: 'string?',
			identifiedIssueDate: 'string?',
			identifiedIssueArea: 'string?',
			passportIssueDate: 'string?',
			passportIssueArea: 'string?',
			militaryIssueDate: 'string?',
			militaryIssueArea: 'string?',
			permanentResidence: 'string?',
			officePhone: 'string?',
			officeFax: 'string?',
			literacy: 'string?',
			office: 'string?',
			creditRelation: 'string?',
			registrationUpdateDate: 'string?',
			registrationAddress: 'string?',
			addressRegistration: 'string?',
			taxIssuedDate: 'string?',
			udid: 'string?',
			industryGeneral: 'string?',
			cusVip: 'bool?',
			cusType: 'string?',
			loaiHinhDn: 'string?',
			phanKhucKh: 'string?',
			nganhNgheLinhVuc: 'string?',
			soLaoDong: 'string?',
			doanhSoXnk: 'int?',
			soNamHoatDong: 'int?',
			thongTinDaiDienTen: 'string?',
			thongTinDaiDienChucvu: 'string?',
			thongTinDaiDienDanhXung: 'string?',
			thongTinDaiDienNgaySinh: 'string?',
			thongTinDaiDienCmndktt: 'string?',
			thongTinDaiDienMobile: 'string?',
			thongTinDaiDienNguonKh: 'string?',
			doanhThuTaiChinh: 'int?',
			ngayThucHienUpload: 'string?',
			donViUpload: 'string?',
			quocGiaText: 'string?',
			doanhThuNamTruoc: 'int?',
			tongDuNo: 'string?',
			tongThuNhapNguoiLaoDong: 'string?',
			vonChuSoHuu: 'string?',
			doanhThuBhVaCcdv: 'string?',
			doanhThuThuanBhVaCcdv: 'string?',
			loiNhuanKeToanTt: 'string?',
			doanhSoNk: 'string?',
			doanhSoXk: 'string?',
			tenTctd: 'string?',
			businessActivityType: 'string?',
			businessActivityName: 'string?',
			businessActivityNote: 'string?',
			channelApproaching: 'string?',
			streetDkkd: 'string?',
			provinceDkkdId: 'int?',
			districtDkkdId: 'int?',
			wardDkkdId: 'int?',
			streetHt: 'string?',
			provinceResidentId: 'int?',
			districtResidentId: 'int?',
			wardResidentId: 'int?',
			inputType: 'string?',
			smeStatusId: 'int?',
			smeStatusReasonId: 'int?',
			smeStatusReasonNotice: 'string?',
			fi: 'bool?',
			revenueLastYear: 'string?',
			assignedDate: 'string?',
			expirationDate: 'string?',
			sla: 'string?',
		},
	},
	employee: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.employee
		}`,
		primaryKey: 'employeeId',
		properties: {
			employeeId: {type: 'int', indexed: true},
			code: 'string?',
			fullName: 'string?',
			firstName: 'string?',
			lastName: 'string?',
			sex: 'string?',
			birthday: 'string?',
			position: 'string?',
		},
	},
	currentUserInfo: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.currentUserInfo
		}`,
		primaryKey: 'employeeType',
		properties: {
			employeeType: 'string?',
			currentEmployee: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.employee
			}`,
		},
	},
	accounts: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.accounts
		}`,
		primaryKey: 'accountId',
		properties: {
			accountId: 'int',
			code: 'string?',
			name: 'string',
			sector: 'string?',
			mnemonic: 'string?',
			sex: 'string?',
			marialStatus: 'string?',
			birthday: 'string?',
			registrationNumber: 'string?',
			registrationAddress: 'string?',
			registrationDate: 'string?',
			identifiedNumber: 'string?',
			identifiedIssueDate: 'string?',
			identifiedIssueArea: 'string?',
			taxCode: 'string?',
			taxIssuedDate: 'string?',
			setupDate: 'string?',
			employeeCode: 'string?',
			status: 'int?',
			openCodeDate: 'int?',
			swiftCode: 'string?',
			phone: 'string?',
			fax: 'string?',
			email: 'string?',
			address: 'string?',
			website: 'string?',
			revenue: 'int?',
			assetTotal: 'string?',
			charter: 'int?',
			employeeNumber: 'string?',
			personalIncome: 'string?',
			familyIncome: 'string?',
			personalIndustry: 'string?',
			shareholderNumber: 'string?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			languageId: 'string?',
			attribute1: 'string?',
			attribute2: 'string?',
			attribute3: 'string?',
			attribute4: 'string?',
			attribute5: 'string?',
			attribute6: 'string?',
			attribute7: 'string?',
			attribute8: 'string?',
			attribute9: 'string?',
			attribute10: 'string?',
			attribute11: 'int?',
			attribute12: 'string?',
			attribute13: 'string?',
			attribute14: 'string?',
			attribute15: 'string?',
			attribute16: 'string?',
			attribute17: 'string?',
			attribute18: 'string?',
			attribute19: 'string?',
			attribute20: 'string?',
			mobile: 'string?',
			industryBusiness: 'string?',
			disableEmail: 'bool?',
			disablePhone: 'bool?',
			disableSms: 'bool?',
			disableMeeting: 'bool?',
			accountLevel: 'string?',
			branchCode: 'string?',
			ownerEmployeeId: 'int?',
			followUpState: 'string?',
			lat: 'string?',
			lon: 'string?',
			lastDateTrading: 'string?',
			fullName: 'string?',
			accountGroup: 'string?',
			citizenship: 'string?',
			passportNumber: 'string?',
			passportIssueDate: 'string?',
			passportIssueArea: 'string?',
			militaryNumber: 'string?',
			militaryIssueDate: 'string?',
			militaryIssueArea: 'string?',
			permanentResidence: 'string?',
			officePhone: 'string?',
			officeFax: 'string?',
			literacy: 'string?',
			title: 'string?',
			office: 'string?',
			creditRelation: 'string?',
			registrationUpdateDate: 'string?',
			addressRegistration: 'string?',
			profitBeforeTax: 'string?',
			identifiedNumberCrm: 'string?',
			udid: 'string?',
			loaisp: 'string?',
			ngayps: 'string?',
			cnps: 'string?',
			dwhCustomerStatusId: 'string?',
			isAssignKvh: 'string?',
			country: 'string?',
			doanhThuTaiChinh: 'string?',
			doanhSoXnk: 'string?',
			soLaoDong: 'string?',
			exNganhNgheLinhVuc: 'string?',
			quocgiaDiabanHoatdong: 'string?',
			quanhuyenDiabanHoatdong: 'string?',
			xaphuongDiabanHoatdong: 'string?',
			yVnTown: 'string?',
			objectType: 'string?',
			accountType: 'string?',
			activityStatus: 'string?',
			areaId: 'int?',
			clientId: 'int?',
			active: 'bool?',
			smeStatusId: 'int?',
			phanKhucKh: 'string?',
			sla: 'string?',
			revenueLastYear: 'string?',
			employeeId: 'int?',
			doiTuong: 'string?',
			trangThai: 'string?',
		},
	},
	leadSmeStatus: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.leadSmeStatus
		}`,
		primaryKey: 'leadSmeStatusId',
		properties: {
			leadSmeStatusId: {type: 'int', indexed: true},
			name: 'string?',
			description: 'string?',
		},
	},
	campaigns: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.campaigns
		}`,
		primaryKey: 'campaignsId',
		properties: {
			campaignsId: {type: 'int', indexed: true},
			name: 'string?',
			code: 'string?',
		},
	},
	// exchangeRate: {
	// 	name: `${
	// 		realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
	// 			.campaigns
	// 	}`,
	// 	primaryKey: 'campaignsId',
	// 	properties: {
	// 		campaignsId: {type: 'int', indexed: true},
	// 		name: 'string?',
	// 		code: 'string?',
	// 	},
	// },
	leadContacts: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.leadContacts
		}`,
		primaryKey: 'accountContactsId',
		properties: {
			accountContactsId: 'int',
			accountCode: 'string?',
			createdDate: 'string?',
			createdBy: 'int?',
			updatedDate: 'string?',
			updatedBy: 'int?',
			udid: 'string?',
			accountId: 'string?',
			contactId: 'int?',
			leadId: 'int?',
			active: 'bool?',
		},
	},
	accountContacts: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.accountContacts
		}`,
		primaryKey: 'accountContactsId',
		properties: {
			accountContactsId: 'int',
			accountCode: 'string?',
			createdDate: 'string?',
			createdBy: 'int?',
			updatedDate: 'string?',
			updatedBy: 'int?',
			udid: 'int?',
			accountId: 'int?',
			contactId: 'int?',
			leadId: 'int?',
			active: 'bool?',
		},
	},
	contacts: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.contacts
		}`,
		primaryKey: 'contactId',
		properties: {
			contactId: 'int?',
			accountId: 'int?',
			address: 'string?',
			attribute1: 'string?',
			attribute2: 'string?',
			attribute3: 'string?',
			attribute4: 'string?',
			attribute5: 'string?',
			attribute6: 'string?',
			birthday: 'string?',
			clientId: 'int?',
			createdBy: 'int?',
			createdDate: 'string?',
			educationLevel: 'string?',
			email: 'string?',
			fullName: 'string?',
			identifiedIssueArea: 'string?',
			identifiedIssueDate: 'string?',
			identifiedNumber: 'string?',
			lat: 'int?',
			leadId: 'int?',
			lon: 'int?',
			mobile: 'string?',
			numberExp: 'string?',
			passport: 'string?',
			phone: 'string?',
			position: 'int?',
			region: 'string?',
			roleDescription: 'string?',
			sex: 'string?',
			status: 'int?',
			udid: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			manageExp: 'string?',
			businessType: 'string?',
			decision: 'bool?',
			active: 'int?',
		},
	},
	revenueLead: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.revenueLead
		}`,
		primaryKey: 'revenueLeadId',
		properties: {
			revenueLeadId: 'int',
			revenueLeadType: 'int?',
			year: 'int?',
			value: 'int?',
			status: 'int?',
			leadId: 'int?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			active: 'int?',
		},
	},
	leadAlert: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.leadAlert
		}`,
		primaryKey: 'taxCode',
		properties: {
			customerType: 'int?',
			customerName: 'string?',
			taxCode: 'string',
			registrationNumber: 'string?',
			filterStatus: 'int?',
			filterInfo: 'string?',
			inputUserDate: 'string?',
			publicStatus: 'int?',
			updatedDate: 'string?',
			filterUser: 'int?',
		},
	},
	leadBusinessInfo: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.leadBusinessInfo
		}`,
		primaryKey: 'leadBussinessInfoId',
		properties: {
			leadBussinessInfoId: 'int',
			bqSoNgayPhaiTra: 'int?',
			leadId: 'int?',
			accountId: 'int?',
			ghiChu: 'string?',
			hangHoa: 'string?',
			loaiHoatDong: 'int?',
			maSoThue: 'string?',
			soNamQuanHe: 'int?',
			tenCongTy: 'string?',
			createdDate: 'string?',
			active: 'int?',
		},
	},
	leadRelationshipCredit: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.leadRelationshipCredit
		}`,
		primaryKey: 'relationshipCreditId',
		properties: {
			relationshipCreditId: 'int',
			relationshipCreditName: 'string?',
			policyType: 'string?',
			policyValue: 'int?',
			createdBy: 'int?',
			createdDate: 'int?',
			updatedBy: 'int?',
			updatedDate: 'int?',
			leadId: 'int?',
			active: 'int?',
		},
	},

	cicExtendsInformation: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.cicExtendsInformation
		}`,
		primaryKey: 'maSoThue',
		properties: {
			maSoThue: 'string',
			nhomNoMax: 'int?',
			soLuongTctd: 'int?',
			tongDunoTraiphieu: 'int?',
			tongDuCamketNb: 'int?',
			thoiDiemTraCic: 'string?',
			transactionDate: 'string?',
		},
	},
	cicOtherInformation: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.cicOtherInformation
		}`,
		primaryKey: 'maSoThue',
		properties: {
			maSoThue: 'string',
			maNganHang: 'int?',
			nganHang: 'string?',
			nhomNo: 'string?',
			traiPhieu: 'int?',
			camKet: 'int?',
			the: 'int?',
			updatedDate: 'int?',
		},
	},
	industry: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.industry
		}`,
		primaryKey: 'industryId',
		properties: {
			industryId: 'int',
			industryCode: 'string?',
			industryName: 'string?',
			createdDate: 'string?',
			createdBy: 'int?',
			updatedDate: 'string?',
			updatedBy: 'int?',
			industryParentId: 'int?',
			active: 'bool?',
		},
	},
	industryAccount: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.industryAccount
		}`,
		primaryKey: 'industryAccountId',
		properties: {
			industryAccountId: 'int',
			industryId: 'int?',
			accountId: 'int?',
			leadId: 'int?',
			createdDate: 'string?',
			createdBy: 'int?',
			updatedDate: 'string?',
			updatedBy: 'int?',
			active: 'bool?',
			udid: 'string?',
		},
	},
	provinces: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.provinces
		}`,
		primaryKey: 'cityCode',
		properties: {
			cityCode: 'string',
			name: 'string?',
			priority: 'int?',
			nameF: 'string?',
			createdBy: 'int?',
			createdDate: 'string?',
			modifiedBy: 'int?',
			modifiedDate: 'string?',
		},
	},
	districts: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.districts
		}`,
		primaryKey: 'districtCode',
		properties: {
			districtCode: 'string',
			nameF: 'string?',
			name: 'string?',
			priority: 'int?',
			provinceCode: 'string?',
			status: 'string?',
			createdBy: 'int?',
			createdDate: 'string?',
			modifiedBy: 'int?',
			modifiedDate: 'string?',
		},
	},
	wards: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME.wards
		}`,
		primaryKey: 'wardCode',
		properties: {
			wardCode: 'string',
			nameF: 'string?',
			name: 'string?',
			priority: 'int?',
			districtCode: 'string?',
			status: 'string?',
			createdBy: 'int?',
			createdDate: 'string?',
			modifiedBy: 'int?',
			modifiedDate: 'string?',
		},
	},
	// //dev/hienvu
	thuNhapChiPhiResponse: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.thuNhapChiPhiResponse
		}`,
		properties: {
			transactionDate: 'int?',
			dtttrrP: 'double?',
			dtttrrI: 'double?',
			dttsrrI: 'double?',
			thulaiKhA: 'double?',
			chilaiFtpB: 'double?',
			chilaiKhC: 'double?',
			thulaiFtpD: 'double?',
			dvBaolanhE1: 'double?',
			dvTtqtE2: 'double?',
			fxNteE14: 'double?',
			btKhacE17: 'double?',
			soduVndH: 'double?',
			btXlnE18: 'double?',
			toi: 'double?',
			thuTuUngDung: 'double?',
			thuHuyDongVon: 'double?',
			thuKhac: 'double?',
			thuBatThuong: 'double?',
			dvTttnE3: 'double?',
			dvTheE4: 'double?',
			dvUtbhckE5: 'double?',
			dvTuvanE6: 'double?',
			dvNganquyE7: 'double?',
			dvGiuhoE8: 'double?',
			dvKieuhoiE9: 'double?',
			dvNhdtE10: 'double?',
			dvCommoE13: 'double?',
			dvKhacE13: 'double?',
			toi: 'double?',
		},
	},
	kdoanhResponse: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.kdoanhResponse
		}`,
		properties: {
			dunoHanmucTd: 'double?',
			dunoDunoThBq: 'double?',
			dunoDunoNhBq: 'double?',
			dunoNimTdhBq: 'double?',
			dunoNimNhBq: 'double?',
			dunoTytrong: 'double?',
			hdvCkhBq: 'double?',
			hdvCasaBq: 'double?',
			blHanmucBaolanh: 'double?',
			blTytrongKhaithac: 'double?',
			blDsBaolanhBq: 'double?',
			tttmDsTtqt: 'double?',
			kqthThiphanVitien: 'double?',
			kqthSlsp: 'double?',
			qtdmDstvTm: 'double?',
			qtdmDstvCk: 'double?',
			ttWalletShare: 'double?',
			tyTrong: 'int?',
		},
	},

	subInformationRelationShip: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.subInformationRelationShip
		}`,
		properties: {
			month: 'int?',
			year: 'int?',
			doanhSoXnk: 'double?',
			kdoanhResponse: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.kdoanhResponse
			}`,
			thuNhapChiPhiResponse: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.thuNhapChiPhiResponse
			}`,
		},
	},
	mbRelationShip: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.mbRelationShip
		}`,
		primaryKey: 'idKh',
		properties: {
			idKh: 'int',
			infoRelationshipMb: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.subInformationRelationShip
			}[]`,
		},
	},
	// hienvu
	accountRaking: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.accountRanking
		}`,
		properties: {
			rank: 'string?',
			rankDate: 'double?',
			soNamQhMb: 'int?',
			// soNamQhMb: 'double?',
		},
	},
	cicInformation: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.cicInformation
		}`,
		properties: {
			maSoThue: 'string?',
			nhomNoMax: 'int?',
			soLuongTctd: 'double?',
			tongDunoTraiphieu: 'double?',
			thoiDiemTraCic: 'string?',
			camKet: 'int?',
		},
	},
	quanLyDongTien: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.quanLyDongTien
		}`,
		properties: {
			blDsBaolanhBq: 'double?',
			blHanmucBaolanh: 'double?',
			blTytrongKhaithac: 'double?',
			dunoDunoThBq: 'double?',
			dunoHanmucTd: 'double?',
			dunoNimNhBq: 'double?',
			dunoNimTdhBq: 'double?',
			dunoTytrong: 'double?',
			hdvCasaBq: 'double?',
			hdvCkhBq: 'double?',
			kqthSlsp: 'double?',
			kqthThiphanVitien: 'double?',
			qtdmDstvCk: 'double?',
			qtdmDstvTm: 'double?',
			tttmDsTtqt: 'double?',
			tyLeDsoChuyenTien: 'double?',
			qtdmDsgnNh: 'double?',
			qtdmDsgnTdh: 'double?',
			tyLeTienVe: 'double?',
		},
	},
	canhBao: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME.canhBao
		}`,
		properties: {
			capdoCn: 'string?',
			nhomno2: 'string?',
			sl: 'double?',
			snqh: 'double?',
		},
	},
	listQuanLyDongTien: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.listQuanLyDongTien
		}`,
		properties: {
			month: 'int?',
			year: 'int?',
			dongTienDto: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.quanLyDongTien
			}`,
			canhBaoDto: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.canhBao
			}`,
		},
	},
	organization: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.organization
		}`,
		primaryKey: 'sysOrganizationId',
		properties: {
			sysOrganizationId: 'int?',
			code: 'string?',
			name: 'string?',
			parentId: 'int?',
			path: 'string?',
			fullPath: 'string?',
			status: 'int?',
			description: 'string?',
			address: 'string?',
			mnemomic: 'string?',
			taxCode: 'string?',
			createdBy: 'int?',
			createdDate: 'int?',
			updateBy: 'int?',
			updatedDate: 'int?',
			clientId: 'int?',
			parentCode: 'string?',
			type: 'bool?',
			areaCode: 'string?',
			areaName: 'string?',
			locationCode: 'string?',
			locationName: 'string?',
			companyType: 'int?',
			kpiArea: 'int?',
			initialDate: 'string?',
			form: 'bool?',
			active: 'bool?',
		},
	},
	riskManagementResponse: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.riskManagementResponse
		}`,
		properties: {
			accountRanking: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.accountRanking
			}`,
			cicInfoDto: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.cicInformation
			}`,
			lstQuanTriRuiRoResponse: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.listQuanLyDongTien
			}[]`,
		},
	},

	riskManagement: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.riskManagement
		}`,
		primaryKey: 'idKh',
		properties: {
			idKh: 'int',
			riskManagementResponse: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.riskManagementResponse
			}`,
		},
	},
	productDetail: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.productDetail
		}`,
		properties: {
			productCode: 'string?',
			contractNumber: 'string?',
			productName: 'string?',
			balance: 'double?',
			currency: 'string?',
			balanceQd: 'double?',
			sOpenDate: 'string?',
			sExpiredDate: 'string?',
			sbussinessDate: 'string?',
		},
	},
	itemProductService: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.itemProductService
		}`,
		properties: {
			productDetail: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.productDetail
			}`,
			type: 'int?',
		},
	},
	digitalBankItem: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.digitalBankItem
		}`,
		properties: {
			code: 'string?',
			name: 'string?',
			orderNum: 'int?',
			suDung: 'int?',
			doanhSo: 'double?',
		},
	},

	productService: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.productService
		}`,
		primaryKey: 'idKh',
		properties: {
			idKh: 'int',
			infoProductServices: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.itemProductService
			}[]`,
			nganHangSo: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.digitalBankItem
			}[]`,
		},
	},
	financeItem: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.financeItem
		}`,
		properties: {
			idChiTieu: 'string?',
			maKh: 'string?',
			namNow: 'int?',
			namN1: 'int?',
			tenChiTieu: 'string?',
		},
	},
	finance: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME.finance
		}`,
		primaryKey: 'idKh',
		properties: {
			maKh: 'string',
			idKh: 'int',
			thongTinTaiChinh: `${
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.financeItem
			}[]`,
		},
	},
	productType: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
				.productType
		}`,
		primaryKey: 'productTypeId',
		properties: {
			productTypeId: 'int?',
			code: 'string?',
			name: 'string?',
		},
	},
};

const HANDBOOK_SCHEMA = {
	productItem: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.productItem
		}`,
		primaryKey: 'productItemId',
		properties: {
			productItemId: {type: 'int', indexed: true},
			itemId: 'int?',
			productId: 'int?',
			value: 'string?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			active: 'bool',
		},
	},
	productLine: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.productLine
		}`,
		primaryKey: 'productLineId',
		properties: {
			productLineId: {type: 'int', indexed: true},
			accountType: 'string?',
			name: 'string?',
			description: 'string?',
			numberOrder: 'int?',
			icon: 'string?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			active: 'bool',
		},
	},
	product: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME.product
		}`,
		primaryKey: 'productId',
		properties: {
			productId: {type: 'int', indexed: true},
			code: 'string?',
			name: 'string?',
			shortName: 'string?',
			strDescription: 'string?',
			bankId: 'int?',
			icon: 'string?',
			accountType: 'string?',
			productLineId: 'int?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			effectDateFrom: 'string?',
			effectDateTo: 'string?',
			active: 'bool',
		},
	},
	productLineItem: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.productLineItem
		}`,
		primaryKey: 'productLineItemId',
		properties: {
			productLineItemId: {type: 'int', indexed: true},
			itemId: 'int?',
			productLineId: 'int?',
			numberOrder: 'int?',
			compare: 'bool',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			active: 'bool',
		},
	},
	item: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME.item
		}`,
		primaryKey: 'itemId',
		properties: {
			itemId: {type: 'int', indexed: true},
			name: 'string?',
			description: 'string?',
			accountType: 'string?',
			productLineId: 'int?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			active: 'bool',
		},
	},
	itemPolicies: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.itemPolicies
		}`,
		primaryKey: 'itemPolicyId',
		properties: {
			itemPolicyId: {type: 'int', indexed: true},
			name: 'string?',
			description: 'string?',
			accountType: 'string?',
			policyLineId: 'int?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			active: 'bool',
		},
	},
	notify: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME.notify
		}`,
		primaryKey: 'handbookNotifyId',
		properties: {
			handbookNotifyId: {type: 'int', indexed: true},
			accountType: 'string?',
			title: 'string?',
			numberOrder: 'int?',
			productLineId: 'int?',
			icon: 'string?',
			effectDateFrom: 'string?',
			effectDateTo: 'string?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			strContent: 'string?',
			active: 'bool',
		},
	},
	notifyLine: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.notifyLine
		}`,
		primaryKey: 'productLineId',
		properties: {
			productLineId: {type: 'int', indexed: true},
			accountType: 'string?',
			name: 'string?',
			numberOrder: 'int?',
			icon: 'string?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			description: 'string?',
			active: 'bool',
		},
	},
	policies: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.policies
		}`,
		primaryKey: 'policyId',
		properties: {
			policyId: {type: 'int', indexed: true},
			code: 'string?',
			name: 'string?',
			shortName: 'string?',
			strDescription: 'string?',
			bankId: 'int?',
			icon: 'string?',
			accountType: 'string?',
			policyLineId: 'int?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			effectDateFrom: 'string?',
			effectDateTo: 'string?',
			active: 'bool',
		},
	},
	policiesItem: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.policiesItem
		}`,
		primaryKey: 'policyItemId',
		properties: {
			policyItemId: {type: 'int', indexed: true},
			itemPolicyId: 'int?',
			policyId: 'int?',
			value: 'string?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			active: 'bool',
		},
	},
	policiesLine: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.policiesLine
		}`,
		primaryKey: 'policyLineId',
		properties: {
			policyLineId: {type: 'int', indexed: true},
			accountType: 'string?',
			name: 'string?',
			description: 'string?',
			numberOrder: 'int?',
			icon: 'string?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			active: 'bool',
		},
	},
	policiesLineItem: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].HANDBOOK_SCHEMA_NAME
				.policiesLineItem
		}`,
		primaryKey: 'policyLineItemId',
		properties: {
			policyLineItemId: {type: 'int', indexed: true},
			itemPolicyId: 'int?',
			policyLineId: 'int?',
			isCompare: 'bool?',
			numberOrder: 'int?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			active: 'bool',
		},
	},
};

const ATTACHMENT = {
	attachment: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].ATTACHMENT_SCHEMA_NAME
				.attachment
		}`,
		primaryKey: 'attachmentsId',
		properties: {
			attachmentsId: {type: 'int', indexed: true},
			clientAttachmentId: 'int?',
			fileName: 'string?',
			filePath: 'string?',
			objectId: 'int?',
			objectType: 'string?',
			createdBy: 'int?',
			createdDate: 'string?',
			updatedBy: 'int?',
			updatedDate: 'string?',
			active: 'bool',
			udid: 'string?',
		},
	},
};

const USER = {
	account: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].USER_SCHEMA_NAME.account
		}`,
		primaryKey: 'accountName',
		properties: {
			accountName: 'string',
			refreshToken: 'string',
			timeSys: 'string?',
			serverTime: 'string?',
		},
	},
};

const SYS = {
	logCollection: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].SYS_SCHEMA_NAME
				.logCollection
		}`,
		primaryKey: 'collectionName',
		properties: {
			collectionName: 'string',
			maxTime: 'string',
		},
	},
};

const SYS_CAT = {
	sysCatType: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].SYS_CAT_SCHEMA_NAME
				.sysCatType
		}`,
		primaryKey: 'sysCatTypeId',
		properties: {
			sysCatTypeId: 'int',
			code: 'string?',
			name: 'string?',
			updatedDate: 'string?',
			updatedBy: 'int?',
			createdDate: 'string?',
			createdBy: 'int?',
			active: 'bool?',
		},
	},
	sysCat: {
		name: `${
			realmCollectionName[APP_CONFIG.VERSION].SYS_CAT_SCHEMA_NAME.sysCat
		}`,
		primaryKey: 'sysCatId',
		properties: {
			sysCatId: 'int',
			code: 'string?',
			name: 'string?',
			value: 'string?',
			isDefault: 'int?',
			description: 'string?',
			orderNum: 'int?',
			updatedDate: 'string?',
			updatedBy: 'int?',
			createdDate: 'string?',
			createdBy: 'int?',
			sysCatTypeId: 'int?',
			active: 'bool?',
		},
	},
};
const VERSION = '0.0.1';

export default Schema = {
	[VERSION]: {
		DASHBOARD_SCHEMA,
		CUSTOMER_SCHEMA,
		USER,
		SYS,
		ATTACHMENT,
		HANDBOOK_SCHEMA,
		SYS_CAT,
	},
};
