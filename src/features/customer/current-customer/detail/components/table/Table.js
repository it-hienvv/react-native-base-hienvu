import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AppNormalText} from 'components/text';
import TableRow from './TableRow';
import TableRowHeader from './TableRowHeader';
import EmptyComp from 'components/empty-comp';
import AppFlatList from 'components/flatlist/flatlist';
import {PADDING_COMMON} from 'contants/themes/size';
import RelationshipTableHeader from './RelationshipTableHeader';
import RelationshipTableRow from './RelationshipTableRow';

class TableDetail extends React.Component {
	static defaultProps = {
		type: 0,
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	_renderListHeaderComponent = () => {
		const {type, headers, listBorderRight} = this.props;
		if (type === 0) {
			return (
				<RelationshipTableHeader
					listBorderRight={listBorderRight}
					headers={headers}
				/>
			);
		}
		return (
			<TableRowHeader
				listBorderRight={listBorderRight}
				headers={headers}
			/>
		);
	};

	_renderItem = ({item, index}) => {
		const {rows, listType, type, listBorderRight} = this.props;
		if (type === 0) {
			return (
				<RelationshipTableRow
					listBorderRight={listBorderRight}
					item={item}
					rows={rows}
					listType={listType}
				/>
			);
		}
		return (
			<TableRow
				listBorderRight={listBorderRight}
				listType={listType}
				item={item}
				rows={rows}
			/>
		);
	};

	_keyExtractor = (item, index) => `${index}`;

	render() {
		const {tableTitle, data, styleProps} = this.props;
		return (
			<View style={[styles.container, styleProps]}>
				{tableTitle && (
					<View style={styles.header}>
						{<AppNormalText text={tableTitle} type={'H2'} />}
					</View>
				)}
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					{data && data.length !== 0 ? (
						<AppFlatList
							data={data}
							nestedScrollEnabled={true}
							ListHeaderComponent={
								this._renderListHeaderComponent
							}
							renderItem={this._renderItem}
							keyExtractor={this._keyExtractor}
						/>
					) : (
						<EmptyComp />
					)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: PADDING_COMMON,
		borderRadius: 10,
		backgroundColor: '#FFFFFF',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},

	header: {
		width: '100%',
		padding: PADDING_COMMON,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	textHeader: {
		color: '#0A263D',
	},
});
export default TableDetail;
