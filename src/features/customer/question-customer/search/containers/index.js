import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import AppContainer from 'components/container';
import {PADDING_COMMON} from 'contants/themes/size';
import SearchBar from '../components/searchBar';
import ResultItemSearch from '../components/resultItemSearch';
import {AppNormalText} from 'components/text';
import themes from 'assets/themes';
import EmptyComp from 'components/empty-comp';

class QuestionCustomer extends React.PureComponent {
	state = {
		result: [],
	};

	onSetResult = result => this.setState({result});

	keyExtractor = (item, index) => `${index}`;

	renderItem = ({item, index}) => <ResultItemSearch item={index} onSetResult={this.onSetResult} />;
	_renderResult() {
		const {result} = this.state;
		if (result.length > 0) {
			return (
				<FlatList
					contentContainerStyle={{paddingBottom: 100}}
					data={result}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderItem}
				/>
			);
		} else {
			return (
				<EmptyComp
					title={'no-result'}
					containerStyles={{marginTop: 10}}
				/>
			);
		}
	}
	render() {
		const {result} = this.state;
		return (
			<AppContainer marginLeft>
				<View style={styles.container}>
					<SearchBar onSetResult={this.onSetResult} />
					<Text style={{marginTop: PADDING_COMMON * 2}}>
						<AppNormalText type={'H1'} text={'search-result'}>
							<AppNormalText
								IStyles={styles.text}
								type={'H1'}
								text={'n-result'}
								option={{value: result.length}}
							/>
						</AppNormalText>
					</Text>
					{this._renderResult()}
				</View>
			</AppContainer>
		);
	}
}

export default QuestionCustomer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: PADDING_COMMON,
	},
	text: {
		color: themes.getColor('mainColor'),
	},
});
