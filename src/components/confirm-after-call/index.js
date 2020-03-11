import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {WIDTH_SCREEN, AppAlertOnlyOkayWithOutTranslate} from 'utils/util';
import {BOTTOM_WIDTH_SIZE, PADDING_COMMON} from 'contants/themes/size';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {AppNormalText, AppTextWithoutTranslate} from 'components/text';
import {AppButton} from 'components/button';
import {SHALLOW_STYLE} from 'contants/themes';
import _ from 'lodash';
import {
	ACTION_TYPE,
	STATUS_CHANGE_ONE,
} from 'features/customer/clue-customer/clue/contants';
import I18nTran from 'assets/language';
import AppPopupMenuWithCheck from 'components/popup-menu-with-check';

const defaultProps = {
	company: 'Công ty trách nhiệm hữu hạn VinFast-Vin-group',
	type: ACTION_TYPE.call,
	onClose: () => {},
	item: {},
};

export default class ConfirmViewAfterCall extends React.PureComponent {
	static defaultProps = defaultProps;
	_renderTitle() {
		const {type} = this.props;
		let action = I18nTran.t('call');
		switch (type) {
			case ACTION_TYPE.message:
				action = I18nTran.t('send_message');
				break;
			case ACTION_TYPE.email:
				action = I18nTran.t('send_email');
				break;
			default:
				break;
		}
		return (
			<View style={styles.titleView}>
				<View style={styles.textTitleView}>
					<Text style={{alignSelf: 'flex-start'}} numberOfLines={0}>
						<AppNormalText
							text={'you_done_action'}
							option={{action: `${action}`}}
						/>
						<AppTextWithoutTranslate
							IStyles={{
								color: themes.getColor('mainColor'),
							}}
							text={`${this.props.item?.name || ''}? `}
						/>
						<AppNormalText text={'record_action'} />
					</Text>
				</View>
				<AppImages
					uri={themes.getImages('cancel')}
					ImageStyle={styles.iconCancel}
					ButtonProps={{onPress: this.props.onClose}}
				/>
			</View>
		);
	}

	_renderUpdateActionStatus() {
		const {item} = this.props;
		return (
			<View style={styles.actionView}>
				<AppNormalText
					type={'H2'}
					IStyles={{alignSelf: 'center'}}
					text={'update_action_status'}
				/>
				<View>
					<AppPopupMenuWithCheck
						triggerElement={this._renderMenuStatus(
							item.smeStatusId,
						)}
						data={STATUS_CHANGE_ONE}
						onPress={statusChoosed => {
							this.props.onChangeOneItem(statusChoosed, item);
						}}
						selectedIndex={item.smeStatusId}
					/>
				</View>
			</View>
		);
	}

	_renderMenuStatus(id) {
		let filteredItem = _.filter(STATUS_CHANGE_ONE, ['key', id]);
		let text = (filteredItem.length && filteredItem[0].text) || '';
		return (
			<View style={styles.triggerMenuStatus}>
				<AppTextWithoutTranslate
					IProps={{
						numberOfLines: 1,
						ellipsizeMode: 'tail',
					}}
					type={'H2'}
					text={`${text}  `}
				/>
				<AppImages
					ButtonProps={{disabled: true}}
					uri={themes.getImages('dropDown')}
					ImageStyle={styles.iconDropDown}
				/>
			</View>
		);
	}

	_renderViewOr() {
		return (
			<View style={styles.orView}>
				<View style={styles.line} />
				<AppNormalText IStyles={{marginHorizontal: 30}} text={'or'} />
				<View style={styles.line} />
			</View>
		);
	}

	_onChangeStepApproach = () => {
		this.props.onClose();
		return AppAlertOnlyOkayWithOutTranslate({
			title: 'Tính năng đang phát triển',
		});
	};

	_renderButton() {
		return (
			<View style={styles.buttonView}>
				<AppButton
					ButtonProps={{onPress: this._onChangeStepApproach}}
					ButtonStyle={styles.button}
					text={'change_approach_step'}
				/>
			</View>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				{this._renderTitle()}
				{this._renderUpdateActionStatus()}
				{this._renderViewOr()}
				{this._renderButton()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: (WIDTH_SCREEN - BOTTOM_WIDTH_SIZE) / 2,
		backgroundColor: 'white',
		padding: PADDING_COMMON,
		...SHALLOW_STYLE,
		position: 'absolute',
		bottom: 10,
		right: 10,
	},
	titleView: {flexDirection: 'row', width: '100%'},
	textTitleView: {flex: 1},
	iconCancel: {
		marginLeft: 20,
		marginTop: -15,
	},
	actionView: {
		flexDirection: 'row',
		marginVertical: 30,
	},
	button: {
		paddingVertical: 15,
		borderWidth: 1,
		borderColor: themes.getColor('grayLight'),
		borderRadius: 5,
	},
	popUpView: {
		flexDirection: 'row',
		marginLeft: 15,
		borderBottomColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	orView: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	line: {
		height: 1,
		backgroundColor: themes.getColor('grayLight'),
		flex: 1,
		alignSelf: 'center',
	},
	buttonView: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	triggerMenuStatus: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
		marginTop: 5,
		paddingBottom: 5,
		paddingHorizontal: 5,
	},
	iconDropDown: {
		width: 15,
		height: 15,
		marginLeft: 10,
		tintColor: themes.getColor('blackLight'),
	},
});
