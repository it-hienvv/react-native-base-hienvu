import React from 'react';
import HTML from 'react-native-render-html';
import {WIDTH_SCREEN} from 'utils/util';
import AutoHeightWebView from 'react-native-autoheight-webview';
const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

interface IProps {
	html: string;
	imagesMaxWidth: number;
	isTable?: boolean;
}

interface IStates {}
class HtmlRender extends React.PureComponent<IProps, IStates> {
	render() {
		const {
			html = htmlContent,
			imagesMaxWidth = WIDTH_SCREEN,
			isTable = false,
		} = this.props;

		return isTable ? (
			<AutoHeightWebView
				style={{backgroundColor: 'transparent', width: '100%'}}
				startInLoadingState={true}
				source={{
					html,
				}}
			/>
		) : (
			<HTML html={html} imagesMaxWidth={imagesMaxWidth} />
		);
	}
}

export default HtmlRender;
