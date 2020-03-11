/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import MainNavigation from './src/routers/stack/mainNavigation';
import {mainNavigationService} from './src/routers/managerNavigator';
import configureStore from './src/stores/index';
import rootSaga from './src/sagas/index';
import {MenuProvider} from 'react-native-popup-menu';
import Loading from 'components/app-modal/AppModal';
import 'react-native-gesture-handler';
import SnackBar from 'components/snackbar';
import {
	AppSnackBarManager,
	AppModalManager,
} from 'components/app-modal/Manager';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore(sagaMiddleware);
sagaMiddleware.run(rootSaga);

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			app: {
				language: 'vi',
				themes: 'black',
			},
		};
	}

	componentDidMount() {
		this.loadingRef && AppModalManager.register(this.loadingRef);
	}

	componentWillUnmount() {
		this.loadingRef && AppModalManager.unRegister(this.loadingRef);
	}

	_changeLanguage = () => {
		const {app} = this.state;
		this.setState({
			app: {
				...app,
				themes: app.themes === 'green' ? 'white' : 'green',
				language: app.language === 'vi' ? 'en' : 'vi',
			},
		});
	};

	render() {
		const {app} = this.state;
		return (
			<Provider store={store}>
				<MenuProvider style={{flex: 1}}>
					<MainNavigation
						screenProps={app}
						ref={navigatorRef =>
							mainNavigationService.setTopLevelNavigator(
								navigatorRef,
							)
						}
					/>
					<Loading ref={refs => (this.loadingRef = refs)} />
					<SnackBar
						ref={snackBarRef =>
							AppSnackBarManager.setSnackBarRef(snackBarRef)
						}
					/>
				</MenuProvider>
			</Provider>
		);
	}
}
export default App;
