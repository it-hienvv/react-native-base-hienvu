/* eslint-disable react/display-name */
import React from 'react';
import {SectionList} from 'react-native';
import {AppTextWithoutTranslate} from 'components/text';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

const defaultProps = {
	maxToRenderPerBatch: 10,
	updateCellsBatchingPeriod: 50,
	removeClippedSubviews: false,
	initialNumToRender: 10,
	windowSize: 21,
	keyExtractor: (item, index) => `${index}`,
	renderItem: ({item, index}) => (
		<AppTextWithoutTranslate key={`${index}`} text={'Truyền renderItem'} />
	),
	sections: [],
	viewabilityConfig: {
		minimumViewTime: 3000,
		viewAreaCoveragePercentThreshold: 100,
		waitForInteraction: true,
	},
	renderSectionHeader: ({section: {title, data, id}}) => (
		<AppTextWithoutTranslate
			key={`${id}`}
			text={'Truyền renderSectionHeader'}
		/>
	),
};
class AppSectionList extends React.PureComponent {
	static defaultProps = defaultProps;
	constructor(props) {
		super(props);
		this.getItemLayout = sectionListGetItemLayout({
			// The height of the row with rowData at the given sectionIndex and rowIndex
			getItemHeight: (rowData, sectionIndex, rowIndex) =>
				this.props.itemHeight,
			// // These four properties are optional
			// getSeparatorHeight: () => 1 / PixelRatio.get(), // The height of your separators
			// getSectionHeaderHeight: () => 20, // The height of your section headers
			// getSectionFooterHeight: () => 10, // The height of your section footers
			// listHeaderHeight: 40, // The height of your list header
		});
	}
	render() {
		return (
			<SectionList
				{...this.props}
				getItemLayout={
					this.props.itemHeight ? this.getItemLayout : undefined
				}
			/>
		);
	}
}

export default AppSectionList;
