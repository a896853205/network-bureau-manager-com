import React, { useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// 子组件
import FileDownloadList from '@/components/home/public/File-delegation-download-list.jsx';
import ResponsiblePersonList from '@/components/home/public/Responsible-delegation-person-list.jsx';
import EnterpriseInfo from '@/components/home/public/Enterprise-delegation-info.jsx';
import EnterpriseWrite from '@/components/home/public/Enterprise-delegation-write.jsx';

// 路由
import { useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

export default props => {
  const localStorgeFileDownloadDelegationUuid = localStorage.getItem(
      `${LOCAL_STORAGE}-fileDownloadDelegationUuid`
    ),
    { fileDownloadDelegationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    dispatch = useDispatch(),
    history = useHistory();

  // 如果没有localStorageDelegationUuid就跳到首页
  useEffect(() => {
    if (!localStorgeFileDownloadDelegationUuid) {
      history.push(ROUTES.HOME_INDEX.path);
    }
  }, [localStorgeFileDownloadDelegationUuid, history]);

  useEffect(() => {
    if (
      localStorgeFileDownloadDelegationUuid &&
      !fileDownloadDelegationUuid
    ) {
      dispatch(
        enterpriseAction.setFileDownloadDelegationUuid(
          localStorgeFileDownloadDelegationUuid
        )
      );
    }
  }, [
    localStorgeFileDownloadDelegationUuid,
    fileDownloadDelegationUuid,
    dispatch
  ]);

  // 关掉组件时删除redux
  useEffect(() => {
    return () => {
      dispatch(enterpriseAction.setFileDownloadDelegationUuid(''));
    };
  }, [dispatch]);

  return (
    <div className='item-outter-box'>
      <EnterpriseInfo />
      <EnterpriseWrite />
      <ResponsiblePersonList />
      <FileDownloadList />
    </div>
  );
};
