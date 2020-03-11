import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {AppTextWithoutTranslate} from 'components/text';
import CreditRankingTableHeader from './tableHeader';
import EmptyComp from 'components/empty-comp';
import {defaultText} from '../../contants';
import themes from 'assets/themes';

class CreditRankingTableRow extends React.PureComponent {
	_keyExtractor = (item, index) => `${index}`;
	_renderItem = ({item, index}) => {
		const {listFlex = [], rows = []} = this.props;
		return (
			<View
				style={{
					flexDirection: 'row',
				}}>
				{listFlex.map((ele, ii) => (
					<View
						key={`${ii}`}
						style={{
							justifyContent: 'center',
							alignItems: 'flex-start',
							flex: listFlex[ii],
							paddingVertical: 3,
						}}>
						<AppTextWithoutTranslate
							IStyles={
								ii === 0 && {
									color: themes.getColor('mainColor'),
								}
							}
							text={item[rows[ii]] || defaultText}
						/>
					</View>
				))}
			</View>
		);
	};
	render() {
		const {
			listFlex = [],
			data = [],
			headers = [],
			rows = [],
			container,
		} = this.props;
		return (
			<View style={[styles.container, {...container}]}>
				{data.length > 0 ? (
					<View>
						<CreditRankingTableHeader
							headers={headers}
							listFlex={listFlex}
						/>
						<FlatList
							rows={rows}
							listFlex={listFlex}
							data={data}
							keyExtractor={this._keyExtractor}
							renderItem={this._renderItem}
							{...this.props}
						/>
					</View>
				) : (
					<EmptyComp />
				)}
			</View>
		);
	}
}

export default CreditRankingTableRow;

const styles = StyleSheet.create({
	container: {
		// ...SHALLOW_STYLE,
		borderRadius: 10,
		paddingHorizontal: PADDING_COMMON,
	},
});
