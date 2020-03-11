import React, {Component} from 'react';
import {View, StyleSheet, Keyboard, StatusBar} from 'react-native';

import {WIDTH_SCREEN} from './utils/util';
import AppHeader from 'components/app-header/appHeaderContainer';
import {BOTTOM_WIDTH_SIZE} from 'contants/themes/size';
import AppDrawer from 'components/drawer/drawerContainer';
import BodyNavigation from 'routers/stack/mainMenuNavigation';
import UserInactivity from 'components/user-inactivity';
import Tool from 'components/tool';

class RootView extends Component {
	constructor(props) {
		super(props);
	}

	_onDismissKeyboard = () => {
		Keyboard.dismiss();
	};

	_renderHeader() {
		return (
			<View>
				<AppHeader />
			</View>
		);
	}

	_renderLeftTab() {
		return (
			<View style={styles.body}>
				{/* <View style={styles.bottom}>
					<LeftAppTab />
				</View> */}
				{this._renderMainMenuNavigation()}
			</View>
		);
	}

	_renderMainMenuNavigation() {
		return (
			<View style={styles.sub}>
				<BodyNavigation />
			</View>
		);
	}

	render() {
		return (
			<UserInactivity>
				<StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
				<AppDrawer>
					<View
						onTouchStart={this._onDismissKeyboard}
						style={styles.container}>
						{this._renderHeader()}
						{this._renderLeftTab()}
						<Tool />
					</View>
				</AppDrawer>
			</UserInactivity>
		);
	}
}
export default RootView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F6FA',
	},
	body: {
		flex: 1,
		flexDirection: 'row',
	},
	sub: {
		flex: 1,
	},
	bottom: {
		width: BOTTOM_WIDTH_SIZE,
		height: WIDTH_SCREEN,
	},
});
