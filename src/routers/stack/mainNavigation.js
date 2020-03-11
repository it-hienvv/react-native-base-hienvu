import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as screenNames from '../screenNames';
import RootView from '../../RootView';
import compareProductsContainer from 'features/sale-kit/compare-product/containers/compareProductsContainer';
import VideoTutorial from 'features/Login/components/VideoTutorial';
import authenticationStack from './authenticationStack';
import AddCustomer from 'features/customer/clue-customer/add-customer/AddCustomerContainer';
import DetailCustomer from 'features/customer/clue-customer/detail-customer/DetailCustomerContainer';
import EditCustomerContainer from 'features/customer/clue-customer/edit-customer/EditCustomerContainer';
import detailCustomerContainer from 'features/customer/current-customer/detail/containers/detailCustomerContainer';
import detailSearchContainer from 'features/customer/question-customer/detail-search/containers/detailSearchContainer';

const mainStack = createStackNavigator(
	{
		[screenNames.MAIN_MENU_STACK]: RootView,
		[screenNames.SALE_KIT_COMPARE_PRODUCT_SCREEN]: compareProductsContainer,
		[screenNames.VIDEO_TUTORIAL]: VideoTutorial,
		[screenNames.ADD_CUSTOMER]: AddCustomer,
		[screenNames.DETAIL_CUSTOMER]: DetailCustomer,
		[screenNames.EDIT_CUSTOMER]: EditCustomerContainer,
		[screenNames.DETAIL_CURRENT_CUSTOMER]: detailCustomerContainer,
		[screenNames.DETAIL_CUSTOMER_SEARCH]: detailSearchContainer,
	},
	{
		initialRouteName: screenNames.MAIN_MENU_STACK,
		headerMode: 'none',
	},
);

const switchMainStack = createSwitchNavigator(
	{
		[screenNames.AUTHENTICATION_STACK]: authenticationStack,
		[screenNames.MAIN_STACK]: mainStack,
	},
	{
		initialRouteName: screenNames.MAIN_STACK,
		headerMode: 'none',
	},
);
const MainNavigation = createAppContainer(switchMainStack);
export default MainNavigation;
