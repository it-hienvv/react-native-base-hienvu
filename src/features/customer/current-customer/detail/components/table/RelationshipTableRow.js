import React from 'react';
import {View, Image} from 'react-native';
import {AppTextWithoutTranslate} from 'components/text';
import _ from 'lodash';
import {PADDING_COMMON} from 'contants/themes/size';
import themes from 'assets/themes';
import {defaultText} from '../../contants';
import {getCurrentTimeMilliseconds} from 'utils/date-times';

class RelationshipTableRow extends React.Component {
	_renderType({value, index}) {
		const {listType = []} = this.props;
		switch (listType[index]) {
			case 'text':
				return (
					<AppTextWithoutTranslate
						text={value || defaultText}
						type={'BODY1'}
						IStyles={{
							alignSelf: 'flex-end',
							paddingVertical: 10,
						}}
					/>
				);
			case 'image':
				value = parseInt(value);
				return value ? (
					<Image
						style={{
							width: 16,
							height: 16,
							alignSelf: 'flex-end',
						}}
						resizeMode={'contain'}
						source={themes.getImages('checkmark')}
					/>
				) : (
					<Image
						style={{
							width: 12,
							height: 12,
							alignSelf: 'flex-end',
						}}
						resizeMode={'contain'}
						source={themes.getImages('cancel')}
					/>
				);
			default:
				return (
					<AppTextWithoutTranslate
						text={value || defaultText}
						type={'BODY1'}
						IStyles={{
							alignSelf: 'flex-end',
							paddingVertical: 10,
						}}
					/>
				);
		}
	}

	_renderWithRowDiv(item) {
		const {rows = [], listBorderRight = []} = this.props;
		return (
			<View style={{flex: 1, flexDirection: 'row', height: 100}}>
				<View
					style={{
						flex: 1,
						height: 100,
						flexDirection: 'row',
						borderRightWidth: 1,
						borderRightColor: themes.getColor('grayLight'),
						borderBottomColor: themes.getColor('grayLight'),
						borderBottomWidth: 1,
					}}>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							paddingHorizontal: PADDING_COMMON,
						}}>
						<AppTextWithoutTranslate
							text={item.label || defaultText}
							type={'BODY1'}
						/>
					</View>
					<View
						style={{
							flex: 3,
						}}>
						{item.list.map((eee, iii) => {
							return (
								<View
									style={{
										paddingHorizontal: PADDING_COMMON,
										borderWidth: 0.5,
										borderColor: themes.getColor(
											'grayLight',
										),
										flex: 1,
										justifyContent: 'center',
									}}
									key={`${iii}`}>
									<AppTextWithoutTranslate
										text={eee[rows[0]] || defaultText}
										type={'BODY1'}
										IStyles={{
											alignSelf: 'flex-start',
											paddingVertical: 10,
										}}
									/>
								</View>
							);
						})}
					</View>
				</View>

				<View style={{flex: 1}}>
					{item.list.map((iii, index) => {
						return (
							<View
								key={`${iii}_${index}`}
								style={{
									flex: 1,
									flexDirection: 'row',
									justifyContent: 'space-between',
									borderBottomWidth: 1,
									borderBottomColor: '#ccc',
								}}>
								<View
									style={{
										flex: 1,
										flexDirection: 'row',
										paddingHorizontal: PADDING_COMMON,
									}}>
									{rows.map((ele, index) => {
										if (index > 0) {
											return (
												<View
													key={index}
													style={{
														flex: 1,
														borderRightWidth:
															listBorderRight[
																index
															] || 0,
														borderRightColor: themes.getColor(
															'grayLight',
														),
														justifyContent:
															'center',
													}}>
													{this._renderType({
														value: iii[ele],
														index,
													})}
												</View>
											);
										}
									})}
								</View>
							</View>
						);
					})}
				</View>
			</View>
		);
	}

	render() {
		const {item, rows = [], listBorderRight = []} = this.props;
		return item && item.key ? (
			item.rowDiv ? (
				this._renderWithRowDiv(item)
			) : (
				<View
					style={{
						flex: 1,
						borderBottomWidth: 1,
						borderBottomColor: themes.getColor('grayLight'),
						paddingHorizontal: PADDING_COMMON,
						backgroundColor: themes.getColor('background'),
						flexDirection: 'row',
						alignItems: 'center',
					}}>
					<Image
						style={{
							width: 14,
							height: 14,
							marginRight: 5,
							tintColor: themes.getColor('grayBold'),
						}}
						resizeMode={'contain'}
						source={themes.getImages('minus')}
					/>

					<AppTextWithoutTranslate
						text={item.label || defaultText}
						IStyles={{
							color: themes.getColor('mainColor'),
							alignSelf: 'flex-start',
							paddingVertical: 10,
						}}
						type={'BLOCK-HEADER2'}
					/>
				</View>
			)
		) : (
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderBottomColor: '#ccc',
				}}>
				<View
					style={{
						flex: 1,
						paddingHorizontal: PADDING_COMMON,
						borderRightWidth: listBorderRight[0] || 0,
						borderRightColor: themes.getColor('grayLight'),
					}}>
					<AppTextWithoutTranslate
						text={item[rows[0]] || defaultText}
						type={'BODY1'}
						IStyles={{
							alignSelf: 'flex-start',
							paddingVertical: 10,
							color: '#262626',
						}}
					/>
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						paddingHorizontal: PADDING_COMMON,
					}}>
					{rows.map((ele, index) => {
						if (index > 0) {
							return (
								<View
									key={index}
									style={{
										flex: 1,
										borderRightWidth:
											listBorderRight[index] || 0,
										borderRightColor: themes.getColor(
											'grayLight',
										),
										justifyContent: 'center',
									}}>
									{this._renderType({
										value: item[ele],
										index,
									})}
								</View>
							);
						}
					})}
				</View>
			</View>
		);
	}
}

export default RelationshipTableRow;
