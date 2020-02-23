import React, { useEffect } from 'react';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 子路由
import ApplyController from '@/page/home/certifier-manager/registration-certify-detail/Apply-controller.jsx';
import RegistrationCertifyProfileController from '@/page/home/certifier-manager/registration-certify-detail/Registration-certify-profile-controller.jsx';
import RegistrationCertifyExamineReportController from '@/page/home/certifier-manager/registration-certify-detail/Registration-certify-examine-report-controller.jsx';
import RegistrationCertifyExamineOriginalRecordController from '@/page/home/certifier-manager/registration-certify-detail/Registration-certify-examine-original-record-controller.jsx';

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
      history.push(ROUTES.HOME_REGISTRATION_CERTIFY_LIST.path);
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
        enterpriseAction.asyncSetCertifierRestration(enterpriseRegistrationUuid)
      );
    }
  }, [dispatch, enterpriseRegistrationUuid, localStorageRegistrationUuid]);

  const homeRegistrationCertifyDetailApply = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_CERTIFY_DETAIL_APPLY.path,
    exact: true
  });
  const homeRegistrationCertifyProfile = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_CERTIFY_PROFILE.path,
    exact: true
  });
  const homeRegistrationCertifyExamineReport = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_CERTIFY_EXAMINE_REPORT.path,
    exact: true
  });
  const homeRegistrationCertifyExamineOriginalRecord = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_CERTIFY_EXAMINE_ORIGINAL_RECORD.path,
    exact: true
  });

  return (
    <>
      {homeRegistrationCertifyDetailApply ? <ApplyController /> : null}
      {homeRegistrationCertifyProfile ? <RegistrationCertifyProfileController /> : null}
      {homeRegistrationCertifyExamineReport ? (
        <RegistrationCertifyExamineReportController />
      ) : null}
      {homeRegistrationCertifyExamineOriginalRecord ? (
        <RegistrationCertifyExamineOriginalRecordController />
      ) : null}
    </>
  );
};
