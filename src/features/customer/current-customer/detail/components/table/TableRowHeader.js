import React from 'react';
import {View} from 'react-native';
import {AppTextWithoutTranslate} from 'components/text';
import themes from 'assets/themes';

class TableRowHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {headers = [], listBorderRight = []} = this.props;
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderColor: themes.getColor('grayLight'),
					borderTopWidth: 1,
					backgroundColor: themes.getColor('backgroundBlue'),
				}}>
				{headers.map((element, index) => (
					<View
						key={index}
						style={[
							{
								flex: 1,
								borderRightWidth: listBorderRight[index] || 0,
								borderRightColor: themes.getColor('grayLight'),
							},
						]}>
						<AppTextWithoutTranslate
							text={element}
							type={'BODY1'}
							IStyles={{
								alignSelf: 'center',
								paddingVertical: 10,
								color: '#7B7B7B',
							}}
						/>
					</View>
				))}
			</View>
		);
	}
}

export default TableRowHeader;
