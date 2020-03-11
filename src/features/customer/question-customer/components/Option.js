import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import {AppTextWithoutTranslate, AppNormalText} from 'components/text';
import themes from 'assets/themes';

const defaultProps = {
	list: [
		{name: 'Đã có kinh nghiệm', key: 0, selected: true},
		{name: 'Không có', key: 1, selected: false},
	],
};

const exits = props => props !== null && props !== undefined;

class Option extends React.PureComponent {
	static defaultProps = defaultProps;

	constructor(props) {
		super(props);
		const list = this.props.list.map(item => {
			if (item.key === this.props.selected) {
				return {
					...item,
					selected: true,
				};
			} else {
				return {
					...item,
					selected: false,
				};
			}
		});
		this.state = {
			list: exits(this.props.selected) ? list : this.props.list,
		};
	}

	_onSelect = item => () => {
		const list = this.state.list.map((ii, i) => {
			if (item.key === ii.key) {
				return {
					...ii,
					selected: true,
				};
			} else {
				return {
					...ii,
					selected: false,
				};
			}
		});
		this.setState({list});
		this.props.onSelect && this.props.onSelect(item.key);
	};

	_renderOptionItem({item, index}) {
		return (
			<View key={`${index}`} style={styles.viewOption}>
				<TouchableOpacity
					onPress={this._onSelect(item)}
					style={styles.wrap}>
					{item.selected && <View style={styles.subWrap}></View>}
				</TouchableOpacity>
				<AppTextWithoutTranslate
					IStyles={{
						marginHorizontal: PADDING_COMMON,
					}}
					text={item.name}
					type={'H1'}
				/>
			</View>
		);
	}

	render() {
		return this.state.list.map((item, index) =>
			this._renderOptionItem({item, index}),
		);
	}
}

export default Option;

const styles = StyleSheet.create({
	container: {
		borderBottomColor: themes.getColor('grayLight'),
		borderBottomWidth: 1,
		paddingVertical: PADDING_COMMON,
	},
	viewOption: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: PADDING_COMMON,
	},
	wrap: {
		width: 20,
		height: 20,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: themes.getColor('mainColor'),
		justifyContent: 'center',
		alignItems: 'center',
	},
	subWrap: {
		width: 15,
		height: 15,
		borderRadius: 15,
		backgroundColor: themes.getColor('mainColor'),
	},
});
