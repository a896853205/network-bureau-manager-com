// saga
import { call, put, takeLatest } from 'redux-saga/effects';

// actions
import managerAction from '@/redux/action/manager';
import navToAction from '@/redux/action/nav-to';

// 请求
import proxyFetch from '@/util/request';
import * as APIS from '@/constants/api-constants';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// 路由
import { HOME_INDEX, INDEX } from '@/constants/route-constants';

const effects = {
  asyncSetManager: function*({ payload }) {
    // loading开始
    yield put(managerAction.setLoginLoading(true));
    // 请求登录
    const res = yield call(proxyFetch, APIS.GET_MANAGER_TOKEN, payload, 'GET');
    // loading结束
    yield put(managerAction.setLoginLoading(false));

    if (res) {
      // 成功之后将token存到localStorage中并且跳页
      yield put(managerAction.setManager(res.manager));
      localStorage.setItem(`${LOCAL_STORAGE}-token`, res.token);
      yield put(navToAction.setNavTo(HOME_INDEX.path));
    }
    // 不成功不跳
  },
  asyncSetManagerByToken: function*() {
    // loading开始
    yield put(managerAction.setManagerLoading(true));
    
    // 请求管理员信息
    const res = yield call(proxyFetch, APIS.GET_MY_INFO, {}, 'GET');
    // loading结束
    yield put(managerAction.setManagerLoading(false));
    
    if (res) {
      // 成功之后将token存到localStorage中
      yield put(managerAction.setManager(res));
    } else {
      yield put(navToAction.setNavTo(INDEX.path));
    }
  }
};

export default function*() {
  yield takeLatest(managerAction.asyncSetManager, effects.asyncSetManager);
  yield takeLatest(
    managerAction.asyncSetManagerByToken,
    effects.asyncSetManagerByToken
  );
}
