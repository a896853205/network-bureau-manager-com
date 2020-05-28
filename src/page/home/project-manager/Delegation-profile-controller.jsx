import React, { useEffect } from 'react';

// 样式
import { Affix } from 'antd';
import '@/style/home/project-manager/delegation-profile.styl';
import '@/style/home/item.styl';

// 组件
import DelegationPersonProfile from '@/components/home/project-manager/Delegation-person-profile.jsx';
import DelegationProcessProfile from '@/components/home/project-manager/Delegation-process-profile.jsx';
import DelegationDetail from '@/components/home/project-manager/Delegation-detail.jsx';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

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
      history.push(ROUTES.HOME_DELEGATION_LIST.path);
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
      dispatch(enterpriseAction.asyncSetDelegation(enterpriseDelegationUuid));
    }
  }, [dispatch, enterpriseDelegationUuid, localStorageDelegationUuid]);

  // 退出时清除localStorage
  useEffect(() => {
    return () => {
      enterpriseAction.setEnterpriseDelegationUuid('');
    };
  }, []);

  const profile = useRouteMatch({
      path: ROUTES.HOME_DELEGATION_PROFILE.path,
      excat: true
    }),
    detail = useRouteMatch({
      path: `${ROUTES.HOME_DELEGATION_DETAIL.path}/:type`
    });

  let content = null;

  if (profile && profile.isExact) {
    // 概况组件
    content = <DelegationProcessProfile />;
  } else if (detail) {
    // 详细填写组件
    content = <DelegationDetail type={detail.params.type} />;
  }

  return (
    <div className='delegation-profile-box'>
      {content}
      <Affix offsetTop={10} >
        <DelegationPersonProfile />
      </Affix>
    </div>
  );
};
