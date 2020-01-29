// saga
import { call, put, takeLatest } from 'redux-saga/effects';

// actions
import enterpriseAction from '@/redux/action/enterprise';

// 请求
import proxyFetch from '@/util/request';
import * as APIS from '@/constants/api-constants';

const effects = {
  asyncSetRestration: function*({ payload }) {
    // loading
    yield put(enterpriseAction.setRegistrationLoading(true));

    // 查询具体步骤信息
    const [steps, registration] = yield call(async () => {
      return await Promise.all([
        proxyFetch(
          APIS.QUERY_ENTERPRISE_REGISTRATION_STEP,
          {
            registrationUuid: payload
          },
          'GET'
        ),
        proxyFetch(
          APIS.SELECT_REGISTRATION,
          {
            registrationUuid: payload
          },
          'GET'
        )
      ]);
    });

    // 将所有步骤和基本信息存入redux
    yield put(enterpriseAction.setSteps(steps));
    yield put(enterpriseAction.setRegistration(registration));

    // loading
    yield put(enterpriseAction.setRegistrationLoading(false));
  }
};

export default function*() {
  yield takeLatest(
    enterpriseAction.asyncSetRestration,
    effects.asyncSetRestration
  );
}
