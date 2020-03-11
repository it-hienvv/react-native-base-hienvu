import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {PADDING_COMMON} from 'contants/themes/size';
import I18nTran from 'assets/language';
import {AppTextWithoutTranslate} from 'components/text';
import {AppButton} from 'components/button';

class ModalConfirm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const {
			content,
			onAccept,
			onDeny,
			image,
			contentAccept,
			contentDeny,
		} = this.props;
		return (
			<View style={styles.container}>
				<AppImages
					uri={themes.getImages(image)}
					ImageStyle={styles.img}
				/>
				<AppTextWithoutTranslate
					text={content}
					IStyles={styles.content}
				/>
				<View style={styles.option}>
					{!!contentAccept && (
						<AppButton
							text={contentAccept}
							ButtonProps={{onPress: onAccept}}
							ButtonStyle={styles.btnAccept}
							TextStyle={styles.txtBtn}
						/>
					)}
					<AppButton
						text={contentDeny}
						ButtonProps={{onPress: onDeny}}
						ButtonStyle={styles.btnDeny}
					/>
				</View>
			</View>
		);
	}
}

export default ModalConfirm;

const styles = StyleSheet.create({
	container: {
		backgroundColor: themes.getColor('white'),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		padding: PADDING_COMMON * 2,
		maxWidth: 400,
	},

	img: {
		width: 60,
		height: 60,
		marginBottom: PADDING_COMMON,
	},

	content: {
		textAlign: 'center',
	},

	option: {
		marginTop: PADDING_COMMON * 2,
		flexDirection: 'row',
	},

	btnAccept: {
		backgroundColor: themes.getColor('mainColor'),
		marginRight: PADDING_COMMON,
		paddingHorizontal: 40,
		borderRadius: 5,
	},

	btnDeny: {
		borderRadius: 5,
		paddingHorizontal: 20,
	},

	txtBtn: {
		color: themes.getColor('white'),
	},
});
