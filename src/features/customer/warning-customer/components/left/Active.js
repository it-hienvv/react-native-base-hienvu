import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import NextWorks from './NextWorks';
import ItemAppointment from './ItemAppointment';
import DetailCustomer from '../right/DetailCustomer';
import Products from '../right/Products';
import {PADDING_COMMON} from 'contants/themes/size';
import CycleLife from '../right/CycleLife';

export default class Active extends React.PureComponent {
	_renderLeft() {
		return (
			<View style={styles.left}>
				<NextWorks />
				<ItemAppointment container={{marginTop: 30}} />
			</View>
		);
	}

	_renderRight() {
		return (
			<View style={styles.right}>
				<ScrollView>
					<DetailCustomer />
					<Products container={{marginTop: 30}} />
					<CycleLife container={{marginTop: 30}} />
				</ScrollView>
			</View>
		);
	}
	render() {
		return (
			<View style={styles.container}>
				{this._renderLeft()}
				{this._renderRight()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {flex: 1, flexDirection: 'row'},
	left: {flex: 2, paddingRight: PADDING_COMMON / 2},
	right: {flex: 1, paddingLeft: PADDING_COMMON / 2},
});
