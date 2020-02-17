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
    [projectManagerList, setProjectManagerList] = useState([]),
    [accountantManagerList, setAccountantManagerList] = useState([]),
    [techLeaderManagerList, setTechLeaderManagerList] = useState([]),
    [techManagerList, setTechManagerList] = useState([]),
    [certifierManagerList, setCertifierManagerList] = useState([]);

  useEffect(() => {
    (async () => {
      if (fileDownloadRegistrationUuid) {
        setGetDataLoading(true);
        const {
          projectManagerList,
          accountantManagerList,
          techLeaderManagerList,
          techManagerList,
          certifierManagerList
        } = await proxyFetch(
          GET_REGISTRATION_MANAGER_INFO,
          { registrationUuid: fileDownloadRegistrationUuid },
          'GET'
        );
        setProjectManagerList(projectManagerList);
        setAccountantManagerList(accountantManagerList);
        setTechLeaderManagerList(techLeaderManagerList);
        setTechManagerList(techManagerList);
        setCertifierManagerList(certifierManagerList);
        setGetDataLoading(false);
      }
    })();
  }, [fileDownloadRegistrationUuid]);

  return (
    <div className='item-box'>
      <h5 className='title-box'>负责人列表</h5>
      <Skeleton loading={getDataLoading}>
        <ul className='responsible-person-ul'>
          <li>
            <img src={projectManagerList?.headPortraitUrl} alt='' />
            <div className='responsible-person-card-description'>
              <span>
                {projectManagerList?.name ? projectManagerList?.name : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(10)}</span>
              <span>
                {projectManagerList?.phone ? projectManagerList?.phone : '未分配'}
              </span>
            </div>
          </li>
          <li>
            <img src={accountantManagerList?.headPortraitUrl} alt='' />
            <div className='responsible-person-card-description'>
              <span>
                {accountantManagerList?.name
                  ? accountantManagerList?.name
                  : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(5)}</span>
              <span>
                {accountantManagerList?.phone
                  ? accountantManagerList?.phone
                  : '未分配'}
              </span>
            </div>
          </li>
          <li>
            <img src={techLeaderManagerList?.headPortraitUrl} alt='' />
            <div className='responsible-person-card-description'>
              <span>
                {techLeaderManagerList?.name
                  ? techLeaderManagerList?.name
                  : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(15)}</span>
              <span>
                {techLeaderManagerList?.phone
                  ? techLeaderManagerList?.phone
                  : '未分配'}
              </span>
            </div>
          </li>
          <li>
            <img src={techManagerList?.headPortraitUrl} alt='' />
            <div className='responsible-person-card-description'>
              <span>
                {techManagerList?.name ? techManagerList?.name : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(20)}</span>
              <span>
                {techManagerList?.phone ? techManagerList?.phone : '未分配'}
              </span>
            </div>
          </li>
          <li>
            <img src={certifierManagerList?.headPortraitUrl} alt='' />
            <div className='responsible-person-card-description'>
              <span>
                {certifierManagerList?.name ? certifierManagerList?.name : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(25)}</span>
              <span>
                {certifierManagerList?.phone
                  ? certifierManagerList?.phone
                  : '未分配'}
              </span>
            </div>
          </li>
        </ul>
      </Skeleton>
    </div>
  );
};
