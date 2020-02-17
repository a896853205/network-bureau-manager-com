import React, { useState, useEffect } from 'react';

// redux
import { useSelector } from 'react-redux';

// 工具
import { getAuthortyNameByCode } from '@/constants/auth-constants';

// 请求
import { GET_REGISTRATION_MANAGER_INFO } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Skeleton } from 'antd';
import '@/style/home/item.styl';
import '@/style/home/responsible-person-list.styl';

export default props => {
  const { fileDownloadRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [getDataLoading, setGetDataLoading] = useState(false),
    [projectManager, setProjectManager] = useState([]),
    [accountantManager, setAccountantManager] = useState([]),
    [techLeaderManager, setTechLeaderManager] = useState([]),
    [techManager, setTechManager] = useState([]),
    [certifierManager, setCertifierManager] = useState([]);

  useEffect(() => {
    (async () => {
      if (fileDownloadRegistrationUuid) {
        setGetDataLoading(true);
        const {
          projectManager,
          accountantManager,
          techLeaderManager,
          techManager,
          certifierManager
        } = await proxyFetch(
          GET_REGISTRATION_MANAGER_INFO,
          { registrationUuid: fileDownloadRegistrationUuid },
          'GET'
        );
        setProjectManager(projectManager);
        setAccountantManager(accountantManager);
        setTechLeaderManager(techLeaderManager);
        setTechManager(techManager);
        setCertifierManager(certifierManager);
        setGetDataLoading(false);
      }
    })();
  }, [fileDownloadRegistrationUuid]);
  console.log('projectManager=', projectManager);

  return (
    <div className='item-box'>
      <h5 className='title-box'>负责人列表</h5>
      <Skeleton loading={getDataLoading}>
        <ul className='responsible-person-ul'>
          <li>
            <img src={projectManager?.headPortraitUrl} alt='' />
            <div className='responsible-person-card-description'>
              <span>
                {projectManager?.name ? projectManager?.name : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(10)}</span>
              <span>
                {projectManager?.phone
                  ? projectManager?.phone
                  : '未分配'}
              </span>
            </div>
          </li>
          <li>
            <img src={accountantManager?.headPortraitUrl} alt='' />
            <div className='responsible-person-card-description'>
              <span>
                {accountantManager?.name
                  ? accountantManager?.name
                  : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(5)}</span>
              <span>
                {accountantManager?.phone
                  ? accountantManager?.phone
                  : '未分配'}
              </span>
            </div>
          </li>
          <li>
            <img src={techLeaderManager?.headPortraitUrl} alt='' />
            <div className='responsible-person-card-description'>
              <span>
                {techLeaderManager?.name
                  ? techLeaderManager?.name
                  : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(15)}</span>
              <span>
                {techLeaderManager?.phone
                  ? techLeaderManager?.phone
                  : '未分配'}
              </span>
            </div>
          </li>
          <li>
            <img src={techManager?.headPortraitUrl} alt='' />
            <div className='responsible-person-card-description'>
              <span>
                {techManager?.name ? techManager?.name : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(20)}</span>
              <span>
                {techManager?.phone ? techManager?.phone : '未分配'}
              </span>
            </div>
          </li>
          <li>
            <img src={certifierManager?.headPortraitUrl} alt='' />
            <div className='responsible-person-card-description'>
              <span>
                {certifierManager?.name
                  ? certifierManager?.name
                  : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(25)}</span>
              <span>
                {certifierManager?.phone
                  ? certifierManager?.phone
                  : '未分配'}
              </span>
            </div>
          </li>
        </ul>
      </Skeleton>
    </div>
  );
};
