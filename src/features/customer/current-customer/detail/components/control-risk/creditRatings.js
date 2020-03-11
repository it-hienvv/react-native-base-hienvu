import React from 'react';
import {StyleSheet} from 'react-native';
import Panel from 'components/comp-wrapper-collapsible';
import {PADDING_COMMON} from 'contants/themes/size';
import I18nTran from 'assets/language';
import TableRow from './tableRow';

class CreditRatings extends React.PureComponent {
	render() {
		const {container} = this.props;
		return (
			<Panel
				line
				style={[styles.panel, {...container}]}
				title={I18nTran.t('credit-ranking')}>
				<TableRow
					container={{marginTop: PADDING_COMMON}}
					listFlex={[1, 3]}
					{...this.props}
				/>
			</Panel>
		);
	}
}

export default CreditRatings;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 0,
		marginHorizontal: PADDING_COMMON,
		flex: 1,
		marginTop: PADDING_COMMON,
		paddingBottom: 0,
	},
	panel: {
		paddingHorizontal: 0,
		marginHorizontal: PADDING_COMMON,
		marginTop: PADDING_COMMON,
		// paddingBottom: 0,
	},
});
