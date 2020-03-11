import {combineReducers} from 'redux';
import {notificationReducers} from './notificationReducers';
import {saleKitReducers} from 'features/sale-kit/product-and-service/reducers/saleKitReducers';
import {opportunityReducers} from 'features/customer/clue-customer/clue/reducers/opportunityReducers';
import {leftAppTabReducers} from './leftAppTabReducers';
import {userReducers} from 'features/Login/reducers/loginReducers';
import {customerDetailSearch} from 'features/customer/question-customer/detail-search/reducers';
const rootReducers = combineReducers({
	userReducers,
	notificationReducers,
	saleKitReducers,
	leftAppTabReducers,
	opportunityReducers,
	customerDetailSearch,
});
export default rootReducers;
