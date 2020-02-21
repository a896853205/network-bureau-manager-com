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
  },

  asyncSetTechLeaderRestration: function*({ payload }) {
    // loading
    yield put(enterpriseAction.setRegistrationLoading(true));

    // 查询具体步骤信息
    const [steps, registration] = yield call(async () => {
      return await Promise.all([
        proxyFetch(
          APIS.QUERY_TECH_LEADER_ENTERPRISE_REGISTRATION_STEP,
          {
            registrationUuid: payload
          },
          'GET'
        ),
        proxyFetch(
          APIS.SELECT_TECH_LEADER_REGISTRATION,
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
  },

  asyncSetCertifierRestration: function*({ payload }) {
    // loading
    yield put(enterpriseAction.setRegistrationLoading(true));

    // 查询具体步骤信息
    const [steps, registration] = yield call(async () => {
      return await Promise.all([
        proxyFetch(
          APIS.QUERY_CERTIFIER_ENTERPRISE_REGISTRATION_STEP,
          {
            registrationUuid: payload
          },
          'GET'
        ),
        proxyFetch(
          APIS.SELECT_CERTIFIER_REGISTRATION,
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
  },


  asyncSetTechRestration: function*({ payload }) {
    // loading
    yield put(enterpriseAction.setRegistrationLoading(true));

    // 查询具体步骤信息
    const [steps, registration] = yield call(async () => {
      return await Promise.all([
        proxyFetch(
          APIS.QUERY_TECH_ENTERPRISE_REGISTRATION_STEP,
          {
            registrationUuid: payload
          },
          'GET'
        ),
        proxyFetch(
          APIS.SELECT_TECH_REGISTRATION,
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
  },

  asyncSetSteps: function*({ payload }) {
    // loading
    yield put(enterpriseAction.setRegistrationLoading(true));

    // 查询具体步骤信息
    const steps = yield call(
      proxyFetch,
      APIS.QUERY_ENTERPRISE_REGISTRATION_STEP,
      {
        registrationUuid: payload
      },
      'GET'
    );

    // 将所有步骤和基本信息存入redux
    yield put(enterpriseAction.setSteps(steps));

    // loading
    yield put(enterpriseAction.setRegistrationLoading(false));
  },

  asyncSetSysRegistrationStep: function*({ payload }) {
    yield put(enterpriseAction.setSysRegistrationStepLoading(true));

    const sysRegistrationStep = yield call(
      proxyFetch,
      APIS.QUERY_SYS_REGISTRATION_STEP,
      {},
      'GET'
    );

    yield put(enterpriseAction.setSysRegistrationStep(sysRegistrationStep));
    yield put(enterpriseAction.setSysRegistrationStepLoading(false));
  }
};

export default function*() {
  yield takeLatest(
    enterpriseAction.asyncSetRestration,
    effects.asyncSetRestration
  );
  yield takeLatest(
    enterpriseAction.asyncSetTechLeaderRestration,
    effects.asyncSetTechLeaderRestration
  );
  yield takeLatest(
    enterpriseAction.asyncSetCertifierRestration,
    effects.asyncSetCertifierRestration
  );
  yield takeLatest(
    enterpriseAction.asyncSetTechRestration,
    effects.asyncSetTechRestration
  );
  yield takeLatest(
    enterpriseAction.asyncSetSysRegistrationStep,
    effects.asyncSetSysRegistrationStep
  );
  yield takeLatest(enterpriseAction.asyncSetSteps, effects.asyncSetSteps);
}
