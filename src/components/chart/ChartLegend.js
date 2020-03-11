import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ChartLegend = props => {
	const {data, color, type, hasValue} = props;
	const width = {
		half: '50%',
		full: '100%',
	};
	return (
		<View style={[styles.legendContainer, {width: width[type]}]}>
			<View style={styles.group1View}>
				<View style={[styles.shapeView, {backgroundColor: color}]} />
				<Text numberOfLines={1} ellipsizeMode={'clip'}>
					{data.title}
				</Text>
				<View style={styles.dotView} />
			</View>
			<View style={styles.textView}>
				<Text style={styles.textStyle}>{data.value} kh</Text>
			</View>
		</View>
	);
};

export default ChartLegend;

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
