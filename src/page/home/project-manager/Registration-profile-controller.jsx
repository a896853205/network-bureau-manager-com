import React, { useEffect } from 'react';

// 样式
import '@/style/home/project-manager/registration-profile.styl';
import '@/style/home/project-manager/item.styl';

// 组件
import RegistrationPersonProfile from '@/components/home/project-manager/Registration-person-profile.jsx';
import RegistrationProcessProfile from '@/components/home/project-manager/Registration-process-profile.jsx';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 路由
import { useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

export default props => {
  const localStorageRegistrationUuid = window.localStorage.getItem(
      `${LOCAL_STORAGE}-registrationUuid`
    ),
    { enterpriseRegistrationUuid, registrationLoading } = useSelector(
      state => state.enterpriseStore
    ),
    dispatch = useDispatch(),
    history = useHistory();

  // 如果没有localStorageRegistrationUuid就跳到列表页
  useEffect(() => {
    if (!localStorageRegistrationUuid) {
      history.push(ROUTES.HOME_REGISTRATION_LIST.path);
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
      dispatch(enterpriseAction.asyncSetRestration(enterpriseRegistrationUuid));
    }
  }, [dispatch, enterpriseRegistrationUuid, localStorageRegistrationUuid]);

  return (
    <div className='registration-profile-box'>
      <RegistrationProcessProfile />
      <RegistrationPersonProfile />
    </div>
  );
};
