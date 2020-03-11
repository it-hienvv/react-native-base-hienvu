import React, {PureComponent} from 'react';
import {
	View,
	PanResponder,
	ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import {mainNavigationService} from 'routers/managerNavigator';
import * as screenNames from 'routers/screenNames';
import {AppAlertOnlyOkay} from 'utils/util';

export default class UserInactivity extends PureComponent {
	static propTypes = {
		timeForInactivity: PropTypes.number,
		children: PropTypes.node.isRequired,
		style: ViewPropTypes.style,
	};

	static defaultProps = {
		timeForInactivity: __DEV__
			? 1000 * 10 * 5 * 10000000
			: 1000 * 10 * 5 * 10000000,
		style: {
			flex: 1,
		},
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponderCapture: this
				.onMoveShouldSetPanResponderCapture,
			onStartShouldSetPanResponderCapture: this
				.onMoveShouldSetPanResponderCapture,
			onResponderTerminationRequest: this.handleInactivity,
		});
		this.baseTime = 1000 * 60;
		this.timeForInactivity = this.props.timeForInactivity;
	}

	componentDidMount() {
		this.handleInactivity();
	}

	componentWillUnmount() {
		if (this.timeout) clearTimeout(this.timeout);
	}

	onAction = () => {
		if (this.timeout) clearTimeout(this.timeout);
		mainNavigationService.navigate(screenNames.LOGIN_SCREEN);
		AppAlertOnlyOkay({title: 'noti_expire'});
	};

	handleInactivity = () => {
		if (this.timeout) clearTimeout(this.timeout);
		this.timeForInactivity = this.props.timeForInactivity;
		this.resetTimeout();
	};

	resetTimeout = () => {
		if (this.timeForInactivity <= this.baseTime) {
			this.timeout = setTimeout(this.onAction, this.timeForInactivity);
		} else {
			this.timeForInactivity -= this.baseTime;
			this.timeout = setTimeout(this.resetTimeout, this.baseTime);
		}
	};

	onMoveShouldSetPanResponderCapture = () => {
		if (this.timeout) clearTimeout(this.timeout);
		return false;
	};

	render() {
		const {style, children} = this.props;
		return (
			<View
				style={style}
				collapsable={false}
				{...this.panResponder.panHandlers}>
				{children}
			</View>
		);
	}
}
