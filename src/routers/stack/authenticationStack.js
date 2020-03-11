import {createStackNavigator} from 'react-navigation-stack';
import * as screenNames from '../screenNames';
import Login from 'features/Login/containers/loginContainer';
import VideoTutorial from 'features/Login/components/VideoTutorial';
const authenticationStack = createStackNavigator(
	{
		[screenNames.LOGIN_SCREEN]: Login,
		[screenNames.VIDEO_TUTORIAL]: VideoTutorial,
	},
	{
		initialRouteName: screenNames.LOGIN_SCREEN,
		headerMode: 'none',
	},
);

export default authenticationStack;
