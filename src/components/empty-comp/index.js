import React from 'react';
import {View} from 'react-native';
import {AppNormalText} from 'components/text';
import {AppImages} from 'components/image';
import themes from 'assets/themes';

const defaultProps = {
	title: 'no_data',
	uri: themes.getImages('imgEmptyFolder'),
};
class EmptyComp extends React.Component {
	static defaultProps = defaultProps;
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {title, uri, containerStyles} = this.props;
		return (
			<View
				style={[
					{
						flex: 1,
						backgroundColor: '#fff',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 10,
					},
					containerStyles,
				]}>
				<AppImages
					ButtonProps={{disabled: true}}
					ImageStyle={{height: 150, width: 150}}
					uri={uri}
				/>
				<AppNormalText
					text={title}
					type={'BODY1'}
					IStyles={{
						paddingVertical: 10,
						color: '#262626',
					}}
				/>
			</View>
		);
	}
}

export default EmptyComp;
