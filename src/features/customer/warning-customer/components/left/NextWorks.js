import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {SHALLOW_STYLE} from 'contants/themes';
import themes from 'assets/themes';
import {AppButton} from 'components/button';
import {AppNormalText, AppTextWithoutTranslate} from 'components/text';
import {AppImages} from 'components/image';

export default class NextWorks extends React.PureComponent {
	_renderLeft() {
		return (
			<View style={styles.left}>
				<Text>
					<AppNormalText
						IStyles={{color: themes.getColor('orangeOption')}}
						type={'H1'}
						text={'next_work'}>
						<Image
							style={styles.image}
							source={themes.getImages('telephone')}
						/>
						<AppNormalText type="H1" text="call_with_space" />
						<AppTextWithoutTranslate
							IStyles={{
								color: themes.getColor('mainColor'),
							}}
							type={'H1'}
							text={'12:00 2019/01/20'}
						/>
					</AppNormalText>
				</Text>

				<View style={{flexDirection: 'row'}}>
					<AppNormalText
						IStyles={{alignSelf: 'center'}}
						text={'product_need_sell'}>
						<AppTextWithoutTranslate
							IStyles={{
								color: themes.getColor('mainColor'),
							}}
							type={'BODY'}
							text={'Tín chấp, SMS, thẻ credit'}
						/>
						<AppTextWithoutTranslate
							IStyles={{
								color: themes.getColor('mainColor'),
							}}
							type={'BODY'}
							text={'   |   '}
						/>
						<AppTextWithoutTranslate type="BODY" text="SLA:  " />
					</AppNormalText>
					<AppButton
						ButtonProps={{disabled: true}}
						ButtonStyle={styles.buttonSLA}
						TextStyle={{color: themes.getColor('orangeOption')}}
						withoutTranslate
						text={'call'}
					/>
				</View>
			</View>
		);
	}

	_renderRight() {
		return (
			<View style={styles.right}>
				<AppButton
					TextStyle={{color: themes.getColor('white')}}
					ButtonStyle={[
						{
							marginBottom: 10,
							backgroundColor: themes.getColor('orangeOption'),
						},
						styles.button,
					]}
					textType={'H1'}
					text={'call_now'}
				/>
				<AppButton
					ButtonStyle={[styles.button]}
					textType={'H1'}
					text={'update_result'}
				/>
			</View>
		);
	}
	render() {
		const {container} = this.props;
		return (
			<View
				style={[
					styles.container,
					container instanceof Array
						? [...container]
						: {...container},
				]}>
				{this._renderLeft()}
				{this._renderRight()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		...SHALLOW_STYLE,
		borderRadius: 8,
		padding: PADDING_COMMON,
	},
	left: {flex: 1, justifyContent: 'space-evenly'},
	right: {},
	button: {
		paddingVertical: 10,
		borderRadius: 8,
	},
	buttonSLA: {
		borderColor: themes.getColor('orangeOption'),
		borderRadius: 5,
		paddingVertical: 2,
		marginRight: 20,
	},
	image: {
		width: 20,
		padding: 3,
		height: 20,
		resizeMode: 'contain',
	},
});
