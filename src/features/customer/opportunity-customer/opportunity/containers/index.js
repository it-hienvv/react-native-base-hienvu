import React from 'react';
import {StyleSheet} from 'react-native';
import AppContainer from 'components/container';
import EmptyComp from 'components/empty-comp';

class Opportunity extends React.Component {
	render() {
		return (
			<AppContainer marginLeft>
				<EmptyComp />
			</AppContainer>
		);
	}
}

export default Opportunity;
