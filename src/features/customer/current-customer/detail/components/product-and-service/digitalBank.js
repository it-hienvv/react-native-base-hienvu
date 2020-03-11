import React from 'react';
import {StyleSheet} from 'react-native';
import Panel from 'components/comp-wrapper-collapsible';
import {PADDING_COMMON} from 'contants/themes/size';
import Table from '../table/Table';
import I18nTran from 'assets/language';

class DigitalBank extends React.PureComponent {
	render() {
		return (
			<Panel
				line
				title={I18nTran.t('digital-bank')}
				style={styles.currentCustomer}>
				<Table
					styleProps={{marginHorizontal: 0}}
					type={0}
					{...this.props}
				/>
			</Panel>
		);
	}
}
export default DigitalBank;
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
