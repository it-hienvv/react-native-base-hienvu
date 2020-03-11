import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
	WIDTH_SCREEN,
	isIos,
	makePhoneCall,
	makePhoneSMS,
	makePhoneEmail,
} from 'utils/util';
import {AppTextWithoutTranslate} from 'components/text';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {AppModalManager} from 'components/app-modal/Manager';
import I18nTran from 'assets/language';
import {PADDING_COMMON} from 'contants/themes/size';
import _ from 'lodash';
import AppFlatList from 'components/flatlist/flatlist';
import {ACTION_TYPE} from '../contants';

let defaultProps = {
	listFlex: [1, 3, 3, 5],
	listHeader: [
		{id: '0', title: '#'},
		{id: '1', title: I18nTran.t('name')},
		{id: '2', title: I18nTran.t('object')},
		{id: '3', title: I18nTran.t('phone_number')},
	],
	type: ACTION_TYPE.call,
};

const headerPaddingLeft = 10;

class ModalContact extends React.PureComponent {
	static defaultProps = defaultProps;
	constructor(props) {
		super(props);
	}
	_onCancel = () => {
		AppModalManager.hiddenModalWithJSX();
	};

	_renderListContact() {
		return (
			<AppFlatList
				data={this.props.contactsConverted}
				renderItem={this._renderItem}
				keyExtractor={this._keyExtractor}
			/>
		);
	}

	_onPressAction = (phone, email) => () => {
		AppModalManager.hiddenModalWithJSX();
		switch (this.props.type) {
			case ACTION_TYPE.call:
				makePhoneCall(phone.toString());
				break;
			case ACTION_TYPE.message:
				makePhoneSMS({phone: phone.toString(), message: ''});
				break;
			case ACTION_TYPE.email:
				makePhoneEmail({to: email, subject: '', body: ''});
				break;
			default:
				break;
		}
		this.props.onAfterCall && setTimeout(this.props.onAfterCall, 3000);
	};

	_renderItem = ({item, index}) => {
		const {type} = this.props;
		if (
			((type === ACTION_TYPE.call || type === ACTION_TYPE.message) &&
				!item.phone) ||
			(type === ACTION_TYPE.email && !item.email)
		)
			return null;
		const {listFlex} = this.props;
		const sum = listFlex.reduce((init, item) => (init += item), 0);
		const flexItem = listFlex.map((item, index) => {
			return {
				flex: item / sum,
				borderRightWidth: index === 0 || index === 1 ? 0.5 : 0,
				alignItems: index === 0 ? 'center' : 'flex-start',
				paddingLeft: index !== 0 ? headerPaddingLeft : 0,
			};
		});
		let uri = themes.getImages('actionCall');
		if (type === ACTION_TYPE.message) {
			uri = themes.getImages('actionMessage');
		} else if (type === ACTION_TYPE.email) {
			uri = themes.getImages('actionEmail');
		}
		return (
			<View style={styles.table}>
				{flexItem.map((_item, _index) => {
					return (
						<View
							key={`${index}_${_index}`}
							style={[
								{
									borderColor: themes.getColor('grayLight'),
									justifyContent: 'center',
								},
								{..._item},
							]}>
							{_index === 0 ? (
								<AppTextWithoutTranslate
									text={index + 1}
									IStyles={{alignItems: 'center'}}
								/>
							) : null}
							{_index === 1 ? (
								<AppTextWithoutTranslate
									text={item.fullName || '---'}
								/>
							) : null}
							{_index === 2 ? (
								<AppTextWithoutTranslate
									text={item.namePosition || '---'}
								/>
							) : null}
							{_index === 3 ? (
								<TouchableOpacity
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
									onPress={this._onPressAction(
										item.phone,
										item.email,
									)}>
									<AppTextWithoutTranslate
										text={
											type === ACTION_TYPE.email
												? item.email
												: item.phone
										}
										IStyles={{
											color: themes.getColor('mainColor'),
											width: '80%',
										}}
										IProps={{
											numberOfLines: 1,
											ellipsizeMode: 'tail',
										}}
									/>
									<AppImages uri={uri} ButtonProps={{ disabled: true }}/>
								</TouchableOpacity>
							) : null}
						</View>
					);
				})}
			</View>
		);
	};

	_renderHeader() {
		const {listFlex, listHeader, type} = this.props;
		const sum = listFlex.reduce((init, item) => (init += item), 0);
		const flexItem = listFlex.map((item, index) => {
			return {
				flex: item / sum,
				borderRightWidth: index === 0 || index === 1 ? 0.5 : 0,
				alignItems: index === 0 ? 'center' : 'flex-start',
				paddingLeft: index !== 0 ? headerPaddingLeft : 0,
			};
		});
		return (
			<View style={styles.header}>
				{flexItem.map((item, index) => {
					return (
						<View
							key={`${index}`}
							style={[styles.viewItemHeader, {...item}]}>
							<AppTextWithoutTranslate
								type={'BODY1'}
								IStyles={{
									flex: 1,
									color: themes.getColor('blackLight'),
									textAlignVertical: 'center',
									marginTop: isIos ? 10 : 0,
								}}
								text={
									index === 3 && type === ACTION_TYPE.email
										? I18nTran.t('email')
										: listHeader[index].title
								}
							/>
						</View>
					);
				})}
			</View>
		);
	}

	_keyExtractor = (item, index) => `${index}`;

	render() {
		return (
			<View style={styles.wrapper}>
				<View style={styles.viewHeader}>
					<AppTextWithoutTranslate
						type={'H2'}
						text={I18nTran.t(this.props.title)}
						IStyles={{
							fontWeight: '600',
						}}
					/>
					<AppImages
						ButtonProps={{onPress: this._onCancel}}
						uri={themes.getImages('cancelModal')}
						ImageStyle={styles.cancelImage}
					/>
				</View>
				<View style={styles.viewBody}>
					<View style={{maxHeight: 240}}>
						{this._renderHeader()}
						{this._renderListContact()}
					</View>
				</View>
			</View>
		);
	}
}

export default ModalContact;

const styles = StyleSheet.create({
	textItem: {
		color: themes.getColor('mainColor'),
		textAlignVertical: 'center',
		marginLeft: 10,
	},
	viewItem: {marginTop: 15, flexDirection: 'row'},
	wrapper: {
		width: WIDTH_SCREEN / 2,
		height: 320,
		backgroundColor: themes.getColor('white'),
		borderRadius: 10,
	},
	viewHeader: {
		width: '100%',
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderColor: themes.getColor('grayLight'),
		paddingLeft: 30,
		paddingRight: 15,
	},
	viewBody: {
		paddingBottom: PADDING_COMMON,
		flex: 1,
		width: '100%',
	},
	cancelImage: {
		width: 25,
		height: 25,
	},
	header: {
		flexDirection: 'row',
		borderTopWidth: 0.5,
		borderColor: themes.getColor('grayLight'),
		height: 40,
	},
	viewItemHeader: {
		flex: 1,
		alignItems: 'flex-start',
		borderRightColor: themes.getColor('grayLight'),
		backgroundColor: themes.getColor('background'),
	},
	table: {
		flexDirection: 'row',
		borderTopWidth: 0.5,
		borderBottomWidth: 0.5,
		borderColor: themes.getColor('grayLight'),
		minHeight: 50,
	},
});
