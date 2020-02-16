import React, { useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// 子组件
import FileDownloadList from '@/components/home/public/File-download-list.jsx';
import ResponsiblePersonList from '@/components/home/public/Responsible-person-list.jsx';
import EnterpriseInfo from '@/components/home/public/Enterprise-info.jsx';

// 路由
import { useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

export default props => {
  const localStorgeFileDownloadRegistrationUuid = localStorage.getItem(
      `${LOCAL_STORAGE}-fileDownloadRegistrationUuid`
    ),
    { fileDownloadRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    dispatch = useDispatch(),
    history = useHistory();

  // 如果没有localStorageRegistrationUuid就跳到首页
  useEffect(() => {
    if (!localStorgeFileDownloadRegistrationUuid) {
      history.push(ROUTES.HOME_INDEX.path);
    }
  }, [localStorgeFileDownloadRegistrationUuid, history]);

  useEffect(() => {
    if (
      localStorgeFileDownloadRegistrationUuid &&
      !fileDownloadRegistrationUuid
    ) {
      dispatch(
        enterpriseAction.setFileDownloadRegistrationUuid(
          fileDownloadRegistrationUuid
        )
      );
    }
  }, [
    localStorgeFileDownloadRegistrationUuid,
    fileDownloadRegistrationUuid,
    dispatch
  ]);

  // 关掉组件时删除redux
  useEffect(() => {
    return () => {
      dispatch(enterpriseAction.setFileDownloadRegistrationUuid(''));
    };
  }, [dispatch]);

  return (
    <>
      <EnterpriseInfo />
      <ResponsiblePersonList />
      <FileDownloadList />
    </>
  );
};
