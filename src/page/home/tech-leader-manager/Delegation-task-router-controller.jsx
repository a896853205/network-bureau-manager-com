import React, { useEffect } from 'react';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 子路由
import DelegationTaskAssignTech from '@/page/home/tech-leader-manager/delegation-task-detail/Delegation-task-assign-tech-controller.jsx';
import DelegationTaskProfile from '@/page/home/tech-leader-manager/delegation-task-detail/Delegation-task-profile-controller.jsx';
import ApplyController from '@/page/home/tech-leader-manager/delegation-task-detail/Apply-controller.jsx';
import DelegationTaskExamineReportController from '@/page/home/tech-leader-manager/delegation-task-detail/Delegation-task-examine-report-controller.jsx';
import DelegationTaskExamineOriginalRecordController from '@/page/home/tech-leader-manager/delegation-task-detail/Delegation-task-examine-original-record-controller.jsx';

// 路由
import { useRouteMatch, useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

export default props => {
  const localStorageDelegationUuid = localStorage.getItem(
      `${LOCAL_STORAGE}-delegationUuid`
    ),
    { enterpriseDelegationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    dispatch = useDispatch(),
    history = useHistory();

  // 如果没有localStorageDelegationUuid就跳到列表页
  useEffect(() => {
    if (!localStorageDelegationUuid) {
      history.push(ROUTES.HOME_DELEGATION_TASK_LIST.path);
    }
  }, [localStorageDelegationUuid, history]);

  useEffect(() => {
    if (localStorageDelegationUuid && !enterpriseDelegationUuid) {
      dispatch(
        enterpriseAction.setEnterpriseDelegationUuid(
          localStorageDelegationUuid
        )
      );
    }
  }, [localStorageDelegationUuid, enterpriseDelegationUuid, dispatch]);

  useEffect(() => {
    if (enterpriseDelegationUuid) {
      dispatch(
        enterpriseAction.asyncSetTechLeaderDelegation(
          enterpriseDelegationUuid
        )
      );
    }
  }, [dispatch, enterpriseDelegationUuid, localStorageDelegationUuid]);

  const homeDelegationTaskAssignTech = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TASK_ASSIGN_TECH.path,
    exact: true
  });
  const homeDelegationTaskProfile = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TASK_PROFILE.path,
    exact: true
  });
  const homeDelegationTaskDetailApply = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TASK_DETAIL_APPLY.path,
    exact: true
  });
  const homeDelegationTaskExamineReport = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TASK_EXAMINE_REPORT.path,
    exact: true
  });
  const homeDelegationTaskExamineOriginalRecord = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TASK_EXAMINE_ORIGINAL_RECORD.path,
    exact: true
  });

  return (
    <>
      {homeDelegationTaskAssignTech ? <DelegationTaskAssignTech /> : null}
      {homeDelegationTaskProfile ? <DelegationTaskProfile /> : null}
      {homeDelegationTaskDetailApply ? <ApplyController /> : null}
      {homeDelegationTaskExamineReport ? (
        <DelegationTaskExamineReportController />
      ) : null}
      {homeDelegationTaskExamineOriginalRecord ? (
        <DelegationTaskExamineOriginalRecordController />
      ) : null}
    </>
  );
};
