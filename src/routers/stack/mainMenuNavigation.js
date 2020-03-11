import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import * as screenNames from '../screenNames';
import saleKitContainer from 'features/sale-kit/product-and-service/containers/saleKitContainer';
import clueCustomerContainer from 'features/customer/clue-customer/clue/containers/clueCustomerContainer';
import dashboardContainer from 'features/dashboard/containers/dashboardContainer';
import kpiContainer from 'features/kpi/containers/kpiContainer';
import currentCustomerContainer from 'features/customer/current-customer/current/containers/currentCustomerContainer';
import BottomCustom from 'components/tab-bar/leftTabContainer';
import React from 'react';
import opportunityContainer from 'features/customer/opportunity-customer/opportunity/containers/opportunityContainer';
import questionCustomerContainer from 'features/customer/question-customer/search/containers/questionCustomerContainer';
import warningCustomerContainer from 'features/customer/warning-customer/containers/warningCustomerContainer';

const mainMenuStack = createBottomTabNavigator(
	{
		[screenNames.DASHBOARD_SCREEN]: dashboardContainer,
		[screenNames.SALE_KIT_SCREEN]: saleKitContainer,
		[screenNames.CLUE_CUSTOMER]: clueCustomerContainer,
		[screenNames.CURRENT_CUSTOMER]: currentCustomerContainer,
		[screenNames.QUESTION_CUSTOMER]: questionCustomerContainer,
		[screenNames.WARNING_CUSTOMER]: warningCustomerContainer,
		[screenNames.KPI_SCREEN]: kpiContainer,
		[screenNames.OPPORTUNITY_CUSTOMER]: opportunityContainer,
	},
	{
		initialRouteName: screenNames.DASHBOARD_SCREEN,
		headerMode: 'none',
		tabBarComponent: props => <BottomCustom {...props} />,
	},
);

export default createAppContainer(mainMenuStack);
