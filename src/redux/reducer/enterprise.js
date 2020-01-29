import { handleActions } from 'redux-actions';

export default handleActions(
  {
    setEnterpriseRegistrationUuid(state, { payload: result }) {
      return {
        ...state,
        enterpriseRegistrationUuid: result
      };
    },
    setSteps(state, { payload: result }) {
      return {
        ...state,
        steps: result
      };
    },
    setRegistration(state, { payload: result }) {
      return {
        ...state,
        registration: result
      };
    },
    setRegistrationLoading(state, { payload: result }) {
      return {
        ...state,
        registrationLoading: result
      };
    }
  },
  {
    // 登记测试
    enterpriseRegistrationUuid: '',
    steps: [], // 步骤详细信息
    registration: null,
    registrationLoading: true // 查询登记测试的loading
  }
);
