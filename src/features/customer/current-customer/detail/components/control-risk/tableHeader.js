import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {AppTextWithoutTranslate} from 'components/text';
import {defaultText} from '../../contants';

class CreditRankingTableHeader extends React.PureComponent {
	_keyExtractor = (item, index) => `${index}`;
	_renderItem = ({item, index}) => {
		const {listFlex = [], headers = []} = this.props;
		return (
			<View
				key={`${index}`}
				style={{
					justifyContent: 'center',
					alignItems: 'flex-start',
					flex: listFlex[index],
				}}>
				<AppTextWithoutTranslate text={headers[index] || defaultText} />
			</View>
		);
	};
	render() {
		const {headers = []} = this.props;
		return (
			<View
				style={{
					flexDirection: 'row',
				}}>
				{headers.map((item, index) => this._renderItem({item, index}))}
			</View>
		);
	}
}

export default CreditRankingTableHeader;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 0,
		marginHorizontal: PADDING_COMMON,
		flex: 1,
		marginTop: PADDING_COMMON,
		paddingBottom: 0,
	},
});
