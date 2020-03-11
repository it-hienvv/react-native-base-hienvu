import React from 'react';
import {View, Image} from 'react-native';
import _ from 'lodash';
import {AppTextWithoutTranslate, AppNormalText} from 'components/text';
import {AppImages} from 'components/image';
import {mainNavigationService} from 'routers/managerNavigator';
import * as screenNames from 'routers/screenNames';
import themes from 'assets/themes';
import {ID_REJECT} from '../../contants';
import PopupAction from '../PopupmenuAction';
import styles from './styles';
const paddingVerticalHeader = 10;
const headerPaddingLeft = 10;

export default class WarningCustomerListItem extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			accounts: [],
			listSysCatType: [],
			listSysCat: [],
			total: 0,
			listContacts: [],
			listLeadContacts: [],
			accountContacts: [],
		};
	}

	_onAfterCall = item => type => {
		console.log('_onAfterCall item', item, type);
		this.props.onAfterCall && this.props.onAfterCall(item, type);
	};

	_renderOptionControl(item) {
		const branchNameText =
			item.branchCode && item.branchName
				? `${item.branchCode} - ${item.branchName}`
				: item.branchCode
				? item.branchCode
				: '';
		return (
			<View style={styles.viewOptionControl}>
				<View style={{flex: 1}}>
					<AppTextWithoutTranslate
						IProps={styles.textItemRowProps}
						type={'BODY1'}
						text={branchNameText}
					/>
				</View>

				<PopupAction
					key={'3'}
					listContacts={this.props.listContacts}
					listLeadContacts={this.props.accountContacts}
					listSysCat={this.props.listSysCat}
					item={item}
					triggerElement={
						<AppImages
							ButtonProps={{disabled: true}}
							uri={themes.getImages('threeDot')}
							ImageStyle={styles.threeDot}
						/>
					}
					onShowDetail={this._onViewDetail.bind(this, item)}
					onEdit={this._onEdit(item)}
					onAfterCall={this._onAfterCall(item)}
				/>
			</View>
		);
	}

	_renderRankerWithBagger(item, index) {
		let borderColor = themes.getColor('red');
		let backgroundColor = themes.getColor('backgroundYellow');
		switch ((item?.phanKhucKh || '').toUpperCase()) {
			case 'VỪA':
				borderColor = themes.getColor('blue');
				backgroundColor = themes.getColor('backgroundBlue');
				break;
			case 'NHỎ':
				borderColor = themes.getColor('greenOption');
				backgroundColor = themes.getColor('backgroundGreen');
				break;
			default:
				break;
		}
		return (
			<View style={styles.viewBagger}>
				<View style={styles.leftBagger}>
					<AppTextWithoutTranslate
						type={'BODY1'}
						text={`${item.code} . `}
						IStyles={{
							color: themes.getColor('mainColor'),
						}}
						IProps={styles.textItemRowProps}>
						<AppTextWithoutTranslate
							type={'BODY1'}
							text={item.name}
						/>
					</AppTextWithoutTranslate>
				</View>
				{!!item?.phanKhucKh && (
					<View
						style={[styles.ranker, {backgroundColor, borderColor}]}>
						<AppTextWithoutTranslate
							type={'BODY2'}
							IStyles={{color: borderColor}}
							text={(item?.phanKhucKh || '').toUpperCase()}
						/>
					</View>
				)}
			</View>
		);
	}

	_onViewDetail = element => {
		mainNavigationService.navigate(screenNames.DETAIL_CURRENT_CUSTOMER, {
			accountId: element.accountId,
		});
	};

	_onEdit = element => () => {
		const {listSysCatType, listSysCat} = this.props;
		mainNavigationService.navigate(screenNames.EDIT_CUSTOMER, {
			basicInfo: element,
			element,
			listSysCatType,
			listSysCat,
			funcReloadData: this._onLoadData,
		});
	};

	_getDisplayEmployee = item => {
		if (item.employeeCode && item.employeeName) {
			return `${item.employeeCode} - ${item.employeeName}`;
		} else if (item.employeeCode) {
			return item.employeeCode;
		} else if (item.employeeName) {
			return item.employeeName;
		}
		return '';
	};

	render = () => {
		const {
			listFlex = [],
			item,
			index,
			sectionId,
			sectionIndex,
		} = this.props;
		const sum = listFlex.reduce((init, item) => (init += item), 0);
		const flexItem = listFlex.map((item, index) => {
			return {
				flex: item / sum,
				borderRightWidth: index === 0 ? 0.5 : 0,
			};
		});

		return (
			<View style={styles.table}>
				{flexItem.map((_item, _index) => {
					return (
						<View
							key={`${index}_${_index}`}
							style={[
								{justifyContent: 'flex-start'},
								{paddingLeft: headerPaddingLeft},
								{paddingVertical: paddingVerticalHeader},
								{borderColor: themes.getColor('grayLight')},
								{..._item},
							]}>
							{_index === 0
								? this._renderRankerWithBagger(item, index)
								: null}
							{_index === 1 ? (
								<AppTextWithoutTranslate
									IProps={styles.textItemRowProps}
									type={'BODY1'}
									text={item.phone || ''}
								/>
							) : null}

							{_index === 2 ? (
								<AppTextWithoutTranslate
									IProps={styles.textItemRowProps}
									type={'BODY1'}
									text={item.taxCode || ''}
								/>
							) : null}

							{_index === 3 ? (
								<AppTextWithoutTranslate
									IProps={styles.textItemRowProps}
									type={'BODY1'}
									text={item.doiTuong || ''}
								/>
							) : null}

							{_index === 4 ? (
								<AppTextWithoutTranslate
									IProps={styles.textItemRowProps}
									type={'BODY1'}
									text={this._getDisplayEmployee(item)}
								/>
							) : null}

							{_index === 5
								? this._renderOptionControl(item)
								: null}
						</View>
					);
				})}
			</View>
		);
	};
}
