import React from 'react';
import {View, Text} from 'react-native';
import {AppTextWithoutTranslate} from 'components/text';
import {formatMoney} from 'utils/util';
import {AppImages} from 'components/image';
import Themes from 'assets/themes';
import AppPopupMenu from 'components/popup-menu';
import _ from 'lodash';
import themes from 'assets/themes';
// import { PADDING_COMMON } from 'contants/themes/size';

class TableRowType1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {widthColumn, item, rows = [], indexsNumber = []} = this.props;
		const obj = _.pickBy(item, (value, key) => rows.includes(key));
		const values = Object.values(obj);
		const isGreater =
			values[values.length - 1] > values[values.length - 2]
				? true
				: values[values.length - 1] < values[values.length - 2]
				? false
				: null;
		return (
			<View
				key={item.id}
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderBottomColor: '#ccc',
					// marginRight: PADDING_COMMON
				}}>
				{values.map((element, index) => {
					const isRightSide = indexsNumber.includes(index);
					return (
						<View
							key={index}
							style={[
								{
									width: `${widthColumn}%`,
									borderRightColor: '#ccc',
									justifyContent: 'center',
									alignItems:
										index === 0
											? 'center'
											: isRightSide
											? 'flex-end'
											: 'flex-start',
								},
								index === 0 && {
									width: '10%',
									borderRightWidth: 1,
								},
							]}>
							{index === values.length - 1 ? (
								<View
									style={{
										flexDirection: 'row',
										marginRight: 40,
									}}>
									<AppTextWithoutTranslate
										text={
											typeof element === 'number' &&
											element.toString().length >= 4
												? formatMoney(element)
												: element
										}
									/>
									<AppImages
										ButtonProps={{disabled: true}}
										ImageStyle={{
											width: 12,
											height: 12,
											opacity: isGreater === null ? 0 : 1,
											top: 2,
										}}
										uri={
											isGreater
												? require('assets/images/icon/up-arrow.png')
												: require('assets/images/icon/down-arrow.png')
										}
									/>
								</View>
							) : (
								<AppTextWithoutTranslate
									text={
										typeof element === 'number' &&
										element.toString().length >= 4
											? formatMoney(element)
											: element
									}
									type={'BODY1'}
									IStyles={{
										paddingVertical: 10,
										color: '#262626',
									}}
								/>
							)}
						</View>
					);
				})}
				<View
					style={{
						position: 'absolute',
						right: 0,
						alignSelf: 'center',
					}}>
					<AppPopupMenu
						// onPress={this._onPressFilterTable}
						key={'3'}
						// data={menuList}
						triggerElement={
							<AppImages
								ButtonProps={{disabled: true}}
								// ImageStyle={styles.image}
								uri={require('assets/images/icon/three-dot.png')}
							/>
						}
					/>
				</View>
			</View>
		);
	}
}

export default TableRowType1;
