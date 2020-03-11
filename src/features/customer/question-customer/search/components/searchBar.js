import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {SHALLOW_STYLE} from 'contants/themes';
import {AppNormalText} from 'components/text';
import {AppImages} from 'components/image';
import themes from 'assets/themes';
import {AppButton} from 'components/button';
import Option from '../../components/Option';
import I18nTran from 'assets/language';
import {SEARCH_KEY} from '../contants';

class SearchBar extends React.PureComponent {
	state = {
		list: [
			{
				name: I18nTran.t('current-customer-kh'),
				key: SEARCH_KEY.current,
				selected: true,
			},
			{
				name: I18nTran.t('clue-customer-kh'),
				key: SEARCH_KEY.clue,
				selected: false,
			},
		],
		searchText: '',
		selected: SEARCH_KEY.current,
	};

	_onChangeText = searchText => this.setState({searchText});

	_onSearch = () => {
		const {selected} = this.state;
		if (selected === SEARCH_KEY.current) {
			this.props.onSetResult(new Array(5));
		} else {
			this.props.onSetResult(new Array(10));
		}
	};

	onSelect = key => this.setState({selected: key});

	_renderTitle() {
		return (
			<View>
				<AppNormalText text={'search-customer'} type={'H1'} />
			</View>
		);
	}

	_renderTool() {
		return (
			<View style={styles.viewTool}>
				<AppImages
					ImageStyle={styles.image}
					uri={themes.getImages('search')}
				/>
				<TextInput
					onEndEditing={this._onSearch}
					onSubmitEditing={this._onSearch}
					onChangeText={this._onChangeText}
					value={this.state.searchText}
					style={styles.inputSearch}
				/>
				<Option onSelect={this.onSelect} list={this.state.list} />
				<AppButton
					ButtonProps={{onPress: this._onSearch}}
					TextStyle={styles.searchText}
					ButtonStyle={styles.searchButton}
					text={'search'}
					textType={'H1'}
				/>
			</View>
		);
	}

	render() {
		return (
			<View
				style={[
					styles.container,
					this.props.container instanceof Array
						? [...this.props.container]
						: {...this.props.container},
				]}>
				{this._renderTitle()}
				{this._renderTool()}
			</View>
		);
	}
}

export default SearchBar;

const styles = StyleSheet.create({
	container: {
		...SHALLOW_STYLE,
		padding: PADDING_COMMON,
	},
	viewTool: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginVertical: PADDING_COMMON,
	},
	inputSearch: {
		width: 300,
		height: 30,
		borderBottomColor: themes.getColor('grayBold'),
		borderBottomWidth: 1,
	},
	image: {
		width: 25,
		height: 25,
		marginRight: PADDING_COMMON,
	},
	searchButton: {
		backgroundColor: themes.getColor('mainColor'),
		borderRadius: 5,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	searchText: {
		color: themes.getColor('white'),
	},
});
