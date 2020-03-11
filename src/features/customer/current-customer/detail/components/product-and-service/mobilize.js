import React from 'react';
import {StyleSheet} from 'react-native';
import Panel from 'components/comp-wrapper-collapsible';
import {PADDING_COMMON} from 'contants/themes/size';
import Table from '../table/Table';
import I18nTran from 'assets/language';

class Mobilize extends React.PureComponent {
	render() {
		return (
			<Panel line title={this.props.title} style={styles.currentCustomer}>
				<Table
					styleProps={{marginHorizontal: 0}}
					type={1}
					{...this.props}
				/>
			</Panel>
		);
	}
}
export default Mobilize;
const styles = StyleSheet.create({
	panel: {
		paddingHorizontal: 0,
		marginHorizontal: PADDING_COMMON,
		marginTop: PADDING_COMMON,
	},
	container: {
		paddingHorizontal: 0,
		marginHorizontal: PADDING_COMMON,
		flex: 1,
		marginTop: PADDING_COMMON,
		paddingBottom: 0,
	},
	currentCustomer: {
		paddingHorizontal: 0,
		marginHorizontal: PADDING_COMMON,
		flex: 1,
		marginTop: PADDING_COMMON * 2,
		paddingBottom: 0,
	},
});
