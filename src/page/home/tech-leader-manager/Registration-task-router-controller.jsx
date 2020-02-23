import React, { useEffect } from 'react';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 子路由
import RegistrationTaskAssignTech from '@/page/home/tech-leader-manager/registration-task-detail/Registration-task-assign-tech-controller.jsx';
import RegistrationTaskProfile from '@/page/home/tech-leader-manager/registration-task-detail/Registration-task-profile-controller.jsx';
import ApplyController from '@/page/home/tech-leader-manager/registration-task-detail/Apply-controller.jsx';
import RegistrationTaskExamineReportController from '@/page/home/tech-leader-manager/registration-task-detail/Registration-task-examine-report-controller.jsx';
import RegistrationTaskExamineOriginalRecordController from '@/page/home/tech-leader-manager/registration-task-detail/Registration-task-examine-original-record-controller.jsx';

// 路由
import { useRouteMatch, useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

export default props => {
  const localStorageRegistrationUuid = localStorage.getItem(
      `${LOCAL_STORAGE}-registrationUuid`
    ),
    { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    dispatch = useDispatch(),
    history = useHistory();

  // 如果没有localStorageRegistrationUuid就跳到列表页
  useEffect(() => {
    if (!localStorageRegistrationUuid) {
      history.push(ROUTES.HOME_REGISTRATION_TASK_LIST.path);
    }
  }, [localStorageRegistrationUuid, history]);

  useEffect(() => {
    if (localStorageRegistrationUuid && !enterpriseRegistrationUuid) {
      dispatch(
        enterpriseAction.setEnterpriseRegistrationUuid(
          localStorageRegistrationUuid
        )
      );
    }
  }, [localStorageRegistrationUuid, enterpriseRegistrationUuid, dispatch]);

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      dispatch(
        enterpriseAction.asyncSetTechLeaderRestration(
          enterpriseRegistrationUuid
        )
      );
    }
  }, [dispatch, enterpriseRegistrationUuid, localStorageRegistrationUuid]);

  const homeRegistrationTaskAssignTech = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TASK_ASSIGN_TECH.path,
    exact: true
  });
  const homeRegistrationTaskProfile = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TASK_PROFILE.path,
    exact: true
  });
  const homeRegistrationTaskDetailApply = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TASK_DETAIL_APPLY.path,
    exact: true
  });
  const homeRegistrationTaskExamineReport = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TASK_EXAMINE_REPORT.path,
    exact: true
  });
  const homeRegistrationTaskExamineOriginalRecord = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TASK_EXAMINE_ORIGINAL_RECORD.path,
    exact: true
  });

  return (
    <>
      {homeRegistrationTaskAssignTech ? <RegistrationTaskAssignTech /> : null}
      {homeRegistrationTaskProfile ? <RegistrationTaskProfile /> : null}
      {homeRegistrationTaskDetailApply ? <ApplyController /> : null}
      {homeRegistrationTaskExamineReport ? (
        <RegistrationTaskExamineReportController />
      ) : null}
      {homeRegistrationTaskExamineOriginalRecord ? (
        <RegistrationTaskExamineOriginalRecordController />
      ) : null}
    </>
  );
};
