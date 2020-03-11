import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {WIDTH_SCREEN, HEIGHT_SCREEN, AppAlert} from 'utils/util';
import {PADDING_COMMON} from 'contants/themes/size';
import {AppImages} from 'components/image';
import {AppTextWithoutTranslate} from 'components/text';
import ModalUpdateToDoDetail from './ModalUpdateToDoDetail';
import themes from 'assets/themes';
import {AppModalManager} from 'components/app-modal/Manager';

const viewImage = 30;
const bodyMarginLeft = viewImage + PADDING_COMMON * 2;
const iconSpacing = 20;
const MANAGER_KEY = {
	EDIT: 0,
	DELETE: 1,
	CANCEL: 2,
};
class ModalToDoDetail extends React.PureComponent {
	state = {
		item: {
			title:
				'Họp tìm kiếm giải pháp hoạt đồng team UXD và làm việc về graphic design ',
			description: `In this month's newsletter we've rounded up some great content for you. We've put together a guide with 10 tips on how to create an amazing questionnaire as well as a round up of blogs covering best practices on SMS.Improving customer loyalty by reducing effort, calculating...`,
			address: '12 Ngô Quyền. Hanoi, Hoàn Kiếm, Hanoi, Vietnam',
			time: 'Thứ 4, 21 tháng 8 ⋅12:15 – 13:15',
		},
	};
	_onPress = item => () => {
		switch (item.id) {
			case MANAGER_KEY.EDIT:
				const data = (
					<ModalUpdateToDoDetail isEdit item={this.state.item} />
				);
				AppModalManager.showModalWithJSX({data: data, backDrop: true});
				break;
			case MANAGER_KEY.DELETE:
				AppAlert({
					title: 'do-you-want-this-to-do',
					onPressCancel: () => {},
					onPressOK: () => {},
				});
				break;
			case MANAGER_KEY.CANCEL:
				AppModalManager.hiddenModalWithJSX();
				break;
			default:
				AppModalManager.hiddenModalWithJSX();
				break;
		}
	};
	_renderIconManager() {
		const data = [
			{id: MANAGER_KEY.EDIT, uri: themes.getImages('edit'), name: 'edit'},
			{
				id: MANAGER_KEY.DELETE,
				uri: themes.getImages('delete'),
				name: 'delete',
			},
			{
				id: MANAGER_KEY.CANCEL,
				uri: themes.getImages('cancel'),
				name: 'cancel',
			},
		];
		return (
			<View style={styles.viewIconManager}>
				{data.map(item => (
					<AppImages
						ButtonProps={{onPress: this._onPress(item)}}
						ButtonStyles={[
							styles.icon,
							styles.containerImageFolder,
						]}
						uri={item.uri}
						key={`${item.id}`}
					/>
				))}
			</View>
		);
	}
	_renderBlockManager() {
		const {item} = this.state;
		return (
			<View
				style={[
					styles.blockManager,
					styles.blockPadding,
					styles.border,
				]}>
				<View style={styles.left}>
					<AppImages
						uri={themes.getImages('folder')}
						ButtonStyles={styles.containerImageFolder}
						ButtonProps={{disabled: true}}
						ImageStyle={styles.folderImage}
					/>
				</View>
				<View style={[styles.marginTitleView, styles.borderAround]}>
					<AppTextWithoutTranslate
						text={item.title}
						IProps={{numberOfLines: 2}}
						IStyles={styles.textTile}
						type={'H1'}
					/>

					<AppTextWithoutTranslate
						IStyles={styles.textTime}
						text={item.time}
						type={'CAPTION'}
					/>
				</View>
				{this._renderIconManager()}
			</View>
		);
	}

	_renderDescription() {
		const {item} = this.state;
		return (
			<View style={[styles.blockDescription, styles.border]}>
				<AppTextWithoutTranslate
					type={'BODY1'}
					text={item.description}
					IProps={{numberOfLines: 0}}
				/>
			</View>
		);
	}

	_renderBlockAddress() {
		const {item} = this.state;
		return (
			<View
				style={[
					styles.blockAddress,
					styles.blockPadding,
					styles.border,
				]}>
				<View style={styles.left}>
					<AppImages
						uri={themes.getImages('location')}
						ButtonStyles={styles.containerImageFolder}
						ButtonProps={{disabled: true}}
						ImageStyle={styles.folderImage}
					/>
				</View>
				<View style={styles.marginTitleView}>
					<AppTextWithoutTranslate
						text={'Hanoi'}
						IProps={{numberOfLines: 2}}
						type={'H1'}
					/>

					<AppTextWithoutTranslate
						IStyles={styles.textTime}
						text={item.address}
						type={'BODY2'}
					/>
				</View>
			</View>
		);
	}
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					{this._renderBlockManager()}
					{this._renderDescription()}
					{this._renderBlockAddress()}
				</ScrollView>
			</View>
		);
	}
}

export default ModalToDoDetail;

const styles = StyleSheet.create({
	container: {
		width: WIDTH_SCREEN / 2,
		height: HEIGHT_SCREEN / 2,
		backgroundColor: themes.getColor('white'),
		paddingVertical: PADDING_COMMON,
	},

	blockManager: {
		flexDirection: 'row',
		paddingBottom: PADDING_COMMON,
	},
	blockPadding: {
		paddingHorizontal: PADDING_COMMON,
	},
	blockDescription: {
		paddingVertical: PADDING_COMMON,
		paddingLeft: bodyMarginLeft,
		paddingRight: PADDING_COMMON,
	},
	blockAddress: {
		paddingVertical: PADDING_COMMON,
		flexDirection: 'row',
	},
	textTile: {
		color: themes.getColor('blueLight'),
	},
	containerImageFolder: {
		justifyContent: 'flex-start',
	},
	folderImage: {
		width: 25,
		height: 25,
	},
	marginTitleView: {
		paddingHorizontal: PADDING_COMMON,
		flex: 1,
	},
	icon: {
		marginLeft: iconSpacing,
	},
	viewIconManager: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	textTime: {
		marginTop: PADDING_COMMON,
	},
	border: {
		borderBottomWidth: 0.5,
		borderColor: themes.getColor('grayLight'),
	},
	left: {
		width: viewImage,
	},
	borderAround: {},
});
