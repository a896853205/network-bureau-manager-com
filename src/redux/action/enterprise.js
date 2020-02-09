import { createAction } from 'redux-actions';

export default {
  setEnterpriseRegistrationUuid: createAction('setEnterpriseRegistrationUuid'),
  setSteps: createAction('setSteps'),
  setRegistration: createAction('setRegistration'),
  asyncSetRestration: createAction('asyncSetRestration'),
  setRegistrationLoading: createAction('setRegistrationLoading'),
  // 系统步骤名称
  setSysRegistrationStep: createAction('setSysRegistrationStep'),
  asyncSetSysRegistrationStep: createAction('asyncSetSysRegistrationStep'),
  setSysRegistrationStepLoading: createAction('setSysRegistrationStepLoading')
};
