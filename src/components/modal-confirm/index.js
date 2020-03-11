import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {PADDING_COMMON} from 'contants/themes/size';
import I18nTran from 'assets/language';
import {AppTextWithoutTranslate} from 'components/text';
import {AppButton} from 'components/button';

class ModalConfirm extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			title,
			content,
			onAccept,
			onDeny,
			image,
			contentAccept,
			contentDeny,
			onClose,
		} = this.props;
		return (
			<View style={styles.container}>
				{!!title && (
					<View style={styles.modalHeader}>
						<AppTextWithoutTranslate
							type={'H2'}
							text={title}
							IStyles={{
								color: themes.getColor('blackBold'),
								fontWeight: '600',
								flex: 1,
							}}
						/>
						<AppImages
							ButtonProps={{
								onPress: onClose,
							}}
							uri={themes.getImages('cancelModal')}
							ImageStyle={styles.closeIcon}
						/>
					</View>
				)}
				<View style={styles.modalBody}>
					{!!image && (
						<AppImages
							uri={themes.getImages(image)}
							ImageStyle={[styles.img, styleImage]}
						/>
					)}
					<AppTextWithoutTranslate
						text={content}
						IStyles={styles.content}
					/>
					<View style={styles.buttonRow}>
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
			</View>
		);
	}
}

export default ModalConfirm;

const styles = StyleSheet.create({
	container: {
		backgroundColor: themes.getColor('white'),
		borderRadius: 5,
		width: 400,
	},

	modalHeader: {
		padding: PADDING_COMMON,
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
	},
	modalBody: {
		padding: PADDING_COMMON,
	},
	closeIcon: {
		width: 20,
		height: 20,
	},

	img: {
		width: 60,
		height: 60,
		marginBottom: PADDING_COMMON,
	},

	content: {},

	buttonRow: {
		marginTop: PADDING_COMMON * 2,
		flexDirection: 'row',
	},

	btnAccept: {
		backgroundColor: themes.getColor('mainColor'),
		marginRight: PADDING_COMMON,
		borderRadius: 5,
		height: 40,
	},

	btnDeny: {
		borderRadius: 5,
		paddingHorizontal: 20,
		height: 40,
	},

	txtBtn: {
		color: themes.getColor('white'),
	},
});
