import React, { useEffect } from 'react';

// redux
import { useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// 子组件
import FileDownloadList from '@/components/home/public/File-download-list.jsx';
import ResponsiblePersonList from '@/components/home/public/Responsible-person-list.jsx';
import EnterpriseInfo from '@/components/home/public/Enterprise-info.jsx';

export default props => {
  const dispatch = useDispatch();

  // 关掉组件时删除redux
  useEffect(() => {
    return () => {
      dispatch(enterpriseAction.setFileDownloadRegistrationUuid(''));
    };
  });
  return (
    <>
      <EnterpriseInfo />
      <ResponsiblePersonList />
      <FileDownloadList />
    </>
  );
};
