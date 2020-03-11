import React from 'react';
import {View} from 'react-native';
import {AppTextWithoutTranslate, AppNormalText} from 'components/text';
import {formatMoney} from 'utils/util';
import themes from 'assets/themes';
// import { PADDING_COMMON } from 'contants/themes/size';

class TableRowHeaderType1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {widthColumn, item, headers = [], indexsNumber = []} = this.props;
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderColor: '#ccc',
					borderTopWidth: 1,
					backgroundColor: themes.getColor('backgroundBlue'),
					// marginRight: PADDING_COMMON
				}}>
				{headers.map((element, index) => (
					<View
						key={index}
						style={[
							{
								width: `${widthColumn}%`,
								borderRightColor: '#ccc',
							},
							index === 0 && {width: '10%', borderRightWidth: 1},
						]}>
						<AppTextWithoutTranslate
							text={element}
							type={'BODY1'}
							IStyles={{
								alignSelf:
									index === 0
										? 'center'
										: indexsNumber.includes(index)
										? 'flex-end'
										: 'flex-start',
								paddingVertical: 10,
								marginRight:
									index === item.length - 1 ? 40 : null,
								color: '#7B7B7B',
							}}
						/>
					</View>
				))}
			</View>
		);
	}
}

export default TableRowHeaderType1;
