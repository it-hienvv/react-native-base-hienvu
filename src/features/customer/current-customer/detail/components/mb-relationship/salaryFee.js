import React from 'react';
import {StyleSheet} from 'react-native';
import Panel from 'components/comp-wrapper-collapsible';
import {PADDING_COMMON} from 'contants/themes/size';
import Table from '../table/Table';
import I18nTran from 'assets/language';

class SalaryFee extends React.PureComponent {
	render() {
		const {data, headers, rows} = this.props;
		return (
			<Panel
				title={I18nTran.t('salary-fee')}
				style={styles.currentCustomer}>
				<Table
					listType={['text', 'text', 'text']}
					listBorderRight={[1, 0, 0]}
					styleProps={{marginHorizontal: 0}}
					type={0}
					data={data}
					headers={headers}
					rows={rows}
				/>
			</Panel>
		);
	}
}
export default SalaryFee;
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
