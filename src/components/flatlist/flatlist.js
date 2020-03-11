/* eslint-disable react/display-name */
import React from 'react';
import {FlatList} from 'react-native';
import {AppTextWithoutTranslate} from 'components/text';

const defaultProps = {
	maxToRenderPerBatch: 10,
	updateCellsBatchingPeriod: 50,
	removeClippedSubviews: false,
	initialNumToRender: 10,
	windowSize: 21,
	keyExtractor: (item, index) => `${index}`,
	renderItem: ({item, index}) => (
		<AppTextWithoutTranslate key={`${index}`} text={'Truyền renderItem '} />
	),
	data: [],
	viewabilityConfig: {
		minimumViewTime: 3000,
		viewAreaCoveragePercentThreshold: 100,
		waitForInteraction: true,
	},
};
class AppFlatList extends React.PureComponent {
	static defaultProps = defaultProps;
	constructor(props) {
		super(props);
		this.getItemLayout = (data, index) => ({
			length: this.props.itemHeight ? this.props.itemHeight : 50,
			offset: this.props.itemHeight
				? this.props.itemHeight * index
				: 50 * index,
			index,
		});
	}
	render() {
		return (
			<FlatList
				getItemLayout={
					this.props.itemHeight ? this.getItemLayout : undefined
				}
				{...this.props}
			/>
		);
	}
}

export default AppFlatList;
