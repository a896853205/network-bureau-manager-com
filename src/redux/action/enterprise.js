import { createAction } from 'redux-actions';

export default {
  setEnterpriseRegistrationUuid: createAction('setEnterpriseRegistrationUuid'),
  setSteps: createAction('setSteps'),
  asyncSetSteps: createAction('asyncSetSteps'),
  setRegistration: createAction('setRegistration'),
  asyncSetRestration: createAction('asyncSetRestration'),
  setRegistrationLoading: createAction('setRegistrationLoading'),
  // 系统步骤名称
  setSysRegistrationStep: createAction('setSysRegistrationStep'),
  asyncSetSysRegistrationStep: createAction('asyncSetSysRegistrationStep'),
  setSysRegistrationStepLoading: createAction('setSysRegistrationStepLoading'),
  // 技术管理员的登记测试的uuid
  setTechLeaderEnterpriseRegistrationUuid: createAction(
    'setTechLeaderEnterpriseRegistrationUuid'
  )
};
