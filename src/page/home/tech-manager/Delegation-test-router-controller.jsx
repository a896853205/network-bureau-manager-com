import React, { useEffect } from 'react';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 路由
import { useRouteMatch, useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

// 子组件
import DelegationTestProfileController from '@/page/home/tech-manager/delegation-test-detail/Delegation-test-profile-controller.jsx';
import ApplyController from '@/page/home/tech-manager/delegation-test-detail/Apply-controller.jsx';
import SpecimenController from '@/page/home/tech-manager/delegation-test-detail/Specimen-controller.jsx';
import GenerateTestReportController from '@/page/home/tech-manager/delegation-test-detail/Generate-test-report-controller.jsx';
import GenerateTestOriginRecordController from '@/page/home/tech-manager/delegation-test-detail/Generate-test-origin-record-controller.jsx';

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
      history.push(ROUTES.HOME_DELEGATION_TEST_LIST.path);
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
        enterpriseAction.asyncSetTechDelegation(enterpriseDelegationUuid)
      );
    }
  }, [dispatch, enterpriseDelegationUuid, localStorageDelegationUuid]);

  // 退出时清除localStorage
  useEffect(() => {
    return () => {
      enterpriseAction.setEnterpriseDelegationUuid('');
    };
  }, []);

  const homeDelegationTestProfile = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TEST_PROFILE.path,
    exact: true
  });
  const homeDelegationTestDetailApply = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TEST_DETAIL_APPLY.path,
    exact: true
  });
  const homeDelegationTestDetailSpecimen = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TEST_DETAIL_SPECIMEN.path,
    exact: true
  });
  const homeDelegationTestGenerateReport = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TEST_GENERATE_REPORT.path,
    exact: true
  });
  const homeDelegationTestGenerateOriginRecord = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TEST_GENERATE_ORIGINAL_RECORD.path,
    exact: true
  });
  return (
    <>
      {homeDelegationTestProfile ? (
        <DelegationTestProfileController />
      ) : null}
      {homeDelegationTestDetailApply ? <ApplyController /> : null}
      {homeDelegationTestDetailSpecimen ? <SpecimenController /> : null}
      {homeDelegationTestGenerateReport ? <GenerateTestReportController /> : null}
      {homeDelegationTestGenerateOriginRecord ? (
        <GenerateTestOriginRecordController />
      ) : null}
    </>
  );
};
