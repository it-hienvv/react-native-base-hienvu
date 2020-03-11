import React from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {SHALLOW_STYLE} from 'contants/themes';
import {AppTextWithoutTranslate, AppNormalText} from 'components/text';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {AppButton} from 'components/button';
import TextInputAnimation from 'components/text-input-animation';
import I18nTran from 'assets/language';
import CompPopupAnim from 'components/comp-popup-animation';
import Row from './row';
import Header from './header';

const defaultProps = {
	listHeaders: [],
	listRows: [],
	listTypes: [],
	listFlex: [],
	data: [],
};
export default class Table extends React.PureComponent {
	static defaultProps = defaultProps;

	_renderItem = ({item, index}) => (
		<Row {...this.props} item={item} ii={index} />
	);
	_keyExtractor = (item, index) => `${item.key}`;

	_renderHeader = () => <Header {...this.props} />;
	render() {
		return (
			<FlatList
				ListHeaderComponent={this._renderHeader}
				renderItem={this._renderItem}
				keyExtractor={this._keyExtractor}
				data={this.props.data}
			/>
		);
	}
}
