import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {AppNormalText} from 'components/text';
import themes from 'assets/themes';
import TextInputAnimation from 'components/text-input-animation';
import I18nTran from 'assets/language';
import CompPopupAnim from 'components/comp-popup-animation';
import {getRangeYears} from 'utils/date-times';
import {LIST_POSITION_KEY, LIST_POSITION} from '../contants';

class BasicInformation extends React.PureComponent {
	constructor(props) {
		super(props);
		const listYear = getRangeYears().reverse();
		const listPosition = LIST_POSITION;
		this.state = {
			listPosition,
			listYear,
		};
	}

	_onSelectPosition = item => {
		const {basic} = this.props.customerDetailSearch;
		if (item.key !== LIST_POSITION_KEY.other) {
			const newBasic = {...basic, position: item};
			this.props.onChangeBasic && this.props.onChangeBasic(newBasic);
		} else {
			const newBasic = {
				...basic,
				other: true,
				position: {key: '', text: ''},
			};
			this.props.onChangeBasic && this.props.onChangeBasic(newBasic);
		}
	};

	_onSelectYear = item => {
		const {basic} = this.props.customerDetailSearch;
		const newBasic = {...basic, year: item};
		this.props.onChangeBasic && this.props.onChangeBasic(newBasic);
	};

	onChangePosition = position => {
		const {basic} = this.props.customerDetailSearch;
		const newBasic = {...basic, position: {key: '', text: position}};
		this.props.onChangeBasic && this.props.onChangeBasic(newBasic);
	};

	onChangeName = name => {
		const {basic} = this.props.customerDetailSearch;
		const newBasic = {...basic, name};
		this.props.onChangeBasic && this.props.onChangeBasic(newBasic);
	};

	_renderPositionDropDownList() {
		const {listPosition} = this.state;
		const {position, other} = this.props.customerDetailSearch.basic;
		return other ? (
			<TextInputAnimation
				label={I18nTran.t('position-work')}
				value={position.text}
				onChangeText={this.onChangePosition}
				styleProps={{flex: 1}}
			/>
		) : (
			<CompPopupAnim
				selectedIndex={''}
				title={I18nTran.t('position-work')}
				listOption={listPosition}
				value={position.text}
				styleProps={{flex: 1}}
				popupMenuStyle={{width: 500, maxHeight: 500}}
				onPress={this._onSelectPosition}
			/>
		);
	}
	render() {
		const {listYear} = this.state;
		const {year, name} = this.props.customerDetailSearch.basic;
		return (
			<View
				style={[
					styles.container,
					this.props.container instanceof Array
						? [...this.props.container]
						: {...this.props.container},
				]}>
				<AppNormalText
					IProps={{numberOfLines: 1}}
					text={'a-basic-information'}
					type={'H1'}
				/>

				<AppNormalText
					IStyles={{marginVertical: PADDING_COMMON}}
					type={'CAPTION'}
					IProps={{numberOfLines: 0}}
					text={'question-qd'}
				/>

				<View style={{flexDirection: 'row'}}>
					<TextInputAnimation
						label={I18nTran.t('name')}
						value={name}
						onChangeText={this.onChangeName}
						styleProps={{flex: 1}}
					/>
					{this._renderPositionDropDownList()}
					<CompPopupAnim
						title={I18nTran.t('year-appoint')}
						listOption={listYear}
						value={year.text}
						styleProps={{flex: 1}}
						popupMenuStyle={{width: 500, maxHeight: 500}}
						onPress={this._onSelectYear}
						selectedIndex={''}
					/>
				</View>
			</View>
		);
	}
}

export default BasicInformation;

const styles = StyleSheet.create({
	container: {
		padding: PADDING_COMMON,
		borderBottomColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
	},
});
