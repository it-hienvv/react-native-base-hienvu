import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {AppNormalText} from 'components/text';
import themes from 'assets/themes';
import I18nTran from 'assets/language';
import Table from './table';
import {TABLE} from '../contants';
import Panel from 'components/comp-wrapper-collapsible';
import Partner from './business/Partner';
import PartnerOutput from './business/PartnerOutput';

class BusinessActivities extends React.PureComponent {
	state = {};

	_renderViewPartner() {
		return (
			<View>
				<View
					style={{
						padding: PADDING_COMMON,
						borderBottomWidth: 1,
						borderBottomColor: themes.getColor('grayLight'),
					}}>
					<Text numberOfLines={0}>
						<AppNormalText type={'H1'} text={'partner-input'} />
						<AppNormalText
							IStyles={{color: themes.getColor('grayBold')}}
							type={'BODY'}
							text={'how-many-partner-input'}
						/>
					</Text>
				</View>
				<Partner {...this.props} />
				<View
					style={{
						padding: PADDING_COMMON,
						borderBottomWidth: 1,
						borderBottomColor: themes.getColor('grayLight'),
					}}>
					<Text numberOfLines={0}>
						<AppNormalText type={'H1'} text={'partner-output'} />
						<AppNormalText
							IStyles={{color: themes.getColor('grayBold')}}
							type={'BODY'}
							text={'how-many-partner-output'}
						/>
					</Text>
				</View>
				<PartnerOutput {...this.props} />
			</View>
		);
	}

	render() {
		return (
			<View
				style={[
					styles.container,
					this.props.container instanceof Array
						? [...this.props.container]
						: {...this.props.container},
				]}>
				<Panel
					style={styles.panel}
					title={I18nTran.t('business_activities')}>
					{this._renderViewPartner()}
				</Panel>
			</View>
		);
	}
}

export default BusinessActivities;

const styles = StyleSheet.create({
	container: {
		borderBottomColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
		paddingVertical: PADDING_COMMON,
	},
	viewOption: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: PADDING_COMMON,
	},
	option: {
		flexDirection: 'row',
		paddingVertical: PADDING_COMMON,
		borderColor: themes.getColor('grayLight'),
		borderTopWidth: 1,
		borderBottomWidth: 1,
		alignItems: 'center',
		marginTop: PADDING_COMMON,
		paddingHorizontal: PADDING_COMMON,
	},
	panel: {
		overflow: 'hidden',
		padding: 0,
		borderRadius: 0,
		backgroundColor: '#fff',
		borderRightWidth: 0,
		borderLeftWidth: 0,
		borderBottomWidth: 0,
		borderColor: themes.getColor('grayLight'),
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation: 0,
	},
});
