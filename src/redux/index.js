import { createStore, combineReducers, applyMiddleware } from 'redux';
// reducer
import managerReducer from '@/redux/reducer/manager';
import enterpriseReducer from '@/redux/reducer/enterprise';
import NavToReducer from '@/redux/reducer/nav-to';

// saga
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import managerSaga from '@/redux/saga/manager';
import enterpriseSaga from '@/redux/saga/enterprise';

const sagaMiddleware = createSagaMiddleware();

// Reducer
const rootReducer = combineReducers({
  enterpriseStore: enterpriseReducer,
  managerStore: managerReducer,
  NavToStore: NavToReducer
});

const rootSaga = function*() {
  yield all([
    managerSaga(),
    enterpriseSaga()
    // watchIncrementAsync()
  ]);
  // code after all-effect
};

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
