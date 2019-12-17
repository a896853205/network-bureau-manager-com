import { createStore, combineReducers, applyMiddleware } from 'redux';
// reducer
import managerReducer from '@/redux/reducer/manager';
import NavToReducer from '@/redux/reducer/nav-to';

// saga
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import managerSaga from '@/redux/saga/manager';

const sagaMiddleware = createSagaMiddleware();

// Reducer
const rootReducer = combineReducers({
  managerStore: managerReducer,
  NavToStore: NavToReducer
});

const rootSaga = function*() {
  yield all([
    managerSaga()
    // watchIncrementAsync()
  ]);
  // code after all-effect
};

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
