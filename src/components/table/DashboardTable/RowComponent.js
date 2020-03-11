import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RowComponent = props => {
	const {rowData, listColumnWidth, isHeader} = props;
	return (
		<View style={[styles.rowContainer, styles.borderTopStyle]}>
			{rowData.map((text, index) => (
				<View
					style={[
						{flex: listColumnWidth[index]},
						isHeader ? styles.tableHeaderStyle : styles.rowStyle,
						styles.fieldStyle,
						index == 0 ? styles.firstColumnStyle : null,
					]}
					key={index}>
					<Text
						style={
							index == 0
								? styles.textAlignRight
								: styles.textAlignLeft
						}>
						{text}
					</Text>
				</View>
			))}
		</View>
	);
};

export default RowComponent;

const styles = StyleSheet.create({
	textAlignLeft: {textAlign: 'left'},
	textAlignRight: {textAlign: 'right'},
	rowContainer: {
		width: '100%',
		flexDirection: 'row',
	},
	tableHeaderStyle: {
		backgroundColor: '#B9D3EE',
		paddingVertical: 5,
	},
	rowStyle: {
		paddingVertical: 10,
	},
	firstColumnStyle: {
		borderRightColor: 'gray',
		borderRightWidth: 0.5,
		paddingLeft: 20,
	},
	borderTopStyle: {
		borderTopColor: 'gray',
		borderTopWidth: 0.5,
	},
	fieldStyle: {
		paddingHorizontal: 15,
	},
});
