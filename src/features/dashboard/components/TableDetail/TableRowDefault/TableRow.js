import React from 'react';
import {View} from 'react-native';
import {AppTextWithoutTranslate} from 'components/text';
import {formatMoney, formatPhoneNumberWithoutAddZero} from 'utils/util';
import _ from 'lodash';

class TableRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			widthColumn,
			item,
			indexStt,
			rows = [],
			indexsNumber = [],
			indexsPhone = [],
			indexsMoney = [],
		} = this.props;
		const values = [];
		rows.forEach((element, index) => {
			const key = element;
			values.push(item[`${key}`] || '--');
		});
		values.unshift(1);
		return (
			<View
				key={indexStt}
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderBottomColor: '#ccc',
				}}>
				{values.map((item, index) => (
					<View
						key={index}
						style={[
							{
								width: `${widthColumn}%`,
								borderRightColor: '#ccc',
							},
							index === 0 && {width: '5%', borderRightWidth: 1},
						]}>
						<AppTextWithoutTranslate
							text={
								index === 0
									? item + indexStt
									: indexsPhone.includes(index)
									? formatPhoneNumberWithoutAddZero(item)
									: indexsMoney.includes(index)
									? formatMoney(item)
									: item
							}
							type={'BODY1'}
							IStyles={{
								alignSelf:
									index === 0
										? 'center'
										: indexsNumber.includes(index)
										? 'flex-end'
										: 'flex-start',
								paddingVertical: 10,
								color: '#262626',
							}}
						/>
					</View>
				))}
			</View>
		);
	}
}

export default TableRow;
