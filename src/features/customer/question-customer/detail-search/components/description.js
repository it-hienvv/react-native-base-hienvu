import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {SHALLOW_STYLE} from 'contants/themes';
import {AppTextWithoutTranslate, AppNormalText} from 'components/text';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {AppButton} from 'components/button';

class Description extends React.PureComponent {
	state = {
		showMore: false,
	};

	_onPress = () => {
		this.setState(prevState => ({showMore: !prevState.showMore}));
	};

	render() {
		return (
			<View
				style={[
					styles.container,
					this.props.container instanceof Array
						? [...this.props.container]
						: {...this.props.container},
				]}>
				<AppTextWithoutTranslate
					IProps={{numberOfLines: 3}}
					text={
						'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab'
					}
					type={'CAPTION'}
				/>

				{this.state.showMore && (
					<AppTextWithoutTranslate
						IProps={{numberOfLines: 0}}
						text={
							'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab'
						}
						type={'CAPTION'}
					/>
				)}

				<TouchableOpacity
					onPress={this._onPress}
					style={styles.showMoreView}>
					<AppImages
						ImageStyle={[
							this.state.showMore && {
								transform: [{rotate: '-180deg'}],
							},
							{
								marginRight: 10,
								width: 14,
								height: 14,
								tintColor: themes.getColor('mainColor'),
							},
						]}
						ButtonProps={{disabled: true}}
						uri={themes.getImages('expand')}
					/>
					<AppNormalText
						IStyles={{color: themes.getColor('mainColor')}}
						text={'detail'}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Description;

const styles = StyleSheet.create({
	container: {
		padding: PADDING_COMMON,
		borderBottomColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
	},
	showMoreView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: PADDING_COMMON,
	},
});
