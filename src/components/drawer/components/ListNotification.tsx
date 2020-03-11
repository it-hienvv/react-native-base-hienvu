import React from 'react';
import {StyleSheet, View, FlatList, ListRenderItem} from 'react-native';
import {AppImages} from 'components/image';
import {AppNormalText} from 'components/text';
import NotificationItem, {NotificationItemInterface} from './NotificationItem';
import {PADDING_DRAWER, PADDING_COMMON} from 'contants/themes/size';
import {connect} from 'react-redux';
import {NOTIFICATION_ACTION} from 'actions/actions';
import themes from 'assets/themes';
import AppFlatList from 'components/flatlist/flatlist';

const fakeDescription = `Bạn vừa được phân giao 20 khách hàng tiềm năng mới cho chiến dịch "An toàn..."`;
interface IProps {
	onOpen: () => void;
	onClose: () => void;
}
interface IStates {
	data: NotificationItemInterface[];
}
class ListNotification extends React.PureComponent<IProps, IStates> {
	state: IStates = {
		data: [
			{
				checked: false,
				key: '0',
				description: fakeDescription,
				time: '10',
			},
			{
				checked: false,
				key: '1',
				description: fakeDescription,
				time: '10',
			},
			{
				checked: false,
				key: '2',
				description: fakeDescription,
				time: '10',
			},
			{
				checked: false,
				key: '3',
				description: fakeDescription,
				time: '10',
			},
			{
				checked: false,
				key: '4',
				description: fakeDescription,
				time: '10',
			},
			{
				checked: false,
				key: '5',
				description: fakeDescription,
				time: '10',
			},
			{
				checked: false,
				key: '6',
				description: fakeDescription,
				time: '10',
			},
			{
				checked: false,
				key: '7',
				description: fakeDescription,
				time: '10',
			},
			{
				checked: false,
				key: '8',
				description: fakeDescription,
				time: '10',
			},
		],
	};

	onPress = (item: NotificationItemInterface) => {
		const {data} = this.state;
		const result = data.map(e => {
			if (e.key === item.key) {
				return {
					...e,
					checked: item.opened ? false : true,
					opened: item.opened ? false : true,
				};
			}
			return {
				...e,
				checked: false,
				opened: false,
			};
		});
		if (item.opened) {
			this.onCloseDrawer();
		} else {
			this.onOpenDrawer();
		}
		this.setState({data: [...result]});
	};

	onOpenDrawer = () => {
		const {onOpen} = this.props;
		onOpen();
	};

	onCloseDrawer = () => {
		const {onClose} = this.props;
		onClose();
	};

	_keyExtractor = (item, index) => `${item.key}`;

	_renderItem: ListRenderItem<NotificationItemInterface> = ({
		item,
		index,
	}) => (
		<NotificationItem
			marginBottom={
				index === this.state.data.length - 1 ? PADDING_COMMON : 0
			}
			onPress={this.onPress}
			item={item}
		/>
	);

	_renderHeader() {
		return (
			<View style={styles.header}>
				<AppNormalText text={'search'} />
				<AppImages uri={themes.getImages('search')} />
			</View>
		);
	}

	_renderListNotification() {
		const {data} = this.state;
		return (
			<AppFlatList
				data={data}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
			/>
		);
	}

	render() {
		return this._renderListNotification();
	}
}

const mapsStateToProps = state => ({});

const mapsDispatchToProps = dispatch => ({
	onOpen: () => dispatch(NOTIFICATION_ACTION.onOpenNotificationDescription()),
	onClose: () =>
		dispatch(NOTIFICATION_ACTION.onCloseNotificationDescription()),
});

export default connect(mapsStateToProps, mapsDispatchToProps)(ListNotification);

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: PADDING_DRAWER,
		paddingVertical: PADDING_DRAWER,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
});
