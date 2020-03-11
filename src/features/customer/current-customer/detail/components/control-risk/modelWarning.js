import React from 'react';
import {StyleSheet, View} from 'react-native';
import Panel from 'components/comp-wrapper-collapsible';
import {PADDING_COMMON} from 'contants/themes/size';
import Table from '../table/Table';
import I18nTran from 'assets/language';

class ModelWarning extends React.PureComponent {
	render() {
		const {data, headers, rows} = this.props;
		return (
			<View>
				<Panel
					title={I18nTran.t('model-warning')}
					style={styles.container}>
					<Table
						listType={['text', 'text', 'text']}
						listBorderRight={[1, 0, 0]}
						styleProps={{marginHorizontal: 0}}
						data={data}
						headers={headers}
						rows={rows}
						type={0}
					/>
				</Panel>
			</View>
		);
	}
}
export default ModelWarning;
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
