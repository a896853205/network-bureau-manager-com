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
import RegistrationTestProfileController from '@/page/home/tech-manager/registration-test-detail/Registration-test-profile-controller.jsx';
import ApplyController from '@/page/home/tech-manager/registration-test-detail/Apply-controller.jsx';
import SpecimenController from '@/page/home/tech-manager/registration-test-detail/Specimen-controller.jsx';

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
      history.push(ROUTES.HOME_REGISTRATION_TEST_LIST.path);
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
        enterpriseAction.asyncSetTechRestration(enterpriseRegistrationUuid)
      );
    }
  }, [dispatch, enterpriseRegistrationUuid, localStorageRegistrationUuid]);

  // 退出时清除localStorage
  useEffect(() => {
    return () => {
      enterpriseAction.setEnterpriseRegistrationUuid('');
    };
  }, []);

  const homeRegistrationTestProfile = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TEST_PROFILE.path,
    exact: true
  });
  const homeRegistrationTestDetailApply = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TEST_DETAIL_APPLY.path,
    exact: true
  });
  const homeRegistrationTestDetailSpecimen = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TEST_DETAIL_SPECIMEN.path,
    exact: true
  });
  return (
    <>
      {homeRegistrationTestProfile ? (
        <RegistrationTestProfileController />
      ) : null}
      {homeRegistrationTestDetailApply ? <ApplyController /> : null}
      {homeRegistrationTestDetailSpecimen ? <SpecimenController /> : null}
    </>
  );
};
