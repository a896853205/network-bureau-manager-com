import React, { useEffect } from 'react';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 子路由
import SpecimenController from '@/page/home/certifier-manager/registration-certify-detail/Specimen-controller.jsx';
// FIXME profile是以controller为结尾的,命名需要修改一下
import RegistrationCertifyProfile from '@/page/home/certifier-manager/registration-certify-detail/Registration-certify-profile-controller.jsx';

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
  // FIXME 不是跳到HOME_REGISTRATION_TASK_LIST这个路由,跳到registration-certify-list这个页的路由!
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
        enterpriseAction.asyncSetCertifierRestration(
          enterpriseRegistrationUuid
        )
      );
    }
  }, [dispatch, enterpriseRegistrationUuid, localStorageRegistrationUuid]);

  const homeRegistrationCertifyDetailSpecimen = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_CERTIFY_DETAIL_SPECIMEN.path,
    exact: true
  });
  const homeRegistrationCertifyProfile = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_CERTIFY_PROFILE.path,
    exact: true
  });

  return (
    <>
      {homeRegistrationCertifyDetailSpecimen ? <SpecimenController /> : null}
      {homeRegistrationCertifyProfile ? <RegistrationCertifyProfile /> : null}
    </>
  );
};
