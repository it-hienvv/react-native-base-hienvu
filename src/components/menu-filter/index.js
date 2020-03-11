import React from 'react';
import {View, Image} from 'react-native';
import {AppTextWithoutTranslate} from 'components/text';
import themes from 'assets/themes';
import styles from './styles';
export default class MenuFilter extends React.Component {
	render() {
		return (
			<View style={styles.rowFilter}>
				<AppTextWithoutTranslate
					IStyles={styles.itemFilterHeader}
					IProps={{
						numberOfLines: 1,
						ellipsizeMode: 'tail',
					}}
					type={'BODY1'}
					text={this.props.titleMenu}
				/>
				<Image
					source={themes.getImages('dropDown')}
					resizeMode={'contain'}
					style={styles.iconDropDown}
				/>
			</View>
		);
	}
}
