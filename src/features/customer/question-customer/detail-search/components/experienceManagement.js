import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import themes from 'assets/themes';
import I18nTran from 'assets/language';
import Option from '../../components/Option';
import Panel from 'components/comp-wrapper-collapsible';
import TablePosition from './experience/TablePosition';
import TableManagement from './experience/TableManagement';
import {AppNormalText} from 'components/text';
import {OPTION} from '../contants';
import Hyperlink from 'react-native-hyperlink';

class ExperienceManagement extends React.PureComponent {
	state = {
		list: OPTION,
	};

	onSelectOption = status => {
		const {experienceStatus} = this.props.customerDetailSearch;
		this.props.onChangeExperienceStatus &&
			this.props.onChangeExperienceStatus({...experienceStatus, status});
	};
	_renderViewOption() {
		return (
			<View style={styles.option}>
				<View style={{flex: 1}}>
					<AppNormalText
						text={'question-have-been-management-before'}
					/>
				</View>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<Option
						selected={
							this.props.customerDetailSearch.experienceStatus
								.status
						}
						onSelect={this.onSelectOption}
						list={this.state.list}
					/>
				</View>
			</View>
		);
	}

	_renderViewPosition() {
		return (
			<View>
				<View
					style={{
						padding: PADDING_COMMON,
						borderBottomWidth: 1,
						borderBottomColor: themes.getColor('grayLight'),
					}}>
					<AppNormalText
						type={'H1'}
						text={'how-long-time-management'}
					/>
					<AppNormalText
						IStyles={{marginTop: 10}}
						type={'CAPTION'}
						text={'experience-management-description'}
					/>
				</View>
				<TablePosition {...this.props} />
				<View
					style={{
						padding: PADDING_COMMON,
						borderBottomWidth: 1,
						borderBottomColor: themes.getColor('grayLight'),
					}}>
					<AppNormalText
						IStyles={{marginTop: 10}}
						type={'CAPTION'}
						text={'experience-management-description'}
					/>
				</View>
				<View
					style={{
						padding: PADDING_COMMON,
						borderBottomWidth: 1,
						borderBottomColor: themes.getColor('grayLight'),
					}}>
					<AppNormalText
						type={'H1'}
						text={'how-many-management-company'}
					/>
					<AppNormalText
						IStyles={{
							marginTop: 10,
							color: themes.getColor('grayBold'),
						}}
						type={'CAPTION'}
						text={'cdn-line-one'}
					/>
					<AppNormalText
						IStyles={{
							marginTop: 10,
							color: themes.getColor('grayBold'),
						}}
						type={'CAPTION'}
						text={'cdn-line-two'}
					/>
				</View>
				<TableManagement {...this.props} />
				<View
					style={{
						padding: PADDING_COMMON,
					}}>
					<Hyperlink linkStyle={ {fontSize: 12, textDecorationLine: 'underline', color: themes.getColor('blackBold') } } linkDefault={true}>
						<Text  style={{marginTop: 10, fontSize: 12}}>
							<AppNormalText
								IStyles={{
									color: themes.getColor('grayBold'),
								}}
								type={'CAPTION'}
								text={'note-for'}>
								<AppNormalText type={'BODY'} text={'status'} />
								{I18nTran.t('encourage-rm', {
									website: 'https://www.google.com/',
								})}
							</AppNormalText>
						</Text>
					</Hyperlink>
				</View>
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
					title={I18nTran.t('b-management-experience')}>
					{this._renderViewOption()}
					{this._renderViewPosition()}
				</Panel>
			</View>
		);
	}
}

export default ExperienceManagement;

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
