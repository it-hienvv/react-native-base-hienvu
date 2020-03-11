import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import AppContainer from 'components/container';
import {PADDING_COMMON} from 'contants/themes/size';
import {SHALLOW_STYLE} from 'contants/themes';
import HeaderCompareProduct from 'components/header-back/HeaderBack';
import {AppButton} from 'components/button';
import I18nTran from 'assets/language';
import themes from 'assets/themes';
import Description from '../components/description';
import BasicInformation from '../components/basicInformation';
import ExperienceManagement from '../components/experienceManagement';
import Panel from 'components/comp-wrapper-collapsible';
import BusinessActivities from '../components/businessActivities';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class DetailSearch extends React.PureComponent {
	constructor(props) {
		super(props);
		const {navigation} = this.props;
		const key = navigation.getParam('key', '');
		this.props.onSetData && this.props.onSetData(key);
	}
	componentWillUnmount() {
		const {navigation} = this.props;
		const key = navigation.getParam('key', '');
		this.props.onStoreData && this.props.onStoreData(key);
	}
	_renderHeader() {
		return (
			<HeaderCompareProduct
				containerStyle={{borderRadius: 0}}
				titleLeft={I18nTran.t('add_customer')}
				iconLeft={'backArrow'}
				onPressBack={this.handleBackBtn}
				hasRightBtn={true}
				rightComp={
					<AppButton
						text={'update-customer'}
						ButtonStyle={{
							backgroundColor: themes.getColor('mainColor'),
							borderWidth: 0,
							borderRadius: 5,
						}}
						ButtonProps={{onPress: this.onSaveInfo}}
						TextStyle={{
							color: themes.getColor('white'),
							paddingHorizontal: 30,
							paddingVertical: 3,
						}}
						textType={'H1'}
						withoutTranslate={false}
					/>
				}
			/>
		);
	}

	render() {
		return (
			<KeyboardAwareScrollView enableOnAndroid={true} extraHeight={180}>
				{this._renderHeader()}
				<AppContainer ContainerStyles={{paddingBottom: 200}}>
					<View style={styles.container}>
						<View style={styles.shallow}>
							<Panel
								title={I18nTran.t('company-information-owner')}>
								<Description />
								<BasicInformation {...this.props} />
								<ExperienceManagement {...this.props} />
							</Panel>
						</View>

						<View style={styles.shallow}>
							<BusinessActivities {...this.props} />
						</View>
					</View>
				</AppContainer>
			</KeyboardAwareScrollView>
		);
	}
}

export default DetailSearch;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	shallow: {
		margin: PADDING_COMMON,
		...SHALLOW_STYLE,
		marginTop: PADDING_COMMON * 2,
		borderRadius: 8,
	},
});
