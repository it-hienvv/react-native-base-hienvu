import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Icon from '../product-and-service/icon';
import Mobilize from '../product-and-service/mobilize';
import DigitalBank from '../product-and-service/digitalBank';
import _ from 'lodash';
import realmCollectionName from 'utils/realm/realmCollectionName';
import {APP_CONFIG} from 'contants/contants';
import RealmHelper from 'utils/realm/realmHelper';
import themes from 'assets/themes';
import Loading from 'components/loading';
import {PRODUCT_AND_SERVICE} from  '../../contants';


const {
	DIGITAL_ID,
	ICON,
	objLabel,
	convertValue,
} = PRODUCT_AND_SERVICE;

class ProductAndService extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			icon: [],
			mobilize: [],
			digitalBank: [],
			headers: [],
			rows: [],
			loading: true,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this._onLoadData();
		}, 1000);
	}

	async _onLoadData() {
		try {
			const {accountId} = this.props;
			const iconCollection =
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.productType;
			let list = await RealmHelper.queryAllRealm({
				collection: iconCollection,
			});
			const infoCollection =
				realmCollectionName[APP_CONFIG.VERSION].CUSTOMER_SCHEMA_NAME
					.productService;
			const data = await RealmHelper.queryByKey({
				collection: infoCollection,
				key: accountId,
			});
			if (data?.infoProductServices && list) {
				list = list.filter(item => Boolean(ICON[item.productTypeId]));
				const infoProductServices = data.infoProductServices;
				const informationList = _.groupBy(
					infoProductServices,
					item => item.type,
				);
				let icon = list.map(item => {
					return {
						key: item.productTypeId,
						label: ICON[item.productTypeId].label,
						y: 0,
						icon: ICON[item.productTypeId].icon,
					};
				});
				[icon[0], icon[1]] = [icon[1], icon[0]];
				const mobilize = icon.map(item => {
					return {
						title: item.label,
						data:
							informationList[item.key] instanceof Array
								? informationList[item.key].map(ii => {
									const {productDetail} = ii;
									const obj = {};
									Object.keys(productDetail).map(
										itemKeys => {
											obj[itemKeys] = convertValue(
												productDetail[itemKeys],
												objLabel[itemKeys],
											);
										},
									);
									return obj;
								  })
								: [],
						key: item.key,
					};
				});
				const reducerTotal = (accumulator, currentValue) => {
					accumulator += currentValue.doanhSo;
					return accumulator;
				};
				const reducerTopLabel = (accumulator, currentValue) => {
					accumulator += currentValue.suDung;
					return accumulator;
				};

				const reducerHuyDong = (accumulator, currentValue) => {
					accumulator += currentValue.productDetail.balance;
					return accumulator;
				};
				const nganHangSo = [...data.nganHangSo];
				const itemDigital = {
					key: DIGITAL_ID,
					label: 'Ngân hàng số',
					y: 0,
					icon: themes.getImages('bank'),
					value:
						nganHangSo instanceof Array
							? convertValue(
								`${nganHangSo.reduce(reducerTotal, 0)}`,
								'tr.đ',
							  )
							: convertValue('0', 'tr.đ'),
					top:
						nganHangSo instanceof Array
							? `${nganHangSo.reduce(reducerTopLabel, 0)}`
							: 0,
				};
				icon.push(itemDigital);

				icon = icon.map(item => {
					let value = 0;
					let top = 0;
					if (informationList[item.key]) {
						value = informationList[item.key].reduce(
							reducerHuyDong,
							0,
						);
						informationList[item.key].forEach(_ => (top += 1));
					}
					return {
						...item,
						value: convertValue(value, 'tr.đ'),
						top,
					};
				});
				const digital = data.nganHangSo ?? [];
				const digitalBank = digital.map(item => {
					const obj = {};
					Object.keys(item).forEach(ii => {
						if (ii === 'name') {
							obj[ii] = convertValue(item[ii]);
						} else if (ii === 'suDung') {
							obj[ii] = item[ii];
						} else {
							obj[ii] = convertValue(item[ii], 'tr.đ');
						}
					});
					return obj;
				});
				this.setState({mobilize, icon, digitalBank, loading: false});
			} else {
				this.setState({loading: false});
			}
		} catch (error) {
			this.setState({loading: false});
		}
	}

	_digitalLayOut = event => {
		const {x, y, width, height} = event.nativeEvent.layout;
		const {icon} = this.state;
		const iconMap = icon.map(ii => {
			if (ii.key === DIGITAL_ID) {
				return {
					...ii,
					y: y,
				};
			}
			return {
				...ii,
			};
		});
		this.setState({icon: iconMap});
	};

	_onLayout = item => event => {
		const {x, y, width, height} = event.nativeEvent.layout;
		const {icon} = this.state;
		const iconMap = icon.map(ii => {
			if (ii.key === item.key) {
				return {
					...ii,
					y: y,
				};
			}
			return {
				...ii,
			};
		});
		this.setState({icon: iconMap});
	};

	onScrollViewScroll = y => {
		this.props.onScrollViewScroll && this.props.onScrollViewScroll(y);
	};

	render() {
		const {mobilize, digitalBank, icon, loading} = this.state;
		return loading ? (
			<Loading />
		) : (
			<View style={styles.container}>
				<Icon
					onScrollViewScroll={this.onScrollViewScroll}
					data={icon}
				/>
				{mobilize.map((item, index) => (
					<View onLayout={this._onLayout(item)} key={`${index}`}>
						<Mobilize
							title={item.title || ''}
							listType={[
								'highlight',
								'text',
								'text',
								'text',
								'text',
								'text',
								'text',
								'text',
								'text',
							]}
							listBorderRight={[1, 0, 0, 0, 0, 0, 0, 0, 0]}
							data={item.data || []}
							rows={[
								'contractNumber',
								'productCode',
								'productName',
								'balance',
								'currency',
								'balanceQd',
								'sOpenDate',
								'sExpiredDate',
								'sbussinessDate',
							]}
							headers={[
								'Số HĐ/TK',
								'Mã SP',
								'Tên SP',
								'Số dư',
								'Tiền tệ',
								'Số dư quy đổi',
								'Ngày mở',
								'Ngày đáo hạn',
								'Ngày dữ liệu',
							]}
						/>
					</View>
				))}
				<View onLayout={this._digitalLayOut}>
					<DigitalBank
						listType={['text', 'image', 'text']}
						data={digitalBank}
						headers={['Tên', 'Sử dụng', 'Doanh số']}
						rows={['name', 'suDung', 'doanhSo']}
					/>
				</View>
			</View>
		);
	}
}
export default ProductAndService;
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerStyles: {
		paddingHorizontal: 0,
		paddingTop: 0,
	},
});
