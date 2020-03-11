import React from 'react';
import {StyleSheet, View, BackHandler} from 'react-native';
import AppContainer from 'components/container';
import {SHALLOW_STYLE} from 'contants/themes';
import themes from 'assets/themes';
import CurrentCustomerList from '../components/current-customer-list';

const marginSpacing = 30;
const borderRadius = 10;
class CurrentCustomer extends React.PureComponent {
	render() {
		const {onDoneSys} = this.props;
		return (
			<AppContainer marginLeft>
				<View style={styles.container}>
					<View style={styles.clueCustomer}>
						<CurrentCustomerList onDoneSys={onDoneSys} />
					</View>
				</View>
			</AppContainer>
		);
	}
}

export default CurrentCustomer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingTop: PADDING_COMMON,
		// paddingHorizontal: PADDING_COMMON,
	},
	body: {
		marginBottom: 50,
	},
	clueCustomer: {
		flex: 1,
		width: '100%',
		...SHALLOW_STYLE,
		borderRadius: borderRadius,
		paddingTop: marginSpacing,
		borderWidth: 0.5,
		borderColor: themes.getColor('grayLight'),
	},
});
