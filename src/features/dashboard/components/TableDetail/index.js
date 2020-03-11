import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {AppNormalText} from 'components/text';
import TableRow from './TableRowDefault/TableRow';
import PropTypes from 'prop-types';

import styles from './styles/index.css';
import TableRowType1 from './TableRowConfig/TableRowType1';
import TableRowHeader from './TableRowDefault/TableRowHeader';
import TableRowHeaderType1 from './TableRowConfig/TableRowHeaderType1';
import EmptyComp from 'components/empty-comp';
import AppFlatList from 'components/flatlist/flatlist';

class TableDetail extends React.Component {
	static propTypes = {
		tableTitle: PropTypes.string,
		numberOfComlumns: PropTypes.number,
		// data: PropTypes.array,
		type: PropTypes.number,
	};

	static defaultProps = {
		type: 0,
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.widthColumn = 0;
	}

	_renderListHeaderComponent = () => {
		const {data, numberOfColumns, type, headers, indexsNumber} = this.props;
		const keys = Object.keys(data[0]);
		this.widthColumn = Math.floor(90 / numberOfColumns);
		switch (type) {
			case 0:
				return (
					<TableRowHeader
						widthColumn={this.widthColumn}
						item={keys}
						headers={headers}
						indexsNumber={indexsNumber}
					/>
				);
			case 1:
				return (
					<TableRowHeaderType1
						widthColumn={this.widthColumn}
						item={keys}
						headers={headers}
						indexsNumber={indexsNumber}
					/>
				);
			default:
				return (
					<TableRowHeader
						widthColumn={this.widthColumn}
						item={keys}
						headers={headers}
						indexsNumber={indexsNumber}
					/>
				);
		}
	};

	_renderItem = ({item, index}) => {
		const {type, rows, indexsNumber, indexsPhone, indexsMoney} = this.props;
		switch (type) {
			case 0:
				return (
					<TableRow
						widthColumn={this.widthColumn}
						item={item}
						indexStt={index}
						rows={rows}
						indexsNumber={indexsNumber}
						indexsPhone={indexsPhone}
						indexsMoney={indexsMoney}
					/>
				);
			case 1:
				return (
					<TableRowType1
						widthColumn={this.widthColumn}
						item={item}
						rows={rows}
						indexsNumber={indexsNumber}
					/>
				);
			default:
				return (
					<TableRow
						widthColumn={this.widthColumn}
						item={item}
						indexStt={index}
						rows={rows}
						indexsNumber={indexsNumber}
						indexsPhone={indexsPhone}
						indexsMoney={indexsMoney}
					/>
				);
		}
	};

	_keyExtractor = item => `${item.id}`;

	render() {
		const {
			tableTitle,
			rightCompHeader,
			data,
			styleProps,
			hasNoEmptyComp,
		} = this.props;
		return (
			<View style={[styles.container, styleProps]}>
				{tableTitle && (
					<View style={styles.header}>
						{
							<AppNormalText
								text={tableTitle}
								type={'BLOCK-HEADER'}
							/>
						}
						{rightCompHeader}
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
							stickyHeaderIndices={[0]}
							keyExtractor={this._keyExtractor}
						/>
					) : (
						!hasNoEmptyComp && <EmptyComp />
					)}
				</View>
			</View>
		);
	}
}

export default TableDetail;
