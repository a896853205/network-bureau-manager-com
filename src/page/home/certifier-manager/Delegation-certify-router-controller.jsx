import React, { useEffect } from 'react';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 子路由
import ApplyController from '@/page/home/certifier-manager/delegation-certify-detail/Apply-controller.jsx';
import DelegationCertifyProfileController from '@/page/home/certifier-manager/delegation-certify-detail/Delegation-certify-profile-controller.jsx';
import DelegationCertifyExamineReportController from '@/page/home/certifier-manager/delegation-certify-detail/Delegation-certify-examine-report-controller.jsx';
import DelegationCertifyExamineOriginalRecordController from '@/page/home/certifier-manager/delegation-certify-detail/Delegation-certify-examine-original-record-controller.jsx';

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
      history.push(ROUTES.HOME_DELEGATION_CERTIFY_LIST.path);
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
        enterpriseAction.asyncSetCertifierDelegation(enterpriseDelegationUuid)
      );
    }
  }, [dispatch, enterpriseDelegationUuid, localStorageDelegationUuid]);

  const homeDelegationCertifyDetailApply = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_CERTIFY_DETAIL_APPLY.path,
    exact: true
  });
  const homeDelegationCertifyProfile = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_CERTIFY_PROFILE.path,
    exact: true
  });
  const homeDelegationCertifyExamineReport = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_CERTIFY_EXAMINE_REPORT.path,
    exact: true
  });
  const homeDelegationCertifyExamineOriginalRecord = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_CERTIFY_EXAMINE_ORIGINAL_RECORD.path,
    exact: true
  });

  return (
    <>
      {homeDelegationCertifyDetailApply ? <ApplyController /> : null}
      {homeDelegationCertifyProfile ? <DelegationCertifyProfileController /> : null}
      {homeDelegationCertifyExamineReport ? (
        <DelegationCertifyExamineReportController />
      ) : null}
      {homeDelegationCertifyExamineOriginalRecord ? (
        <DelegationCertifyExamineOriginalRecordController />
      ) : null}
    </>
  );
};
