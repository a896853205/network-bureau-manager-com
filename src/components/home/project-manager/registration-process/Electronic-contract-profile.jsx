import React, { useState, useEffect } from 'react';

// redux
import { useSelector } from 'react-redux';

// 路由
import { HOME_REGISTRATION_DETAIL } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 请求
import { QUERY_SYS_REGISTRATION_STEP } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

import { Icon, Tag, Timeline, Skeleton } from 'antd';
export default () => {
  const { steps } = useSelector(state => state.enterpriseStore),
    [sysRegistrationStepList, setSysRegistrationStepList] = useState([]),
    [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const sysRegistrationStepList = await proxyFetch(
        QUERY_SYS_REGISTRATION_STEP,
        {},
        'GET'
      );

      setSysRegistrationStepList(sysRegistrationStepList);
      setLoading(false);
    })();
  }, []);

  const statusToColor = status => {
    let color = '';

    switch (status) {
      case 1:
        color = 'grey';
        break;
      case 2:
        color = 'blue';
        break;
      case 3:
        color = 'green';
        break;
      case 4:
        color = 'red';
        break;
      default:
        color = 'blue';
    }
    return color;
  };

  return (
    <div className='left-item-box'>
      <Icon
        className='item-icon-box'
        type='profile'
        theme='twoTone'
        twoToneColor='#334454'
      />
      <Skeleton loading={loading}>
        {sysRegistrationStepList.length ? (
          <div className='item-text-box'>
            <div className='text-top-box'>
              {sysRegistrationStepList[1].name}
              <Tag className='title-tag' color={statusToColor(steps[1].status)}>
                {steps[1].statusText}
              </Tag>
            </div>
            <div className='item-detail-box'>
              <p className='text-subtitle'>甲乙双方电子签合同</p>
              <Timeline mode='left'>
                <Timeline.Item color='green'>
                  <Link
                    to={`${HOME_REGISTRATION_DETAIL.path}/contract-manager`}
                  >
                    <span>填写评测合同内容</span>
                  </Link>
                </Timeline.Item>
                <Timeline.Item color='green'>
                  <Link
                    to={`${HOME_REGISTRATION_DETAIL.path}/contract-download`}
                  >
                    <span>生成合同下载,盖章扫描,上传pdf</span>
                  </Link>
                </Timeline.Item>
                <Timeline.Item color='red'>
                  等待企业下载pdf,盖章扫描,上传pdf
                </Timeline.Item>
                <Timeline.Item color='gray'>
                  <Link
                    to={`${HOME_REGISTRATION_DETAIL.path}/contract-examine`}
                  >
                    <span>审查,进入下一步 </span>
                  </Link>
                </Timeline.Item>
              </Timeline>
            </div>
          </div>
        ) : null}
      </Skeleton>
    </div>
  );
};
