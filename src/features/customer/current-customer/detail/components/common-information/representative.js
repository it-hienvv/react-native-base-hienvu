import React from 'react';
import {StyleSheet} from 'react-native';
import Panel from 'components/comp-wrapper-collapsible';
import {PADDING_COMMON} from 'contants/themes/size';
import Table from '../table/Table';
import I18nTran from 'assets/language';


class Representative extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		const data = this.props.list.filter(item => !item.hidden);
		return (
			<Panel
				title={I18nTran.t('representative')}
				style={styles.container}>
				<Table
					listBorderRight={[1, 0, 0, 0, 0, 0]}
					type={1}
					styleProps={{marginHorizontal: 0}}
					data={data}
					listType={[
						'text',
						'text',
						'date',
						'text',
						'phone',
						'email',
					]}
					headers={[
						'Tên',
						'Chức vụ',
						'Ngày sinh',
						'Số CMT/Căn cước',
						'Điện thoại',
						'Email',
					]}
					rows={[
						'fullName',
						'position',
						'birthday',
						'identifiedNumber',
						'phone',
						'email',
					]}
				/>
			</Panel>
		);
	}
}

export default Representative;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 0,
		marginHorizontal: PADDING_COMMON,
		flex: 1,
		marginTop: PADDING_COMMON,
		paddingBottom: 0,
	},
});
