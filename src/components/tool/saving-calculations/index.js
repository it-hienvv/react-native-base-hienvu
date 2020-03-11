import React from 'react';
import {StyleSheet, View} from 'react-native';
import themes from 'assets/themes';
import TextInputAnimation from 'components/text-input-animation';
import I18nTran from 'assets/language';

const defaultProps = {};

export default class SavingCalculations extends React.PureComponent {
	static defaultProps = defaultProps;
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View
				style={{
					height: '100%',
					width: 500,
					backgroundColor: themes.getColor('white'),
					borderTopColor: themes.getColor('blackLight'),
					borderTopWidth: 1,
					borderLeftColor: themes.getColor('grayLight'),
					borderLeftWidth: 1,
					padding: 30,
				}}>
				<TextInputAnimation
					label={I18nTran.t('original_total_amount_bh')}
					keyboardType={'number-pad'}
					value={''}
					styleProps={{width: 500 - 2 * 30, marginRight: 0}}
					onChangeText={() => {}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({});
