import React from 'react';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import MainDrawer from './components/MainDrawer';
import {WIDTH_SCREEN} from 'utils/util';
class AppDrawer extends React.PureComponent {
	state = {
		size: WIDTH_SCREEN,
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.props.openDrawerStatus) {
			this._openDrawer();
		} else {
			this._closeDrawer();
		}
	}

	_closeDrawer = () => {
		if (this.drawer) this.drawer.closeDrawer();
	};

	_openDrawer = () => {
		if (this.drawer) this.drawer.openDrawer();
	};

	_onDrawerClose = () => {
		const {onClose} = this.props;
		onClose && onClose();
	};

	_onDrawerOpen = () => {
		const {onOpen} = this.props;
		onOpen && onOpen();
	};

	renderDrawer = () => <MainDrawer />;

	render() {
		const {size} = this.state;
		return (
			<DrawerLayout
				ref={refs => (this.drawer = refs)}
				onDrawerClose={this._onDrawerClose}
				onDrawerOpen={this._onDrawerOpen}
				drawerWidth={size}
				drawerPosition={DrawerLayout.positions.Right}
				drawerType="front"
				renderNavigationView={this.renderDrawer}>
				{this.props.children}
			</DrawerLayout>
		);
	}
}

export default AppDrawer;
