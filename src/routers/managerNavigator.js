import {NavigationActions, StackActions} from 'react-navigation';

class ManagerNavigator {
	navigator = null;
	setTopLevelNavigator(_navigator) {
		this.navigator = _navigator;
	}

	navigate(routeName, params = {}) {
		this.navigator.dispatch(
			NavigationActions.navigate({
				routeName,
				params,
			}),
		);
	}

	reset(routeName, params = {}, action = {}) {
		this.navigator.dispatch(
			StackActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({routeName, params, action}),
				],
			}),
		);
	}

	push(routerName, params = {}) {
		this.navigator.dispatch(
			StackActions.push({
				routeName: routerName,
				params: params,
			}),
		);
	}

	pop() {
		this.navigator.dispatch(NavigationActions.back());
	}
}
const mainNavigationService = new ManagerNavigator();
export {mainNavigationService};
