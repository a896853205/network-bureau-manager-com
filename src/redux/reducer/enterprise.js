import { handleActions } from 'redux-actions';

const statusToColor = status => {
  let color = '';

  switch (status) {
    case 1:
      color = 'grey';
      break;
    case 2:
      color = 'blue';
      break;
    case 3:
      color = 'green';
      break;
    case 4:
      color = 'red';
      break;
    default:
      color = 'blue';
  }
  return color;
};

export default handleActions(
  {
    setEnterpriseRegistrationUuid(state, { payload: result }) {
      return {
        ...state,
        enterpriseRegistrationUuid: result
      };
    },
    setSteps(state, { payload: result }) {
      let stepWithColor = result.map(step => ({
        ...step,
        color: statusToColor(step.status)
      }));

      return {
        ...state,
        steps: stepWithColor
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
    },
    setSysRegistrationStep(state, { payload: result }) {
      return {
        ...state,
        sysRegistrationStep: result
      };
    },
    setSysRegistrationStepLoading(state, { payload: result }) {
      return {
        ...state,
        sysRegistrationStepLoading: result
      };
    }
  },
  {
    // 登记测试
    enterpriseRegistrationUuid: '',
    steps: [], // 步骤详细信息
    registration: null,
    registrationLoading: true, // 查询登记测试的loading
    sysRegistrationStep: [],
    sysRegistrationStepLoading: true
  }
);
