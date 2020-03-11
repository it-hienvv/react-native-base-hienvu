import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppTextWithoutTranslate} from 'components/text';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {TABLE} from '../../contants';

export default class Header extends React.PureComponent {
	_onPlus = () => {
		this.props.onPlus && this.props.onPlus();
	};

	_selectItem = ({item, index}) => {
		const {listTypes, listHeaders} = this.props;
		switch (listTypes[index]) {
			case TABLE.type.index:
				return <AppTextWithoutTranslate type={'CAPTION'} text={'#'} />;
			case TABLE.type.icon:
				return (
					<AppImages
						ButtonStyles={{
							paddingVertical: 8,
						}}
						ButtonProps={{onPress: this._onPlus}}
						uri={themes.getImages('plus')}
					/>
				);
			default:
				return (
					<AppTextWithoutTranslate
						type={'CAPTION'}
						text={listHeaders[index]}
					/>
				);
		}
	};
	_renderItem = ({item, index}) => {
		return (
			<View
				key={`${index}`}
				style={{
					flex: item,
					height: 30,
					paddingLeft: 15,
					paddingVertical: 10,
					borderColor: themes.getColor('grayLight'),
					borderLeftWidth: index === 0 ? 1 : 0,
					borderRightWidth: index === 0 || index === 1 ? 1 : 0,
					paddingRight: 10,
					backgroundColor: themes.getColor('backgroundBlue'),
					justifyContent: 'center',
				}}>
				{this._selectItem({item, index})}
			</View>
		);
	};

	render() {
		const {listFlex} = this.props;
		return (
			<View
				style={{
					flexDirection: 'row',
					borderBottomColor: themes.getColor('grayLight'),
					borderBottomWidth: 1,
				}}>
				{listFlex.map((item, index) => this._renderItem({item, index}))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		width: '100%',
		height: '100%',
		borderRadius: 5,
		paddingHorizontal: 5,
		paddingVertical: 3,
	},
});
