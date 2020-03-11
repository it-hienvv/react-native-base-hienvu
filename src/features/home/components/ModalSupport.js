import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WIDTH_SCREEN, HEIGHT_SCREEN} from 'utils/util';
import {AppNormalText} from 'components/text';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {AppModalManager} from 'components/app-modal/Manager';
class ModalSupport extends React.PureComponent {
	_onCancel = () => {
		AppModalManager.hiddenModalWithJSX();
	};
	render() {
		return (
			<View style={styles.wrapper}>
				<View style={styles.viewHeader}>
					<AppNormalText type={'H2'} text={'active_tutorial'} />
					<AppImages
						ButtonProps={{onPress: this._onCancel}}
						uri={themes.getImages('cancel')}
						ImageStyle={styles.cancelImage}
					/>
				</View>
				<View style={styles.viewBody}>
					<AppNormalText type={'H2'} text={'content_from_CMS'} />
				</View>
			</View>
		);
	}
}

export default ModalSupport;

const styles = StyleSheet.create({
	wrapper: {
		width: (WIDTH_SCREEN * 4) / 5,
		height: (HEIGHT_SCREEN * 2) / 3,
		backgroundColor: themes.getColor('white'),
	},
	viewHeader: {
		width: '100%',
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderColor: themes.getColor('grayLight'),
		borderWidth: 1,
		paddingLeft: 30,
		paddingRight: 15,
	},
	viewBody: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cancelImage: {
		width: 25,
		height: 25,
	},
});
