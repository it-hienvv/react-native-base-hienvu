import React from 'react';
import Table from '../table';
import {TABLE} from '../../contants';

class PartnerOutput extends React.PureComponent {
	onPlus = () => {
		this.props.onTablePositionAddRows &&
			this.props.onTablePositionAddRows('listPartnerOutput');
	};

	onMinus = item => {
		this.props.onTablePositionMinusRows &&
			this.props.onTablePositionMinusRows(item, 'listPartnerOutput');
	};

	onChangeValueData = item => {
		this.props.onTablePositionEditRows &&
			this.props.onTablePositionEditRows(item, 'listPartnerOutput');
	};

	render() {
		const {listPartnerOutput: data} = this.props.customerDetailSearch;
		return (
			<Table
				onChangeValueData={this.onChangeValueData}
				onPlus={this.onPlus}
				onMinus={this.onMinus}
				listHeaders={[
					'#',
					'Tên đối tác',
					'Hàng hoá',
					'DS GD năm gần nhất (trd)',
					'TG quan hệ (năm)',
					'BQ số ngày phải trả',
					'+',
				]}
				listRows={[
					'index',
					'partnerName',
					'goods',
					'revenueNearly',
					'relationshipYear',
					'yearRefund',
					'icon',
				]}
				listTypes={[
					TABLE.type.index,
					TABLE.type.textInput,
					TABLE.type.textInput,
					TABLE.type.textInput,
					TABLE.type.relationship,
					TABLE.type.textInput,
					TABLE.type.icon,
				]}
				listFlex={[0.5, 2, 6, 3, 3, 2, 0.5]}
				data={data}
			/>
		);
	}
}

export default PartnerOutput;
