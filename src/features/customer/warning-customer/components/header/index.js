import React from 'react';
import {View, Switch} from 'react-native';
import styles from './styles';
import {AppNormalText} from 'components/text';
import AppPopupMenuWithCheck from 'components/popup-menu-with-check';
import _ from 'lodash';
import themes from 'assets/themes';
import {STATUS, TYPE_WARNING, DATE_OF_MATURITY} from '../../contants';
import MenuFilter from 'components/menu-filter';

export default class Header extends React.PureComponent {
	_renderMenuStatus = () => {
		let filteredItem = _.filter(STATUS, ['key', this.props.status]);
		let titleMenu = (filteredItem.length && filteredItem[0].text) || '';
		return <MenuFilter titleMenu={titleMenu} />;
	};

	_onSelectStatus = item => {
		this.props.onSelectStatus && this.props.onSelectStatus(item);
	};

	_renderMenuTypeWarning = () => {
		let filteredItem = _.filter(TYPE_WARNING, [
			'key',
			this.props.typeWarning,
		]);
		let titleMenu = (filteredItem.length && filteredItem[0].text) || '';
		return <MenuFilter titleMenu={titleMenu} />;
	};

	_onSelectTypeWarning = item => {
		this.props.onSelectTypeWarning && this.props.onSelectTypeWarning(item);
	};

	_renderMenuDateOfMaturity = () => {
		let filteredItem = _.filter(DATE_OF_MATURITY, [
			'key',
			this.props.dateOfMaturity,
		]);
		let titleMenu = (filteredItem.length && filteredItem[0].text) || '';
		return <MenuFilter titleMenu={titleMenu} />;
	};

	_onSelectTypeDateOfMaturity = item => {
		this.props.onSelectDateOfMaturity &&
			this.props.onSelectDateOfMaturity(item);
	};

	_onChangeValueGroupByCustomer = () => {
		this.props.onChangeValueGroupByCustomer &&
			this.props.onChangeValueGroupByCustomer();
	};

	render() {
		return (
			<View style={styles.viewFilter}>
				<View style={styles.itemRow}>
					<View style={styles.itemFilter}>
						<AppNormalText type={'BODY1'} text={'condition'} />
						<AppPopupMenuWithCheck
							triggerElement={this._renderMenuStatus()}
							data={STATUS}
							onPress={this._onSelectStatus}
							selectedIndex={STATUS.findIndex(
								item => item.key === this.props.status,
							)}
						/>
					</View>
				</View>

				<View style={styles.itemFilter}>
					<AppNormalText type={'BODY1'} text={'type_warning'} />
					<AppPopupMenuWithCheck
						triggerElement={this._renderMenuTypeWarning()}
						data={TYPE_WARNING}
						onPress={this._onSelectTypeWarning}
						selectedIndex={STATUS.findIndex(
							item => item.key === this.props.typeWarning,
						)}
					/>
				</View>

				<View style={styles.itemFilter}>
					<AppNormalText type={'BODY1'} text={'date_of_maturity'} />
					<AppPopupMenuWithCheck
						triggerElement={this._renderMenuDateOfMaturity()}
						data={DATE_OF_MATURITY}
						onPress={this._onSelectTypeDateOfMaturity}
						selectedIndex={DATE_OF_MATURITY.findIndex(
							item => item.key === this.props.dateOfMaturity,
						)}
					/>
				</View>
				<View style={{flexDirection: 'row'}}>
					<Switch
						trackColor={{true: themes.getColor('blueXViolet')}}
						thumbColor={
							this.props.isGroupByCustomer
								? themes.getColor('mainColor')
								: themes.getColor('grayLight')
						}
						value={this.props.isGroupByCustomer}
						onValueChange={this._onChangeValueGroupByCustomer}
					/>
					<AppNormalText
						text={'group_by_customer'}
						IStyles={{marginTop: 4}}
					/>
				</View>
			</View>
		);
	}
}
