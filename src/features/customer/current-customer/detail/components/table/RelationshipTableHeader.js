import React from 'react';
import {View} from 'react-native';
import {AppTextWithoutTranslate, AppNormalText} from 'components/text';
import {formatMoney, RANDOM_COLOR} from 'utils/util';
import themes from 'assets/themes';
import {PADDING_COMMON} from 'contants/themes/size';
// import { PADDING_COMMON } from 'contants/themes/size';

class RelationshipTableHeader extends React.Component {
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
					borderColor: '#ccc',
					borderTopWidth: 1,
					backgroundColor: themes.getColor('backgroundBlue'),
				}}>
				<View
					style={{
						flex: 1,
						paddingHorizontal: PADDING_COMMON,
						borderRightWidth: listBorderRight[0] || 0,
						borderRightColor: themes.getColor('grayLight'),
					}}>
					<AppTextWithoutTranslate
						text={headers[0]}
						type={'BODY1'}
						IStyles={{
							alignSelf: 'flex-start',
							paddingVertical: 10,
							color: '#7B7B7B',
						}}
					/>
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						paddingHorizontal: PADDING_COMMON,
					}}>
					{headers.map((element, index) => {
						if (index > 0) {
							return (
								<View
									key={`${index}`}
									style={{
										flex: 1,
										borderRightWidth:
											listBorderRight[index] || 0,
										borderRightColor: themes.getColor(
											'grayLight',
										),
									}}>
									<AppTextWithoutTranslate
										text={element}
										type={'BODY1'}
										IStyles={{
											alignSelf: 'flex-end',
											paddingVertical: 10,
											color: '#7B7B7B',
										}}
									/>
								</View>
							);
						}
					})}
				</View>
			</View>
		);
	}
}

export default RelationshipTableHeader;
