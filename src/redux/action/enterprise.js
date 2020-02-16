import { createAction } from 'redux-actions';

export default {
  setEnterpriseRegistrationUuid: createAction('setEnterpriseRegistrationUuid'),
  setSteps: createAction('setSteps'),
  asyncSetSteps: createAction('asyncSetSteps'),
  // 进度详细信息
  setRegistration: createAction('setRegistration'),
  asyncSetRestration: createAction('asyncSetRestration'),
  setRegistrationLoading: createAction('setRegistrationLoading'),
  // 系统步骤名称
  setSysRegistrationStep: createAction('setSysRegistrationStep'),
  asyncSetSysRegistrationStep: createAction('asyncSetSysRegistrationStep'),
  setSysRegistrationStepLoading: createAction('setSysRegistrationStepLoading'),
  // 内容详细信息
  setFileDownloadRegistrationUuid: createAction(
    'setFileDownloadRegistrationUuid'
  )
};
