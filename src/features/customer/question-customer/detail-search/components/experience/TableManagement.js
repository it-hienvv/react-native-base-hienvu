import React from 'react';
import Table from '../table';
import {TABLE} from '../../contants';

class TableManagement extends React.PureComponent {

	onPlus = () => {
		this.props.onTablePositionAddRows &&
			this.props.onTablePositionAddRows('listManagement');
	};

	onMinus = item => {
		this.props.onTablePositionMinusRows &&
			this.props.onTablePositionMinusRows(item, 'listManagement');
	};

	onChangeValueData = item => {
		this.props.onTablePositionEditRows &&
			this.props.onTablePositionEditRows(item, 'listManagement');
	};

	render() {
		const {listManagement: data} = this.props.customerDetailSearch;
		return (
			<Table
				onChangeValueData={this.onChangeValueData}
				onPlus={this.onPlus}
				onMinus={this.onMinus}
				listHeaders={[
					'#',
					'MST',
					'Tên doanh nghiệp',
					'Trạng thái',
					'+',
				]}
				listRows={['index', 'code', 'name', 'active', 'icon']}
				listTypes={[
					TABLE.type.index,
					TABLE.type.textInput,
					TABLE.type.textInput,
					TABLE.type.status,
					TABLE.type.icon,
				]}
				listFlex={[0.5, 3, 8, 3, 0.5]}
				data={data}
			/>
		);
	}
}

export default TableManagement;
