import React from 'react';
import Table from '../table';
import {TABLE} from '../../contants';

class TablePosition extends React.PureComponent {
	onPlus = () => {
		this.props.onTablePositionAddRows &&
			this.props.onTablePositionAddRows('listPosition');
	};

	onMinus = item => {
		this.props.onTablePositionMinusRows &&
			this.props.onTablePositionMinusRows(item, 'listPosition');
	};

	onChangeValueData = item => {
		this.props.onTablePositionEditRows &&
			this.props.onTablePositionEditRows(item, 'listPosition');
	};

	render() {
		const {listPosition: data} = this.props.customerDetailSearch;
		return (
			<Table
				onChangeValueData={this.onChangeValueData}
				onPlus={this.onPlus}
				onMinus={this.onMinus}
				listHeaders={[
					'#',
					'Từ năm - đến năm',
					'Chức vụ',
					'Doanh nghiệp',
					'Lĩnh vực kinh doanh',
					'Phân loại',
					'+',
				]}
				listRows={[
					'index',
					'year',
					'position',
					'company',
					'businessField',
					'type',
					'icon',
				]}
				listTypes={[
					TABLE.type.index,
					TABLE.type.year,
					TABLE.type.position,
					TABLE.type.textInput,
					TABLE.type.dropDown,
					TABLE.type.smallDropDown,
					TABLE.type.icon,
				]}
				listFlex={[0.5, 2, 3, 3, 3, 2, 0.5]}
				data={data}
			/>
		);
	}
}

export default TablePosition;
