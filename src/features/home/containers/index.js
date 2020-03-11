import React from 'react';
import {StyleSheet} from 'react-native';
import AppContainer from 'components/container';
import {AppButton} from 'components/button';
import ModalTodoDetail from '../components/ModalTodoDetail';
import ModalUpdate from '../components/ModalUpdateToDoDetail';
import {AppModalManager} from 'components/app-modal/Manager';
class Home extends React.PureComponent {
	constructor() {
		super();
	}

	_onShowModal = () => {
		const test = <ModalTodoDetail />;
		const UpdateTodoDetail = <ModalUpdate />;
		AppModalManager.showModalWithJSX({data: test, backDrop: true});
	};
	render() {
		return (
			<AppContainer>
				<AppButton
					ButtonProps={{onPress: this._onShowModal}}
					text={'search'}
				/>
			</AppContainer>
		);
	}
}

export default Home;

const styles = StyleSheet.create({
	container: {},
});
