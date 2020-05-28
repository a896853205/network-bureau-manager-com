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
  ),
  // 技术人员设置登记测试
  asyncSetTechRestration: createAction('asyncSetTechRestration'),
  // 技术管理员设置登记测试
  asyncSetTechLeaderRestration: createAction('asyncSetTechLeaderRestration'),
  asyncSetCertifierRestration: createAction('asyncSetCertifierRestration'),// 批准人设置登记测试

  // 委托测试
  setEnterpriseDelegationUuid: createAction('setEnterpriseDelegationUuid'),
  setDelegationSteps: createAction('setDelegationSteps'),
  asyncSetDelegationSteps: createAction('asyncSetDelegationSteps'),
  // 进度详细信息
  setDelegation: createAction('setDelegation'),
  asyncSetDelegation: createAction('asyncSetDelegation'),
  setDelegationLoading: createAction('setDelegationLoading'),
  // 系统步骤名称
  setSysDelegationStep: createAction('setSysDelegationStep'),
  asyncSetSysDelegationStep: createAction('asyncSetSysDelegationStep'),
  setSysDelegationStepLoading: createAction('setSysDelegationStepLoading'),
  // 内容详细信息
  setFileDownloadDelegationUuid: createAction(
    'setFileDownloadDelegationUuid'
  ),
  // 技术人员设置登记测试
  asyncSetTechDelegation: createAction('asyncSetTechDelegation'),
  // 技术管理员设置登记测试
  asyncSetTechLeaderDelegation: createAction('asyncSetTechLeaderDelegation'),
  asyncSetCertifierDelegation: createAction('asyncSetCertifierDelegation')// 批准人设置登记测试
};
