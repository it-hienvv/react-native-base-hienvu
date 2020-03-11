import {connect} from 'react-redux';
import DetailSearch from './index';
import {customerDetailSearch} from '../selector';
import {
	onChangeCustomerDetailSearchBasicData,
	onChangeCustomerDetailSearchExperienceStatus,
	onChangeCustomerDetailSearchTablePositionAddRow,
	onChangeCustomerDetailSearchTablePositionMinusRow,
	onChangeCustomerDetailSearchTablePositionEditRow,
	onCustomerDetailSearchStoreData,
	onCustomerDetailSearchSetData,
} from '../actions/actions';

const mapsStateToProps = state => ({
	customerDetailSearch: customerDetailSearch(state),
});

const mapsDispatchToProps = dispatch => ({
	onChangeBasic: data =>
		dispatch(onChangeCustomerDetailSearchBasicData(data)),
	onChangeExperienceStatus: data =>
		dispatch(onChangeCustomerDetailSearchExperienceStatus(data)),
	onTablePositionAddRows: propsKey =>
		dispatch(onChangeCustomerDetailSearchTablePositionAddRow(propsKey)),
	onTablePositionMinusRows: (data, propsKey) =>
		dispatch(
			onChangeCustomerDetailSearchTablePositionMinusRow(data, propsKey),
		),
	onTablePositionEditRows: (data, propsKey) =>
		dispatch(
			onChangeCustomerDetailSearchTablePositionEditRow(data, propsKey),
		),
	onStoreData: data => dispatch(onCustomerDetailSearchStoreData(data)),
	onSetData: data => dispatch(onCustomerDetailSearchSetData(data)),
});

export default connect(mapsStateToProps, mapsDispatchToProps)(DetailSearch);
