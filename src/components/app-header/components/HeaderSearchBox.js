import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {WIDTH_SCREEN} from 'utils/util';
import {BOTTOM_WIDTH_SIZE} from 'contants/themes/size';
import I18nTran from 'assets/language';
import {AppNormalText} from 'components/text';
import AppTextInput from 'components/text-input';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
const height = 30;
const width = (WIDTH_SCREEN - BOTTOM_WIDTH_SIZE) / 2;
const searchIconViewWidth = 60;
const defaultProps = {
	IStyles: {},
};
const propTypes = {
	IStyles: PropTypes.object,
};
class HeaderSearchBox extends React.PureComponent {
	static defaultProps = defaultProps;
	static propTypes = propTypes;
	state = {
		onTyping: false,
	};

	_onTyping = () => {
		this.setState({onTyping: true});
	};
	render() {
		const {IStyles} = this.props;
		const {onTyping} = this.state;
		return (
			<View style={[styles.container, {...IStyles}]}>
				<AppTextInput
					TextInputStyles={styles.textInput}
					placeholder={I18nTran.t('search')}
				/>
				<TouchableOpacity style={styles.searchView}>
					{onTyping ? (
						<AppNormalText
							text={'search'}
							option={{name: 'string'}}
						/>
					) : (
						<AppImages
							style={styles.image}
							uri={themes.getImages('search')}
						/>
					)}
				</TouchableOpacity>
			</View>
		);
	}
}
export default HeaderSearchBox;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: height,
		width: width,
	},
	textInput: {
		height: '100%',
		padding: 0,
		paddingLeft: 10,
		width: width - searchIconViewWidth,
		borderWidth: 0.5,
		borderColor: 'gray',
	},
	searchView: {
		height: height,
		width: searchIconViewWidth,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0.5,
		borderColor: 'gray',
		borderLeftWidth: 0,
	},
	image: {
		resizeMode: 'contain',
		width: 20,
		height: 20,
	},
});
