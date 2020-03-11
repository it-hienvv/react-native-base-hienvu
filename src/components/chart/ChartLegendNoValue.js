import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ChartLegendNoValue = props => {
	const {data, color, type, hasValue, key} = props;
	return (
		<View
			key={key}
			style={{
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				marginRight: 10,
				marginBottom: 10,
			}}>
			<View
				style={{
					height: 16,
					width: 30,
					backgroundColor: color,
					marginRight: 5,
					borderRadius: 4,
				}}
			/>
			<Text>{data.title}</Text>
		</View>
	);
};

export default ChartLegendNoValue;

const styles = StyleSheet.create({
	dotView: {
		flex: 1,
		borderBottomWidth: 1,
		borderBottomColor: '#E9E9E9',
		borderStyle: 'dashed',
	},
	textStyle: {textAlign: 'right'},
	textView: {width: '30%'},
	shapeView: {
		width: 30,
		height: 16,
		marginRight: 5,
		borderRadius: 4,
	},
	group1View: {flexDirection: 'row', alignItems: 'center', width: '70%'},
	legendContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 8,
		marginTop: 8,
	},
});
