import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {keyExtractor} from 'utils/util';
import RowComponent from './RowComponent';
import AppFlatList from 'components/flatlist/flatlist';

class DashboardTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
		};
	}

	onRefreshTable = () => {
		this.setState(
			{
				isLoading: true,
			},
			this.loadTableData,
		);
	};

	loadTableData = () => {
		setTimeout(() => {
			this.setState({isLoading: false});
		}, 1000);
	};

	render() {
		const {tableStyle} = this.props;
		return (
			<View style={[styles.defaultStyle, tableStyle]}>
				<AppFlatList
					data={this.props.tableData}
					renderItem={this._renderTableRow}
					ListHeaderComponent={this._renderTableHeader}
					keyExtractor={keyExtractor}
					nestedScrollEnabled
					refreshing={this.state.isLoading}
					onRefresh={this.onRefreshTable}
				/>
			</View>
		);
	}

	componentDidMount() {
		this.onRefreshTable();
	}

	_renderTableRow = ({item, index}) => {
		const {listColumnWidth} = this.props;
		const rowData = Object.keys(item).map(key => item[key]);
		return (
			<RowComponent rowData={rowData} listColumnWidth={listColumnWidth} />
		);
	};

	_renderTableHeader = () => {
		const {listHeader, listColumnWidth} = this.props;
		return (
			<RowComponent
				rowData={listHeader}
				listColumnWidth={listColumnWidth}
				isHeader
			/>
		);
	};
}

DashboardTable.propTypes = {
	listHeader: PropTypes.array,
	listColumnWidth: PropTypes.array,
	tableData: PropTypes.array,
};

export default DashboardTable;

const styles = StyleSheet.create({
	defaultStyle: {
		borderTopColor: '#BEBEBE',
		borderTopWidth: 0.5,
	},
});
