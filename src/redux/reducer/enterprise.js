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
      return 'gray';
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
      return 'gray';
  }
};

const paymentStatusToColor = status => {
  switch (status) {
    case 0:
      return 'gray';
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
    setFileDownloadRegistrationUuid(state, { payload: result }) {
      return {
        ...state,
        fileDownloadRegistrationUuid: result
      };
    },

    // 委托测试
    setEnterpriseDelegationUuid(state, { payload: result }) {
      return {
        ...state,
        enterpriseDelegationUuid: result
      };
    },
    setDelegationSteps(state, { payload: result }) {
      let stepWithColor = result.map(step => ({
        ...step,
        color: proxyStatusColor(step.step, step.status)
      }));

      return {
        ...state,
        delegationSteps: stepWithColor
      };
    },
    setDelegation(state, { payload: result }) {
      return {
        ...state,
        delegation: result
      };
    },
    setDelegationLoading(state, { payload: result }) {
      return {
        ...state,
        delegationLoading: result
      };
    },
    setSysDelegationStep(state, { payload: result }) {
      return {
        ...state,
        sysDelegationStep: result
      };
    },
    setSysDelegationStepLoading(state, { payload: result }) {
      return {
        ...state,
        sysDelegationStepLoading: result
      };
    },
    setFileDownloadDelegationUuid(state, { payload: result }) {
      return {
        ...state,
        fileDownloadDelegationUuid: result
      };
    }
  },
  {
    // 登记测试
    // 进度详细信息
    enterpriseRegistrationUuid: '',
    steps: [], // 步骤详细信息
    registration: null,
    registrationLoading: true, // 查询登记测试的loading
    // 系统步骤名称
    sysRegistrationStep: [],
    sysRegistrationStepLoading: true,
    // 内容详细信息
    fileDownloadRegistrationUuid: '',

     // 委托测试
    // 进度详细信息
    enterpriseDelegationUuid: '',
    delegationSteps: [], // 步骤详细信息
    delegation: null,
    delegationLoading: true, // 查询登记测试的loading
    // 系统步骤名称
    sysDelegationStep: [],
    sysDelegationStepLoading: true,
    // 内容详细信息
    fileDownloadDelegationUuid: ''
  }
);
