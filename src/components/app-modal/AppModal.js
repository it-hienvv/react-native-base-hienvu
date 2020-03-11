import React from 'react';
import Modal from 'react-native-modal';
import {ActivityIndicator} from 'react-native';

const TIME_OUT = 10 * 1000;

class AppModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: false,
			data: <ActivityIndicator size="large" color="#0000ff" />,
			backDrop: false,
		};
	}

	componentWillUnmount() {
		if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
	}

	hideLoading = () => {
		if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
		if (this.state.isVisible) {
			this.setState({isVisible: false});
		}
	};

	showLoading = () => {
		this.loadingTimeout = setTimeout(() => {
			this.setState({isVisible: false});
		}, TIME_OUT);
		const data = <ActivityIndicator size="large" color="#0000ff" />;
		this.setState({isVisible: true, data});
	};

	showModalWithJSX({data, backDrop}) {
		if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
		this.setState({isVisible: true, data, backDrop});
	}

	hiddenModalWithJSX() {
		if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
		if (this.state.isVisible) {
			const data = <ActivityIndicator size="large" color="#0000ff" />;
			this.setState({isVisible: false, backDrop: false, data});
		}
	}

	_onBackdropPress = () => {
		const {backDrop} = this.state;
		if (backDrop) {
			if (this.state.isVisible) {
				this.setState({isVisible: false, backDrop: false});
			}
		}
	};

	render() {
		return (
			<Modal
				onBackdropPress={this._onBackdropPress}
				isVisible={this.state.isVisible}
				backdropTransitionOutTiming={0}
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					padding: 0,
					margin: 0,
				}}>
				{this.state.data}
			</Modal>
		);
	}
}

export default AppModal;
