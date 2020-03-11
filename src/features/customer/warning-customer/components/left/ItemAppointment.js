import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {SHALLOW_STYLE} from 'contants/themes';
import themes from 'assets/themes';
import {AppTextWithoutTranslate} from 'components/text';

export default class ItemAppointment extends React.PureComponent {
	_renderTop() {
		return (
			<View style={styles.top}>
				<Text>
					<Image
						style={styles.image}
						source={themes.getImages('telephone')}
					/>
					<AppTextWithoutTranslate type={'H2'} text="  Hẹn gặp" />
				</Text>
				<Text>
					<AppTextWithoutTranslate text="Trạng thái:" />
					<AppTextWithoutTranslate
						IStyles={{color: themes.getColor('greenOption')}}
						text="Chốt sale"
					/>
					<AppTextWithoutTranslate text="  |  " />
					<AppTextWithoutTranslate text="14:21 12/07/2019  " />
					<Image
						style={styles.image}
						source={themes.getImages('threeDot')}
					/>
				</Text>
			</View>
		);
	}

	_renderBottom() {
		return (
			<View style={styles.bottom}>
				<AppTextWithoutTranslate
					text={'Khách hàng hẹn 4h chiều mai ở văn phòng Mb bank'}
					IProps={{numberOfLines: 0}}
				/>
				<Text numberOfLines={0}>
					<AppTextWithoutTranslate text={'Người đi cùng: '} />
					<AppTextWithoutTranslate
						IStyles={{color: themes.getColor('mainColor')}}
						type={'BODY'}
						text={'Nguyễn Thị Quỳnh Anh'}
					/>
				</Text>
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
				{this._renderTop()}
				{this._renderBottom()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		justifyContent: 'space-between',
		...SHALLOW_STYLE,
		borderRadius: 8,
		paddingVertical: PADDING_COMMON,
	},
	top: {
		padding: PADDING_COMMON,
		borderBottomColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	bottom: {
		paddingHorizontal: PADDING_COMMON,
		width: '100%',
		paddingTop: PADDING_COMMON,
	},
	image: {
		width: 20,
		padding: 3,
		height: 20,
		resizeMode: 'contain',
	},
});
