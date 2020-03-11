import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {AppTextWithoutTranslate} from 'components/text';
import _ from 'lodash';
import themes from 'assets/themes';
import CallPhonePopup from '../common-information/callPhonePopup';
import {defaultText} from '../../contants';
import {formatDate} from 'utils/date-times';

class TableRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	_renderType({value, index}) {
		const {listType} = this.props;
		switch (listType[index]) {
			case 'text':
				return (
					<AppTextWithoutTranslate
						text={value || defaultText}
						type={'BODY1'}
						IStyles={{
							alignSelf: 'center',
							paddingVertical: 10,
						}}
					/>
				);
			case 'date':
				return (
					<AppTextWithoutTranslate
						text={value ? formatDate(value) : defaultText}
						type={'BODY1'}
						IStyles={{
							alignSelf: 'center',
							paddingVertical: 10,
						}}
					/>
				);
			case 'highlight': {
				return (
					<AppTextWithoutTranslate
						text={value || defaultText}
						type={'BODY1'}
						IStyles={{
							alignSelf: 'center',
							paddingVertical: 10,
							color: themes.getColor('mainColor'),
						}}
					/>
				);
			}
			case 'phone': {
				const data = value ? [{phone: value}] : [];
				return (
					<CallPhonePopup
						type={'phone'}
						data={data}
						triggerElement={
							<View
								style={{
									flexDirection: 'row',
									alignSelf: 'center',
								}}>
								<AppTextWithoutTranslate
									text={value || defaultText}
									type={'BODY1'}
									IStyles={[
										{
											alignSelf: 'center',
											paddingVertical: 10,
										},

										value && {
											color: themes.getColor('mainColor'),
										},
									]}
								/>
								{!!value && (
									<View
										style={{
											height: 14,
											paddingVertical: 3,
											paddingHorizontal: 5,
											borderColor: themes.getColor(
												'grayLight',
											),
											borderWidth: 1,
											borderRadius: 3,
											alignItems: 'center',
											justifyContent: 'center',
											alignSelf: 'center',
											marginHorizontal: 5,
										}}>
										<AppTextWithoutTranslate
											type={'CAPTION'}
											text={data.length}
										/>
									</View>
								)}
								{!!value && (
									<Image
										style={styles.image}
										source={themes.getImages('dropDown')}
									/>
								)}
							</View>
						}
					/>
				);
			}
			case 'email':
				const data = value ? [{email: value}] : [];
				return (
					<CallPhonePopup
						type={'email'}
						data={data}
						triggerElement={
							<View
								style={{
									flexDirection: 'row',
									alignSelf: 'center',
								}}>
								<AppTextWithoutTranslate
									text={value || defaultText}
									type={'BODY1'}
									IStyles={[
										{
											alignSelf: 'center',
											paddingVertical: 10,
										},

										value && {
											color: themes.getColor('mainColor'),
										},
									]}
								/>
								{!!value && (
									<View
										style={{
											height: 14,
											paddingVertical: 3,
											paddingHorizontal: 5,
											borderColor: themes.getColor(
												'grayLight',
											),
											borderWidth: 1,
											borderRadius: 3,
											alignItems: 'center',
											justifyContent: 'center',
											alignSelf: 'center',
											marginHorizontal: 5,
										}}>
										<AppTextWithoutTranslate
											type={'CAPTION'}
											text={data.length}
										/>
									</View>
								)}
								{!!value && (
									<Image
										style={styles.image}
										source={themes.getImages('dropDown')}
									/>
								)}
							</View>
						}
					/>
				);
			default:
				return (
					<AppTextWithoutTranslate
						text={value || defaultText}
						type={'BODY1'}
						IStyles={{
							alignSelf: 'center',
							paddingVertical: 10,
						}}
					/>
				);
		}
	}

	render() {
		const {rows = [], item, listBorderRight = []} = this.props;
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderBottomColor: themes.getColor('grayLight'),
				}}>
				{rows.map((element, index) => (
					<View
						key={index}
						style={[
							{
								flex: 1,
								borderRightColor: themes.getColor('grayLight'),
								borderRightWidth: listBorderRight[index] || 0,
							},
						]}>
						{this._renderType({value: item[element], index})}
					</View>
				))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	image: {
		width: 16,
		height: 16,
		resizeMode: 'contain',
		alignSelf: 'center',
	},
});

export default TableRow;
