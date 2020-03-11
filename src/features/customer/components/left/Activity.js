import React from 'react';
import {StyleSheet, View, ScrollView, FlatList} from 'react-native';
import ActivityItem from './ActivityItem';
import DetailCustomer from '../right/DetailCustomer';
import Products from '../right/Products';
import {PADDING_COMMON} from 'contants/themes/size';
import CycleLife from '../right/CycleLife';
import {AppModalManager} from 'components/app-modal/Manager';
import themes from 'assets/themes';
import I18nTran from 'assets/language';
import {WIDTH_SCREEN} from 'utils/util';
import ModalConfirm from 'components/modal-confirm';
import {customerApi} from 'networks/apis/extension';
import PubSub from 'pubsub-js';
import ModalAddActivity from 'features/customer/components/modal-add-activity';
import Loading from 'components/loading';
import ActivityDateFilter from './ActivityDateFilter';
import {AppTextWithoutTranslate} from 'components/text';
import {AppButton} from 'components/button';
import {AppImages} from 'components/image';
import {MenuProvider} from 'react-native-popup-menu';

export default class Active extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			activities: [],
			loading: false,
			refreshing: false,
			startDate: null,
			endDate: null,
		};
		this.deletingActivityId = null;
	}

	_closeModal = () => {
		AppModalManager.hiddenModalWithJSX();
	};

	_handleConfirmDelete = async () => {
		console.log('_handleConfirmDelete');
		AppModalManager.hiddenModalWithJSX();
		console.log('ActivityId', this.deletingActivityId);
		if (!this.deletingActivityId) return;
		AppModalManager.showLoading();
		const requestObj = [
			{
				activityId: this.deletingActivityId,
				isDeleted: 1,
			},
		];
		const response = await customerApi.saveActivity(requestObj);
		console.log('Delete res', response);
		if (response.code == 0) {
			await this._load();
		}
		AppModalManager.hideLoading();
	};

	_handleCloseDelete = () => {
		console.log('_handleCloseDelete');
		AppModalManager.hiddenModalWithJSX();
	};

	_handlePressDelete = activityId => {
		console.log('_handlePressDelete', activityId);
		this.deletingActivityId = activityId;
		const modal = (
			<ModalConfirm
				title={I18nTran.t('confirm_delete_activity_title')}
				content={I18nTran.t('confirm_delete_activity_content')}
				contentDeny={'cancel_vi'}
				contentAccept={'confirm'}
				onAccept={this._handleConfirmDelete}
				onDeny={this._handleCloseDelete}
				onClose={this._handleCloseDelete}
			/>
		);
		AppModalManager.showModalWithJSX({
			data: modal,
			backDrop: true,
		});
	};

	_handlePressUpdate = item => {
		console.log('_handlePressUpdate', item);
		const data = (
			<ModalAddActivity
				{...item}
				accountName={this.props.accountName || ''}
			/>
		);
		AppModalManager.showModalWithJSX({
			data,
			backDrop: true,
		});
	};

	_renderActivityItem = ({item, index}) => {
		// console.log('_renderActivityItem', item);
		return (
			<ActivityItem
				containerStyle={styles.activityItem}
				onDelete={this._handlePressDelete}
				onUpdate={this._handlePressUpdate}
				{...item}
			/>
		);
	};

	_keyExtractor = item => item.activityId + '';

	_createActivity = () => {
		console.log('_createActivity');
		const {accountId, leadId, accountName} = this.props;
		const data = (
			<ModalAddActivity
				accountId={accountId}
				leadId={leadId}
				accountName={accountName}
			/>
		);
		AppModalManager.showModalWithJSX({
			data,
			backDrop: true,
		});
	};

	_renderHeader = () => {
		if (!this.state.loading) {
			if (!this.state.activities || this.state.activities.length == 0) {
				return (
					<View style={styles.emptyStateContainer}>
						<AppImages
							ButtonProps={{disabled: true}}
							ImageStyle={{
								height: 150,
								width: 150,
							}}
							uri={require('assets/images/icon/imgEmptyFolder.png')}
						/>
						<AppTextWithoutTranslate
							text={I18nTran.t('no_acitivy')}
							type={'BODY'}
							IStyles={styles.textEmpty}
						/>
						<AppButton
							ButtonProps={{
								onPress: this._createActivity,
							}}
							ButtonStyle={styles.buttonAddActivity}
							TextStyle={styles.textButtonAddActivity}
							withoutTranslate={true}
							text={I18nTran.t('add_activity').toUpperCase()}
						/>
					</View>
				);
			}
			return <View />;
		}
		return (
			<View style={styles.rowCenter}>
				<Loading />
			</View>
		);
	};

	_handleChangeStartDate = startDate => {
		this.setState({startDate});
	};

	_handleChangeEndDate = endDate => {
		this.setState({endDate});
	};

	_renderLeft() {
		return (
			<View style={styles.left}>
				<View style={styles.rowCenter}>
					<ActivityDateFilter
						startDate={this.state.startDate}
						endDate={this.state.endDate}
						onChangeStartDate={this._handleChangeStartDate}
						onChangeEndDate={this._handleChangeEndDate}
					/>
				</View>

				<FlatList
					ListHeaderComponent={this._renderHeader}
					data={this.state.activities}
					renderItem={this._renderActivityItem}
					keyExtractor={this._keyExtractor}
					contentContainerStyle={{
						paddingHorizontal: 10,
						paddingBottom: 10,
					}}
					onRefresh={this._refresh}
					refreshing={this.state.refreshing}
				/>
			</View>
		);
	}

	_renderRight() {
		return (
			<View style={styles.right}>
				<ScrollView>
					<DetailCustomer />
					<Products container={{marginTop: 30}} />
					<CycleLife container={{marginTop: 30}} />
				</ScrollView>
			</View>
		);
	}

	_load = async (refreshing = false) => {
		const {accountId, leadId} = this.props;
		const requestObj = {
			...(accountId && {accountId}),
			...(leadId && {leadId}),
		};
		console.log('requestObject', requestObj);
		if (refreshing) {
			this.setState({refreshing: true});
		} else {
			this.setState({loading: true});
		}

		const response = await customerApi.getActivity(requestObj);
		console.log('Response list activities', response);
		const activities = Array.isArray(response) ? response : [];
		this.setState({
			loading: false,
			refreshing: false,
			activities,
		});
	};

	_refresh = () => {
		this._load(true);
	};

	_onUpdateActivity = () => {
		console.log('_onUpdateActivity');
		this._load();
	};

	_handleReachEnd = () => {
		console.log('_handleReachEnd');
	};

	componentDidMount() {
		this.updateActivitySubcriber = PubSub.subscribe(
			'SAVE_ACTIVITY_SUCCESS',
			this._onUpdateActivity,
		);
		this.reachEndActivitySubcriber = PubSub.subscribe(
			'ACTIVITY_REACH_END',
			this._handleReachEnd,
		);
		this._load();
	}

	componentWillUnmount() {
		if (this.updateActivitySubcriber) {
			PubSub.unsubscribe(this.updateActivitySubcriber);
		}
		if (this.reachEndActivitySubcriber) {
			PubSub.unsubscribe(this.reachEndActivitySubcriber);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this._renderLeft()}
				{this._renderRight()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		paddingHorizontal: PADDING_COMMON,
	},
	activityItem: {
		marginTop: PADDING_COMMON,
	},
	left: {flex: 2, paddingRight: PADDING_COMMON / 2},
	right: {flex: 1, paddingLeft: PADDING_COMMON / 2},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalWrapper: {
		width: WIDTH_SCREEN - 50,
		height: 'auto',
		backgroundColor: themes.getColor('white'),
		borderRadius: 10,
	},
	modalBody: {
		padding: PADDING_COMMON,
	},
	rowCenter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyStateContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 50,
		marginHorizontal: 50,
	},
	buttonAddActivity: {
		backgroundColor: themes.getColor('mainColor'),
		marginTop: 30,
		height: 40,
		paddingHorizontal: 16,
		borderRadius: 6,
	},
	textButtonAddActivity: {
		color: themes.getColor('white'),
	},
	textEmpty: {
		textAlign: 'center',
	},
});
