import React, {Component, useCallback} from 'react';
import {FlatList, View, TouchableOpacity} from 'react-native';
import memoizeOne from 'memoize-one';
const ITEM_TYPE = {
	HEADER: 'HEADER',
	ITEM: 'ITEM',
};

const AccordionListItem = React.memo(props => {
	const {
		item,
		itemIndex,
		sectionId,
		sectionIndex,
		activeSections,
		renderItem,
		renderHeader,
		onPressHeader,
	} = props;

	const _isActive = memoizeOne((activeSections, sectionId) => {
		return activeSections.findIndex(itr => itr === sectionId) > -1;
	});

	if (item.itemType == ITEM_TYPE.HEADER) {
		const isActive = _isActive(activeSections, item['id']);
		const _handlePressHeader = useCallback(() => {
			onPressHeader && onPressHeader(item, isActive);
		});

		return (
			<TouchableOpacity onPress={_handlePressHeader}>
				<View>{renderHeader(item, sectionIndex, isActive)}</View>
			</TouchableOpacity>
		);
	}

	return <View>{renderItem(item, itemIndex, sectionId, sectionIndex)}</View>;
});

export default class AccordionList extends Component {
	constructor(props) {
		super(props);
	}

	_renderHeader = (section, isActive, sectionIndex) => {
		const {renderHeader} = this.props;
		return renderHeader(section, isActive, sectionIndex);
	};

	_renderItem = ({item, index}) => {
		const {activeSections = [], renderItem} = this.props;

		return (
			<AccordionListItem
				item={item}
				sectionIndex={item.sectionIndex}
				sectionId={item.sectionId}
				itemIndex={item.itemIndex}
				activeSections={activeSections}
				renderItem={renderItem}
				renderHeader={this._renderHeader}
				onPressHeader={this._handlePressHeader}
			/>
		);
	};

	_handlePressHeader = item => {
		const {activeSections = [], onChange} = this.props;
		// console.log('_handlePressHeader', item)
		const indexOfActiveSection = activeSections.findIndex(
			itr => itr === item.id,
		);
		const isActive = indexOfActiveSection > -1;
		const newActiveSections = [...activeSections];
		if (isActive) {
			newActiveSections.splice(indexOfActiveSection, 1);
		} else {
			newActiveSections.push(item.id);
		}
		onChange && onChange(newActiveSections);
	};

	_getData = memoizeOne((data, activeSections) => {
		// console.log('Inside memoizeOne');
		const newFlatListData = [];
		for (let i = 0; i < data.length; i++) {
			newFlatListData.push({
				...data[i],
				itemType: ITEM_TYPE.HEADER,
				sectionIndex: i,
				sectionId: data[i].id,
			});
			const isActive =
				activeSections.findIndex(itr => itr == data[i].id) > -1;
			if (!isActive) continue;
			const subData = data[i].data || [];
			subData.forEach((subItem, subItemIndex) => {
				newFlatListData.push({
					...subItem,
					itemType: ITEM_TYPE.ITEM,
					sectionId: data[i].id,
					sectionIndex: i,
					itemIndex: subItemIndex,
				});
			});
		}
		return newFlatListData;
	});

	render() {
		const {data, activeSections, ...passProps} = this.props;
		// Note: Id field of section block must named `id`
		return (
			<FlatList
				initialNumToRender={10}
				maxToRenderPerBatch={30}
				windowSize={21}
				{...passProps}
				data={this._getData(data, activeSections)}
				renderItem={this._renderItem}
			/>
		);
	}
}
