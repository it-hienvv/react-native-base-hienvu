import React from 'react';
import {StyleSheet, View} from 'react-native';
import Basic from '../common-information/basic';
import Representative from '../common-information/representative';
import Finance from '../common-information/finance';
import Loading from 'components/loading';

class BasicInformation extends React.PureComponent {
	state = {
		loading: true,
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({loading: false});
		}, 1000);
	}
	render() {
		const {accountId, list} = this.props;
		const {loading} = this.state;
		return loading ? (
			<Loading />
		) : (
			<View style={styles.container}>
				<Basic list={list} accountId={accountId} />
				<Representative list={list} accountId={accountId} />
				<Finance accountId={accountId} />
			</View>
		);
	}
}
export default BasicInformation;
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerStyles: {
		paddingHorizontal: 0,
		paddingTop: 0,
	},
});
