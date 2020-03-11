import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {View, StyleSheet, Text} from 'react-native';
import {AppImages} from 'components/image';
import {AppTextWithoutTranslate, AppNormalText} from 'components/text';
import {BOTTOM_WIDTH_SIZE, PADDING_COMMON} from 'contants/themes/size';
import {WIDTH_SCREEN} from 'utils/util';
import themes from 'assets/themes';
import fonts from 'assets/fonts';

const WIDTH = WIDTH_SCREEN - BOTTOM_WIDTH_SIZE - PADDING_COMMON * 3;

class CompWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {widthComp, children, title, hasSubTitle, style} = this.props;
		return (
			<View style={[styles.container, style, {width: widthComp}]}>
				{!!title && (
					<View style={styles.header}>
						<AppTextWithoutTranslate
							text={title}
							type={'BLOCK-HEADER'}
							IStyles={[
								styles.textTitle,
								fonts['TITLE-DETAIL'],
								{
									marginBottom: hasSubTitle
										? PADDING_COMMON / 2
										: null,
								},
							]}
						/>
					</View>
				)}
				{children}
			</View>
		);
	}
}

CompWrapper.defaultProps = {
	children: <Text />,
	title: '',
	hasSubTitle: false,
	widthComp: WIDTH,
};

CompWrapper.propTypes = {
	// children: PropTypes.element,
	title: PropTypes.string,
	hasSubTitle: PropTypes.bool,
};

export default CompWrapper;

const styles = StyleSheet.create({
	container: {
		// marginTop: PADDING_COMMON,
		// marginLeft: PADDING_COMMON,
		padding: PADDING_COMMON,
		borderRadius: 10,
		backgroundColor: '#fff',
		borderRightWidth: 1,
		borderLeftWidth: 1,
		borderBottomWidth: 1,
		borderColor: themes.getColor('grayLight'),
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},

	header: {
		padding: PADDING_COMMON,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	textTitle: {
		color: themes.getColor('blueBold1'),
		// paddingHorizontal: PADDING_COMMON,
	},
});
