import { handleActions } from 'redux-actions';

const statusToColor = status => {
  switch (status) {
    case 0:
      return 'gray';
    case 1:
      return 'blue';
    case 100:
      return 'green';
    case -1:
      return 'red';
    default:
      return 'blue';
  }
};

const contractStatusToColor = status => {
  switch (status) {
    case -1:
      return 'red';
    case 0:
      return 'grey';
    case 1:
      return 'blue';
    case 2:
      return 'blue';
    case 3:
      return 'blue';
    case 4:
      return 'blue';
    case 5:
      return 'blue';
    case 100:
      return 'green';
    default:
      return 'grey';
  }
};

const paymentStatusToColor = status => {
  switch (status) {
    case 0:
      return 'grey';
    case 1:
      return 'blue';
    case 2:
      return 'blue';
    case 3:
      return 'blue';
    case 4:
      return 'blue';
    case 100:
      return 'green';
    default:
      return 'blue';
  }
};

const proxyStatusColor = (step, status) => {
  if (step === 1) return statusToColor(status);
  else if (step === 2) return contractStatusToColor(status);
  else if (step === 3) return paymentStatusToColor(status);
  else if (step === 4) return statusToColor(status);
  else if (step === 5) return statusToColor(status);
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
        color: proxyStatusColor(step.step, step.status)
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
    },
    setTechLeaderEnterpriseRegistrationUuid(state, { payload: result }) {
      return {
        ...state,
        techLeaderEnterpriseRegistrationUuid: result
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
    sysRegistrationStepLoading: true,
    // 技术管理员的登记测试
    techLeaderEnterpriseRegistrationUuid: ''
  }
);
